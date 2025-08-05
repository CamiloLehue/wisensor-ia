import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const speechToTextService = {
  async transcribeAudio(audioBlob: Blob): Promise<{ transcribedText: string }> {
    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'audio.webm');

    const response = await axios.post(`${API_URL}/speech-to-text/transcribe/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
}; 