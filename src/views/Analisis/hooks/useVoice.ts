import { useCallback, useRef, useState } from "react";
import { getAudioService } from "../services/questionAnalyzerService";

export function useTextAudio() {
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  // Track URLs that should not be revoked yet
  const activeUrlsRef = useRef<Set<string>>(new Set());
  // Track pending requests to prevent duplicates
  const pendingRequestsRef = useRef<Map<string, Promise<string | null>>>(new Map());
  
  const handleTextAudio = useCallback(async (answer: string): Promise<string | null> => {
    console.log("🎵 handleTextAudio called for:", answer);
    
    // If there's already a pending request for this text, return that promise
    if (pendingRequestsRef.current.has(answer)) {
      console.log("🔄 Returning existing promise for:", answer);
      return pendingRequestsRef.current.get(answer)!;
    }

    setIsLoadingAudio(true);
    console.log("📡 Starting new audio request for:", answer);
    
    const requestPromise = (async () => {
      try {
        const audioBlob = await getAudioService.analyzeAudio({
          user_question: answer,
          text: answer,
        });
        
        console.log("✅ Audio blob received:", audioBlob.size, "bytes");
        
        const url = URL.createObjectURL(audioBlob);
        console.log("🔗 Created blob URL:", url);
        
        // Track this URL as active
        activeUrlsRef.current.add(url);
        
        return url;

      } catch (error) {
        console.error("❌ Error fetching audio:", error);
        return null;
      } finally {
        setIsLoadingAudio(false);
        // Remove from pending requests
        pendingRequestsRef.current.delete(answer);
        console.log("🏁 Request completed for:", answer);
      }
    })();

    // Store the promise to prevent duplicate requests
    pendingRequestsRef.current.set(answer, requestPromise);
    
    return requestPromise;
  }, []);

  const revokeUrl = useCallback((url: string) => {
    if (activeUrlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      activeUrlsRef.current.delete(url);
    }
  }, []);

  return { handleTextAudio, isLoadingAudio, revokeUrl };
}
