"use client";

import { throttle } from "@/lib/throttle";
import { BookOpenIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import cx from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChatLine, LoadingChatLine } from "./chat-line";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
  {
    role: "assistant",
    content: "Give me the name and the author of any book to start!",
  },
];

const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingBook, setIsGeneratingBook] = useState(false);
  const [book, setBook] = useState(null);
  const [bookError, setBookError] = useState(null);
  const inputRef = useRef(null);

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

      // Generate a random index within the range of the number of books received
      const randomIndex = Math.floor(Math.random() * data.items.length);

      // Extract book title and author from the randomly chosen book
      const book = data.items[randomIndex].volumeInfo;
      const title = book.title;
      const authors = book.authors;

      // Set the book data in the component state
      setBook({ title, authors });
      setInput(`${book?.title} by ${book?.authors}`);

      // Set the book data in the component state
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

  return (
    <div className="fixed bottom-0 left-0 right-0 clear-both flex flex-col items-center bg-gradient-to-b from-transparent via-white to-white">
      <button
        className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white px-4 py-2 text-sm text-black hover:opacity-50 disabled:opacity-25"
        onClick={fetchRandomBook}
        disabled={isGeneratingBook}
      >
        <div className="h-4 w-4">
          <BookOpenIcon />
        </div>{" "}
        {"Get a random book"}
      </button>
      <div className="mx-2 my-4 w-full flex-1 md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
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
              <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
            ) : (
              <div className={cx(inputActive && "text-white", "h-6 w-6")}>
                <PaperAirplaneIcon />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [imgData, setimgData] = useState("");
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

    const dalleEndpoint = "https://api.openai.com/v1/images/generations";
    const prompt = lastMessage;
    const count = 1;
    const size = 512;

    const reqBody = {
      prompt: prompt,
      n: count,
      size: size + "x" + size,
      response_format: "url",
    };
    const reqParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(reqBody),
    };
    console.log("Ya tut!");
    fetch(dalleEndpoint, reqParams)
      .then((res) => res.json())
      .then((json) => addImages(json, prompt))
      .catch((error) => {
        console.log(error);
      });

    /**
     * @param {Obj} jsonData
     * @param {String} prompt
     */
    function addImages(jsonData) {
      if (jsonData.error) {
        console.log(jsonData.error.message);
        return;
      }
      console.log("Tut json: " + JSON.stringify(jsonData));
      // console.log("cover: ", imgData);

      setMessages((prevMsgs) => [
        ...prevMsgs.slice(0, -1),
        {
          role: "assistant",
          content: lastMessage,
          cover: jsonData.data[0].url,
        },
      ]);
    }

    setIsMessageStreaming(false);
  };

  return {
    imgData,
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
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { imgData, messages, isMessageStreaming, loading, error, sendMessage } =
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
    <div className="w-full flex-1 overflow-hidden border-zinc-100 bg-white">
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
          />
        ))}
        {loading && <LoadingChatLine />}

        <div className="h-[152px] bg-white" ref={messagesEndRef} />
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
        />
      </div>
      <Toaster />
    </div>
  );
}

// chat.jsx
// const generateJeopardyQuestion = async () => {
//   setIsGeneratingQuestion(true)
//   setQuestionError(null)

//   try {
//     const res = await axios.get('/api/question')
//     if (!res.data) {
//       throw new Error('No question was found in the response.')
//     }
//     const question_data = res.data

//     setQuestion(question_data)
//     setInput(`The category is "${question_data.category}". ${question_data.question}`)
//   } catch (err) {
//     setQuestionError(err.message)
//   } finally {
//     setIsGeneratingQuestion(false)
//   }
// }

// api/question
// import axios from 'axios';
// import { NextResponse } from 'next/server';

// // forces to not cache the response to get a different question every request
// export const dynamic = 'force-dynamic';

// /**
//  * Retrieves a random Jeopardy question
//  */
// export async function GET() {
//   const res = await axios.get('https://jservice.io/api/random')

//   const question_data = res.data?.[0]

//   if (!question_data) {
//     return NextResponse.json({
//       message: 'No question was found in the response.'
//     }, {
//       status: 500
//     })
//   }

//   console.log('fthfgfgfgfgfgffffffffffffffff')
//   return NextResponse.json({
//     id: question_data.id,
//     question: question_data.question,
//     category: question_data.category?.title || '',
//     answer: question_data.answer,
//   })
// }
