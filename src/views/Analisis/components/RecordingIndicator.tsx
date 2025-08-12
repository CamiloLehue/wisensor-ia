import React from 'react';
import { Mic } from 'lucide-react';

interface RecordingIndicatorProps {
  isRecording: boolean;
}

export const RecordingIndicator: React.FC<RecordingIndicatorProps> = ({ isRecording }) => {
  if (!isRecording) return null;
  
  return (
    <div className="absolute bottom-15 z-10 left-[50%] bg-red-950/50 border border-red-500 rounded-2xl -translate-x-1/2 h-8 w-[15%] flex justify-centerd items-center px-10">
      <div className="bg-red-500 absolute left-[50%] -translate-x-1/2 blur-xl animate-pulse h-10 w-10 rounded-full opacity-50"></div>
      <p className="relative flex items-center gap-2 z-20">
        <Mic size={16} /> Grabando...
      </p>
    </div>
  );
};