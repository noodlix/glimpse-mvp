"use client";
import {
  GlobeAltIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="border-b border-black/10 bg-white text-gray-800">
    <div className="relative m-auto flex gap-2 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
      <div className="min-w-[30px]">
        <PencilIcon />
      </div>
      <span className="mt-1 animate-pulse cursor-default">▍</span>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content, cover, isStreaming }) {
  if (!content) {
    return null;
  }
  const contentWithCursor = `${content}${isStreaming ? "▍" : ""}`;
  let formatteMessage = convertNewLines(contentWithCursor);

  const [flagsopen, setFlagsOpen] = useState(false);
  const [language, setLanguage] = useState(null);

  const showflags = () => {
    setFlagsOpen(true);
  };

  const hideflags = () => {
    setFlagsOpen(false);
  };

  const handleLanguageClick = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    formatteMessage = "translation";
    hideflags();
  };

  useEffect(() => {
    console.log("language:", language);
  }, [language]);

  return (
    <div
      className={
        role === "assistant"
          ? "bg-white text-gray-800"
          : "bg-white text-gray-800"
      }
    >
      <div className="relative m-auto flex gap-2 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[30px]">
          {role === "assistant" ? <PencilIcon /> : <UserCircleIcon />}
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div>
            <div className="prose flex-1 whitespace-pre-wrap">
              {formatteMessage}
            </div>

            {cover ? (
              <div className="mt-6 flex flex-row">
                <div
                  className="h-6 w-6 "
                  onMouseEnter={() => showflags()}
                  onClick={() => showflags()}
                >
                  <GlobeAltIcon />
                </div>
                {flagsopen ? (
                  <div
                    className="mb-2 ml-3 flex w-24 flex-row rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onMouseLeave={() => hideflags()}
                    onClick={() => hideflags()}
                  >
                    <div
                      className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                      onClick={() => handleLanguageClick("🇰🇿")}
                    >
                      🇰🇿
                    </div>
                    <div
                      className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                      onClick={() => handleLanguageClick("🇷🇺")}
                    >
                      🇷🇺
                    </div>
                    <div
                      className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                      onClick={() => handleLanguageClick("🇬🇧")}
                    >
                      🇬🇧
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {cover &&
          content !==
            "Give me the name and the author of any book to start!" ? (
            <Image
              src={cover}
              alt="Img"
              // alt=<Image/>
              width={300}
              height={300}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
