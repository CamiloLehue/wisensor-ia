import React from 'react';
import { User } from 'lucide-react';
import { Message } from '../types/MessageType';

interface UserMessageProps {
  message: Message;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <>
      <div className="mr-2 bg-blue-800 border-e-2 border-e-blue-500 rounded-lg p-2 max-w-[calc(100%-60px)]">
        <p className="text-[1rem] text-white">{message.text}</p>
      </div>
      <div className="flex-shrink-0 bg-gradient-to-bl from-blue-600 p-2 rounded-full ">
        <User className="h-5 w-5 text-gray-200" />
      </div>
    </>
  );
};