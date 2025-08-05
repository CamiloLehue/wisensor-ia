import { useState, useRef } from 'react';
import { speechToTextService } from '../services/speechToTextService';

export function useAudioRecorder(setQuestion: (q: string) => void, setAnswer: (a: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        setAnswer('Tu navegador no soporta el formato de audio necesario para la grabación.');
        return;
      }
      const options = { mimeType: 'audio/webm' };
      const recorder = new MediaRecorder(stream, options);
      setMediaRecorder(recorder);
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        if (mediaRecorder && mediaRecorder.stream) {
          mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
        setAnswer('Transcribiendo audio... Por favor, espera.');
        try {
          const response = await speechToTextService.transcribeAudio(audioBlob);
          setQuestion(response.transcribedText);
          setAnswer('Transcripción lista. Puedes editarla o enviar la pregunta.');
        } catch (sttError: any) {
          setAnswer(`Error al transcribir tu voz: ${sttError.message || 'Error desconocido'}.`);
        } finally {
          setIsRecording(false);
        }
      };
      recorder.start();
      setIsRecording(true);
      setAnswer('Grabando audio... Habla ahora.');
    } catch (err) {
      setAnswer('No pude acceder a tu micrófono. Asegúrate de dar permisos.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    handlePlayAudio,
    audioRef,
    setIsRecording,
    setAnswer,
    setQuestion,
  };
} 