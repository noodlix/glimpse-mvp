import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
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
  const formatteMessage = convertNewLines(contentWithCursor);

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
            {/* <div className="border-r- mt-6 w-6">
              <GlobeAltIcon />
            </div> */}
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
