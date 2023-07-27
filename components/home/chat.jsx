'use client'

// import { covergen } from '@/lib/covergen'
import { throttle } from '@/lib/throttle'
import { BookOpenIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ChatLine, LoadingChatLine } from './chat-line'
// default first message to display in UI (not necessary to define the prompt)
export const initialMessages = [
  {
    role: 'assistant',
    content: 'Give me the name and the author of any book to start!',
  },
]


const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingBook, setIsGeneratingBook] = useState(false)
  const [book, setBook] = useState(null)
  const [bookError, setBookError] = useState(null)
  const inputRef = useRef(null)

  const shouldShowLoadingIcon = loading || isGeneratingBook
  const inputActive = input !== '' && !shouldShowLoadingIcon

  const fetchRandomBook = async () => {
    setIsGeneratingBook(true)
    setBookError(null)

    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40'
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
      setInput(`${book?.title} by ${book?.authors}`)

      // Set the book data in the component state
      console.log(book?.title)
      console.log(book?.authors)
    } catch (error) {
      setBookError(error)
    } finally {
      setIsGeneratingBook(false)
    }
  };



  useEffect(() => {
    const input = inputRef?.current
    if (book && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [book, inputRef])

  useEffect(() => {
    if (bookError) {
      toast.error(bookError)
    }
  }, [bookError])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      <button
        className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black text-sm hover:opacity-50 disabled:opacity-25"
        onClick={fetchRandomBook}
        disabled={isGeneratingBook}
      >
        <div className="w-4 h-4">
          <BookOpenIcon />
        </div> {'Generate a random book'}
      </button>
      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            disabled={isGeneratingBook}
          />
          <button
            className={cx(
              shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
              inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
              "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors")}
            type="submit"
            onClick={() => {
              sendMessage(input)
              setInput('')
            }}
            disabled={shouldShowLoadingIcon}
          >
            {shouldShowLoadingIcon
              ? <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              : <div className={cx(inputActive && "text-white", "w-6 h-6")}>
                <PaperAirplaneIcon />
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages)
  // const [imgData, setimgData] = useState('')
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  
  // send message to API /api/chat endpoint
  const sendMessage = async (newMessage) => {
    setLoading(true)
    setError(null)
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ]
    setMessages(prevMsgs => ([...prevMsgs, { role: 'user', content: newMessage }]));
    const last1Message = newMessages.slice(-1)

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last1Message,
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      console.log(response)
      setError(response.statusText)
      setLoading(false)
      return
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    // This data is a ReadableStream

    setIsMessageStreaming(true)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''
    setMessages(prevMsgs => ([
      ...prevMsgs,
      { role: 'assistant', content: lastMessage },
    ]))

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue
      setMessages(prevMsgs => ([
        ...(prevMsgs.slice(0, -1)),
        { role: 'assistant', content: lastMessage },
      ]))

      setLoading(false)
    }

    // console.log(last1Message[0].content)
    const titlefordb = last1Message[0].content
    // console.log(lastMessage)
    const imageres = await fetch('/api/covers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lastMessage, titlefordb }),

    })
    console.log(imageres, 'FDTHGJGJFUFUFU')

    const result = await imageres.json()
    const bookcover = result.coverurl;


    addImages(bookcover)
    function addImages(bookcover) {

      setMessages(prevMsgs => ([
        ...(prevMsgs.slice(0, -1)),
        { role: 'assistant', content: lastMessage, cover: bookcover },
      ]))
    }


    setIsMessageStreaming(false)
  }

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const {messages, isMessageStreaming, loading, error, sendMessage } = useMessages()
  
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
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <div className="flex-1 w-full border-zinc-100 bg-white overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden"
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

        <div
          className="h-[152px] bg-white"
          ref={messagesEndRef}
        />
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
        />
      </div>
      <Toaster />
    </div>
  )
}