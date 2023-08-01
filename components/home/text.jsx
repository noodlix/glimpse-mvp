import { useEffect, useState } from "react";

const Text = ({ text, onFinishTyping }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false); // Set isTyping to false after typing animation is complete
        if (typeof onFinishTyping === "function") {
          onFinishTyping(false); // Call the callback function with isTyping as false
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, onFinishTyping]);

  return <div>{displayText} </div>;
};

export default Text;
