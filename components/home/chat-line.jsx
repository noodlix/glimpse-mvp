"use client";
import {
  GlobeAltIcon,
  SparklesIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

export const LoadingChatLine = ({ receivedLight }) => (
  <div
    className={`border-b border-black/10 text-gray-800 ${
      receivedLight ? "bg-white" : "bg-[#10002b] text-gray-100"
    }`}
  >
    <div className="relative m-auto flex gap-2 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
      <div className="min-w-[30px]">
        <SparklesIcon className={`${receivedLight ? "" : " text-gray-100"}`} />
      </div>
      <span
        className={`mt-1 animate-pulse cursor-default ${
          receivedLight ? "bg-white" : "bg-[#10002b] text-gray-100"
        }`}
      >
        ▍
      </span>
    </div>
  </div>
);

const convertNewLines = (text) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({
  role = "assistant",
  content,
  cover,
  isStreaming,
  receivedLight,
}) {
  const [flagsopen, setFlagsOpen] = useState(false);
  const [language, setLanguage] = useState(null);
  const [translatedText, setTranslatedText] = useState("");

  const contentWithCursor = `${content}${isStreaming ? "▍" : ""}`;
  let formatteMessage = convertNewLines(contentWithCursor);

  const showflags = () => {
    setFlagsOpen(true);
  };

  const hideflags = () => {
    setFlagsOpen(false);
  };

  const translateTo = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log(content, selectedLanguage);
    const translation = await fetch("/api/googleTranslate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputText: content,
        desiredlang: selectedLanguage,
      }),
    });

    setTranslatedText((await translation.json()).resulttext);
    console.log("AAAAAAAAAAAA", translatedText);
    // try {
    //   const responseJson = await translation.json();
    //   setTranslatedText(responseJson.resulttext);
    //   console.log( responseJson.resulttext);
    //   console.log( translatedText);
    // } catch (error) {
    //   console.error("Error parsing JSON response:", error);
    // }

    hideflags();
  };

  useEffect(() => {
    console.log("language:", language);
  }, [language]);
  if (!content) {
    return null;
  }
  return (
    <div
      className={` text-gray-800 ${
        receivedLight ? "bg-white" : "bg-[#10002b] text-gray-100"
      }`}
    >
      <div className="relative m-auto flex gap-2  p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[30px]">
          {role === "assistant" ? (
            <SparklesIcon
              className={`${
                receivedLight ? "bg-white" : "bg-[#10002b] text-gray-100"
              }`}
            />
          ) : (
            <UserCircleIcon
              className={`${
                receivedLight ? "bg-white" : "bg-[#10002b] text-gray-100"
              }`}
            />
          )}
        </div>

        <div className="flex w-full flex-col  sm:flex-row sm:gap-4">
          <div className="w-full ">
            {translatedText === "" ? (
              <div
                className={`prose whitespace-pre-wrap ${
                  receivedLight ? "" : "text-gray-100"
                }`}
              >
                {formatteMessage}
              </div>
            ) : (
              <div
                className={`prose whitespace-pre-wrap ${
                  receivedLight ? "" : "text-gray-100"
                }`}
              >
                {translatedText}
              </div>
            )}
            {cover ? (
              <div className="mt-2 flex flex-row">
                <div
                  className="h-6 w-6 "
                  onMouseEnter={() => showflags()}
                  onClick={() => showflags()}
                >
                  <GlobeAltIcon
                    className={`min-w-[30px] ${
                      receivedLight ? "" : " text-gray-100"
                    }`}
                  />
                </div>
                {flagsopen ? (
                  <div
                    className={`mb-2 ml-3 flex w-24 flex-row rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      receivedLight ? "bg-white" : "bg-[#3c096c]"
                    }`}
                    onMouseLeave={() => hideflags()}
                    onClick={() => hideflags()}
                  >
                    <div
                      className={`relative flex w-8  rounded-md p-2 text-sm   ${
                        receivedLight
                          ? "hover:bg-gray-100"
                          : "hover:bg-gray-400"
                      }`}
                      onClick={() => translateTo("kk")}
                    >
                      🇰🇿
                    </div>
                    <div
                      className={`relative flex w-8  rounded-md p-2 text-sm   ${
                        receivedLight
                          ? "hover:bg-gray-100"
                          : "hover:bg-gray-400"
                      }`}
                      onClick={() => translateTo("ru")}
                    >
                      🇷🇺
                    </div>
                    <div
                      className={`relative flex w-8  rounded-md p-2 text-sm   ${
                        receivedLight
                          ? "hover:bg-gray-100"
                          : "hover:bg-gray-400"
                      }`}
                      onClick={() => translateTo("en")}
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
          {cover ? (
            <div className="w-300px h-300px">
              <Image
                src={cover}
                alt="Img"
                // alt=<Image/>
                width={300}
                height={300}
              />
            </div>
          ) : (
            <></>
          )}
          {cover ||
          content ===
            "Give me the name and the author of any book and wait for AI generated summaries and captivating images!" ||
          role === "user" ? (
            <></>
          ) : (
            <div className="flex w-2/5 flex-row items-center justify-center ">
              <div
                className={`h-6 w-6 animate-spin rounded-full border-t-2  opacity-60 dark:border-neutral-100 ${
                  receivedLight ? "border-black " : "border-gray-100"
                }`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
