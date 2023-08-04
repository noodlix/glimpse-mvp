"use client";
// import Text from "@/components/home/text";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

import s from "../library/Library.module.css";

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
        setIsTyping(false);
        if (typeof onFinishTyping === "function") {
          onFinishTyping(isTyping);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text, onFinishTyping]);

  return <div>{displayText} </div>;
};

export default function Guessing() {
  // const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [flagopenindex, setFlagopenindex] = useState("");
  const [updateindex, setUpdateindex] = useState("");
  // const [desiredlang, setDesiredlang] = useState("fr");

  const [texts, setTexts] = useState([
    {
      src: "/1.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "In this captivating scene, Jacob Burckhardts brushstrokes depict the vibrant tapestry of the Renaissance in Italy. The canvas is alive with bustling city streets, adorned with graceful arches and magnificent domes. Figures dressed in sumptuous attire",
      typing: true,
      language: "en",
    },
    {
      src: "/5.png",
      title: "The Odyssey of Homer by Homer",
      content:
        "In this epic masterwork, the author skillfully brings forth a vivid portrait of the heros tumultuous journey. The artist ingeniously captures the scene where the protagonist encounters the enchanting island of the nymph. Bathed in shimmering moonlight",
      typing: true,
      language: "en",
    },
    {
      src: "/9.png",
      title:
        "The Life and Opinions of Tristram Shandy, Gentleman by Laurence Sterne",
      content:
        "In this captivating tableau, we witness an intricate tapestry of eccentricity and wit. A man, clad in a dashing waistcoat, sits in a room filled with curiosities.  His unruly, tousled hair matches the chaotic nature",
      typing: true,
      language: "en",
    },
    {
      src: "/10.png",
      title: "Robur the Conqueror by Jules Verne",
      content:
        "In this breathtaking scene, a colossal airship dominates the canvas, its metallic hull gleaming under the radiant sun. Robur, the audacious conqueror, stands proudly on the deck, his steely gaze fixed on the horizon. ",
      typing: true,
      language: "en",
    },
    {
      src: "/11.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "Brushstrokes of historical brilliance come alive. A bustling Italian piazza emerges, adorned with vibrant colors and intricate details. Figures from the past, adorned in sumptuous garments, engage in animated discussions on art and literature.",
      typing: true,
      language: "en",
    },
    {
      src: "/12.png",
      title: "Stories from the Pentamerone by Giambattista Basile",
      content:
        "In this captivating painting, a magical world unfolds before our eyes. In the center, a courageous prince battles a fearsome dragon, his sword gleaming in the sunlight. Surrounding them are enchanting creatures, from mischievous fairies to noble",
      typing: true,
      language: "en",
    },
    {
      src: "/13.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "Behold, a vivid tableau capturing the Renaissance's essence. A sprawling Italian cityscape, adorned with grand palaces and bustling markets, teems with life. Scholars and artisans gather, their minds ignited by the revival of learning and arts. Noble lords",
      typing: true,
      language: "en",
    },
    {
      src: "/4.png",
      title: "Joseph Andrews by Henry Fielding",
      content:
        "A captivating literary masterpiece, a scene unfolds like a beautifully crafted painting. A young man, Joseph Andrews, stands tall amidst a verdant countryside. His countenance reflects both innocence and determination, as he faces the trials of life with unwavering spirit. At his side, a loyal dog, symbolizing unwavering loyalty and companionship. The backdrop reveals a sprawling backdrop of pristine nature, with rolling hills and a shimmering river that whispers tales of adventure. With vibrant brushstrokes and vivid imagery, this scene captures the essence of Joseph Andrews, a timeless work that celebrates the triumphs of the human spirit amidst a sprawling world.",
      typing: true,
      language: "en",
    },
    {
      src: "/7.png",
      title: "The Greene Murder Case by Willard Huntington Wright",
      content:
        "A chilling tableau, the scene unfolds within the opulent study of a wealthy collector. The room is adorned with rare artifacts and ornate bookshelves, harboring secrets deep within their intricate carvings. A lifeless body lies sprawled upon the Persian rug, the victim of a sinister plot. A detective, coldly analytical, examines the scene with keen eyes. Clues litter the room like scattered fragments of a broken mirror, waiting to be meticulously pieced together. The air is heavy with tension, the truth hidden within the brushstrokes of this perplexing and captivating piece.",
      typing: true,
      language: "en",
    },
    {
      src: "/8.png",
      title: "Reindeer, Dogs, and Snow-Shoes by Richard J. Bush",
      content:
        "In a winter wonderland, a vast canvas unfolds. A group of majestic reindeer gracefully glide through pristine snow, their antlers reaching towards the heavens. Their noble leader, donning a coat of russet brown, leads them with unwavering determination. Beside them, loyal dogs with thick fur trot faithfully, their pawprints leaving trails of warmth in the cold. In the distance, figures enveloped in furs traverse the Frozen landscape on snow-shoes, leaving a fascinating pattern of footprints behind. The scene emanates strength, resilience, and harmony amidst the frozen splendor, inviting the viewer to explore the secrets of this frosty realm.",
      typing: true,
      language: "en",
    },
  ]);
  const showflags = (index) => {
    setFlagopenindex(index);
  };

  const hideflags = () => {
    setFlagopenindex(null);
  };

  const handleLanguageClick = async (selectedLanguage, index) => {
    let inputText = texts[index].content;
    let desiredlang = selectedLanguage;
    const translation = await fetch("/api/googleTranslate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText, desiredlang }),
    });
    setTranslatedText((await translation.json()).resulttext);
    // console.log("AAAAAAAAAAAA", translatedText);
    setUpdateindex(index);
    hideflags();
  };

  useEffect(() => {
    if (translatedText !== "") {
      const updatedTexts = [...texts];
      // updatedTexts[index].language = selectedLanguage;
      updatedTexts[updateindex].content = translatedText;
      setTexts(updatedTexts);
    }
  }, [translatedText]);
  return (
    <div className={s.container}>
      {texts.map((book, index) => (
        <div className={s.card} key={index}>
          <div className={s.textbox}>
            <div className={s.title}>{book.title}</div>

            {/* <div>{book.content}</div> */}
            <Text text={book.content} />
            <div className="mt-6 flex flex-row">
              <div
                className="h-6 w-6 "
                onMouseEnter={() => showflags(index)}
                onClick={() => showflags(index)}
              >
                <GlobeAltIcon />
                {book.language}
              </div>
              {flagopenindex === index && (
                <div
                  className="mb-2 ml-3 flex w-24 flex-row rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  onMouseLeave={() => hideflags()}
                  onClick={() => hideflags()}
                >
                  <div
                    className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                    onClick={() => handleLanguageClick("kk", index)}
                  >
                    🇰🇿
                  </div>
                  <div
                    className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                    onClick={() => handleLanguageClick("ru", index)}
                  >
                    🇷🇺
                  </div>
                  <div
                    className="relative flex w-8  rounded-md p-2 text-sm  hover:bg-gray-100"
                    onClick={() => handleLanguageClick("en", index)}
                  >
                    🇬🇧
                  </div>
                </div>
              )}
            </div>
          </div>
          <Image
            alt=""
            src={book.src}
            width={400}
            height={400}
            style={{ width: "20vw", height: "20vw" }}
          />
        </div>
      ))}
    </div>
  );
}
