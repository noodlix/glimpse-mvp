"use client";

// import { covergen } from '@/lib/covergen'
import { throttle } from "@/lib/throttle";
import {
  BookOpenIcon,
  MoonIcon,
  PaperAirplaneIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import cx from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatLine, LoadingChatLine } from "./chat-line";

export const initialMessages = [
  {
    role: "assistant",
    content:
      "Give me the name and the author of any book and wait for AI generated summaries and captivating images!",
  },
];

const InputMessage = ({
  input,
  setInput,
  sendMessage,
  loading,
  sendDataToChat,
}) => {
  const [isGeneratingBook, setIsGeneratingBook] = useState(false);
  const [book, setBook] = useState(null);
  const [bookError, setBookError] = useState(null);
  const inputRef = useRef(null);
  const [light, setLight] = useState(true);

  const shouldShowLoadingIcon = loading || isGeneratingBook;
  const inputActive = input !== "" && !shouldShowLoadingIcon;

  const fetchRandomBook = async () => {
    setIsGeneratingBook(true);
    setBookError(null);

    try {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40",
      );
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data.items.length);

      const book = data.items[randomIndex].volumeInfo;
      const title = book.title;
      const authors = book.authors;

      setBook({ title, authors });
      setInput(`${book?.title} by ${book?.authors}`);

      console.log(book?.title);
      console.log(book?.authors);
    } catch (error) {
      setBookError(error);
    } finally {
      setIsGeneratingBook(false);
    }
  };

  useEffect(() => {
    const input = inputRef?.current;
    if (book && input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [book, inputRef]);

  useEffect(() => {
    if (bookError) {
      toast.error(bookError);
    }
  }, [bookError]);

  const sendTheme = () => {
    setLight(!light);
    sendDataToChat(light);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 clear-both flex flex-col items-center bg-gradient-to-b from-transparent  ${
        light ? "via-white to-white" : "via-[#3c096c] to-[#10002b]"
      }`}
    >
      <button
        className={`mx-auto flex w-fit items-center gap-3 rounded border px-4 py-2 text-sm text-black hover:opacity-50 disabled:opacity-25 ${
          light
            ? "border-neutral-200 bg-white "
            : "border-[#3c096c] bg-[#10002b] text-gray-100"
        }`}
        onClick={fetchRandomBook}
        disabled={isGeneratingBook}
      >
        <div className="h-4 w-4">
          <BookOpenIcon />
        </div>{" "}
        {"Get a random book"}
      </button>
      <div
        className={`flex w-full flex-row items-center justify-center ${
          light ? "bg-white" : "bg-[#10002b] text-gray-100"
        }`}
      >
        <div className="md:mb-8 lg:mb-8  xl:mb-8 ">
          <div onClick={sendTheme}>
            {light ? (
              <SunIcon className="ml-2 h-6 w-6" />
            ) : (
              <MoonIcon className="ml-2 h-6 w-6" />
            )}
          </div>
        </div>

        <div className="mx-2 my-4 w-full flex-1 md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
          <div
            className={`relative mx-2 flex-1 flex-col rounded-md border-black/10  shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4 ${
              light ? "bg-white" : "bg-[#3c096c] text-gray-100"
            }`}
          >
            <input
              ref={inputRef}
              aria-label="chat input"
              required
              className={`m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12  ${
                light ? "text-black " : "text-gray-100"
              }`}
              placeholder="Type in the title of a book..."
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(input);
                  setInput("");
                }
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              disabled={isGeneratingBook}
            />
            <button
              className={cx(
                shouldShowLoadingIcon && "hover:text-inhert hover:bg-inherit",
                inputActive &&
                  "bg-black hover:bg-neutral-800 hover:text-neutral-100",
                "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 transition-colors hover:bg-neutral-200 hover:text-neutral-900",
              )}
              type="submit"
              onClick={() => {
                sendMessage(input);
                setInput("");
              }}
              disabled={shouldShowLoadingIcon}
            >
              {shouldShowLoadingIcon ? (
                <div
                  className={`h-6 w-6 animate-spin rounded-full border-t-2  opacity-60 dark:border-neutral-100 ${
                    light ? "border-black " : "border-gray-100"
                  }`}
                ></div>
              ) : (
                <div className={cx(inputActive && "text-white", "h-6 w-6")}>
                  <PaperAirplaneIcon
                    className={`${light ? "" : "text-gray-100"}`}
                  />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (newMessage) => {
    setLoading(true);
    setError(null);
    const newMessages = [...messages, { role: "user", content: newMessage }];
    setMessages((prevMsgs) => [
      ...prevMsgs,
      { role: "user", content: newMessage },
    ]);
    const last1Message = newMessages.slice(-1);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last1Message,
      }),
    });

    console.log("Edge function returned.");

    if (!response.ok) {
      console.log(response);
      setError(response.statusText);
      setLoading(false);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    // This data is a ReadableStream

    setIsMessageStreaming(true);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = "";
    setMessages((prevMsgs) => [
      ...prevMsgs,
      { role: "assistant", content: lastMessage },
    ]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;
      setMessages((prevMsgs) => [
        ...prevMsgs.slice(0, -1),
        { role: "assistant", content: lastMessage },
      ]);

      setLoading(false);
    }
    const titlefordb = last1Message[0].content;
    const imageres = await fetch("/api/covers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lastMessage, titlefordb }),
    });
    console.log(imageres, "FDTHGJGJFUFUFU");

    const result = await imageres.json();
    const bookcover = result.coverurl;

    addImages(bookcover);
    function addImages(bookcover) {
      setMessages((prevMsgs) => [
        ...prevMsgs.slice(0, -1),
        { role: "assistant", content: lastMessage, cover: bookcover },
      ]);
    }

    setIsMessageStreaming(false);
  };

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
  };
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [receivedLight, setReceivedLight] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { messages, isMessageStreaming, loading, error, sendMessage } =
    useMessages();

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const sendDataToChat = (light) => {
    setReceivedLight(!light);
  };

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  }, [autoScrollEnabled]);
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown();
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div
      className={`w-full flex-1 overflow-hidden border-zinc-100 ${
        receivedLight ? "bg-white" : "bg-[#10002b]"
      }`}
    >
      <div
        ref={chatContainerRef}
        className="relative max-h-[calc(100vh-4rem)] w-full flex-1 overflow-x-hidden"
        onScroll={handleScroll}
      >
        {messages.map(({ content, role, cover }, index) => (
          <ChatLine
            key={index}
            role={role}
            content={content}
            cover={cover}
            isStreaming={index === messages.length - 1 && isMessageStreaming}
            receivedLight={receivedLight}
          />
        ))}
        {loading && <LoadingChatLine receivedLight={receivedLight} />}

        <div
          className={`h-[152px] ${receivedLight ? "bg-white" : "bg-[#10002b]"}`}
          ref={messagesEndRef}
        />
        {/* <div className="h-[152px] bg-red-200"></div> */}
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
          sendDataToChat={sendDataToChat}
        />
      </div>
      <Toaster />
    </div>
  );
}
