import React from "react";
import { Message } from "../types/MessageType";
import { WelcomeMessage } from "./WelcomeMessage";
import { BotMessage } from "./BotMessage";
import { UserMessage } from "./UserMessage";

interface ChatContainerProps {
  messages: Message[];
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
  currentlyPlayingAudio: string | null;
  isLoadingAudio: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setCurrentlyPlayingAudio: (text: string | null) => void;
  handlePlayAudioFunction: (text: string, autoPlay: boolean) => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  chatContainerRef,
  currentlyPlayingAudio,
  isLoadingAudio,
  audioRef,
  setCurrentlyPlayingAudio,
  handlePlayAudioFunction,
}) => {
  return (
    <div
      id="chatMessages"
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto h-20 mb-20 space-y-6 custom-scroll text-xs scrollbar-thin scrollbar-thumb-cyan-500/40 px-5 scrollbar-track-[#0d1b2a] scrollbar-thumb-rounded-full"
      style={{ scrollbarWidth: "thin" }}
    >
      {messages.map((message: Message, index: number) => {
        return (
          <React.Fragment key={index}>
            {message.sender === "bot-bienvenida" &&
            message.text === "sin-pregunta" ? (
              <WelcomeMessage />
            ) : (
              <div
                className={`flex items-start ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {/* Mensaje del BOT */}
                {message.sender === "bot" && (
                  <BotMessage
                    message={message}
                    currentlyPlayingAudio={currentlyPlayingAudio}
                    isLoadingAudio={isLoadingAudio}
                    audioRef={audioRef}
                    setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
                    handlePlayAudioFunction={handlePlayAudioFunction}
                  />
                )}

                {/* Mensaje del USUARIO */}
                {message.sender === "user" && <UserMessage message={message} />}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
