"use client";
// import Text from "@/components/home/text";
import { GlobeAltIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
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
    }, 25);

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
  const [light, setLight] = useState(true);

  const [texts, setTexts] = useState([
    {
      src: "/1.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "In this captivating scene, Jacob Burckhardts brushstrokes depict the vibrant tapestry of the Renaissance in Italy. The canvas is alive with bustling city streets, adorned with graceful arches and magnificent domes. Figures dressed in sumptuous attire",
    },
    {
      src: "/5.png",
      title: "The Odyssey of Homer by Homer",
      content:
        "In this epic masterwork, the author skillfully brings forth a vivid portrait of the heros tumultuous journey. The artist ingeniously captures the scene where the protagonist encounters the enchanting island of the nymph. Bathed in shimmering moonlight",
    },
    {
      src: "/9.png",
      title:
        "The Life and Opinions of Tristram Shandy, Gentleman by Laurence Sterne",
      content:
        "In this captivating tableau, we witness an intricate tapestry of eccentricity and wit. A man, clad in a dashing waistcoat, sits in a room filled with curiosities.  His unruly, tousled hair matches the chaotic nature",
    },
    {
      src: "/10.png",
      title: "Robur the Conqueror by Jules Verne",
      content:
        "In this breathtaking scene, a colossal airship dominates the canvas, its metallic hull gleaming under the radiant sun. Robur, the audacious conqueror, stands proudly on the deck, his steely gaze fixed on the horizon. ",
    },
    {
      src: "/11.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "Brushstrokes of historical brilliance come alive. A bustling Italian piazza emerges, adorned with vibrant colors and intricate details. Figures from the past, adorned in sumptuous garments, engage in animated discussions on art and literature.",
    },
    {
      src: "/12.png",
      title: "Stories from the Pentamerone by Giambattista Basile",
      content:
        "In this captivating painting, a magical world unfolds before our eyes. In the center, a courageous prince battles a fearsome dragon, his sword gleaming in the sunlight. Surrounding them are enchanting creatures, from mischievous fairies to noble",
    },
    {
      src: "/13.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "Behold, a vivid tableau capturing the Renaissance's essence. A sprawling Italian cityscape, adorned with grand palaces and bustling markets, teems with life. Scholars and artisans gather, their minds ignited by the revival of learning and arts. Noble lords",
    },
    {
      src: "/4.png",
      title: "Joseph Andrews by Henry Fielding",
      content:
        "A captivating literary masterpiece, a scene unfolds like a beautifully crafted painting. A young man, Joseph Andrews, stands tall amidst a verdant countryside. His countenance reflects both innocence and determination, as he faces the trials of life with unwavering spirit. At his side, a loyal dog, symbolizing unwavering loyalty and companionship. The backdrop reveals a sprawling backdrop of pristine nature, with rolling hills and a shimmering river that whispers tales of adventure. With vibrant brushstrokes and vivid imagery, this scene captures the essence of Joseph Andrews, a timeless work that celebrates the triumphs of the human spirit amidst a sprawling world.",
    },
    {
      src: "/7.png",
      title: "The Greene Murder Case by Willard Huntington Wright",
      content:
        "A chilling tableau, the scene unfolds within the opulent study of a wealthy collector. The room is adorned with rare artifacts and ornate bookshelves, harboring secrets deep within their intricate carvings. A lifeless body lies sprawled upon the Persian rug, the victim of a sinister plot. A detective, coldly analytical, examines the scene with keen eyes. Clues litter the room like scattered fragments of a broken mirror, waiting to be meticulously pieced together. The air is heavy with tension, the truth hidden within the brushstrokes of this perplexing and captivating piece.",
    },
    {
      src: "/8.png",
      title: "Reindeer, Dogs, and Snow-Shoes by Richard J. Bush",
      content:
        "In a winter wonderland, a vast canvas unfolds. A group of majestic reindeer gracefully glide through pristine snow, their antlers reaching towards the heavens. Their noble leader, donning a coat of russet brown, leads them with unwavering determination. Beside them, loyal dogs with thick fur trot faithfully, their pawprints leaving trails of warmth in the cold. In the distance, figures enveloped in furs traverse the Frozen landscape on snow-shoes, leaving a fascinating pattern of footprints behind. The scene emanates strength, resilience, and harmony amidst the frozen splendor, inviting the viewer to explore the secrets of this frosty realm.",
    },
    {
      src: "/14.png",
      title: "The Civilisation of the Renaissance in Italy by Jacob Burckhardt",
      content:
        "In a vibrant city square, sunbeams cascade upon a tapestry of life. Burckhardt's brush captures the essence of the Renaissance as graceful figures dance through the scene. Scholars clad in robes engage in spirited debates, while artisans sculpt masterpieces",
    },
    {
      src: "/15.png",
      title: "A Doll's House by Henrik Ibsen FoCi",
      content:
        "A Doll's House is a play by Henrik Ibsen that explores themes of freedom, gender roles, and societal expectations. The pivotal scene depicts Nora Helmer standing in the center of a lavishly furnished room, the epitome of a perfect doll-like wife. She is surrounded by elegant furniture, ornate decorations, and expensive toys. Yet, her expression reveals a deep internal struggle. Through this scene, Ibsen captures the facade of a seemingly idyllic domestic life and exposes the suffocating constraints imposed on women in 19th-century society.",
    },
    {
      src: "/16.png",
      title:
        "Far Away and Long Ago; A History of My Early Life by W. H. Hudson",
      content:
        "In Far Away and Long Ago; A History of My Early Life, W.H. Hudson vividly paints the picture of his childhood growing up in the wilds of South America. The scene before us reveals a sweeping landscape of lush forests, where vibrant birds flutter about, their brilliant plumage illuminating the canvas. A young Hudson stands in awe, his wide eyes taking in the untamed beauty around him. In the distance, majestic mountains rise, their peaks piercing the cerulean sky. The air is thick with the sweet fragrance of tropical flowers, their delicate petals blooming in riotous colors. On the forest floor, a curious menagerie of creatures teem, their movements a symphony of life. This masterpiece captures the essence of Hudson's formative years, an exploration of the untamed wonders of nature that would shape the trajectory of his life.",
    },
    {
      src: "/17.png",
      title: "Green Wheat by Colette",
      content:
        "Green Wheat by Colette is a vivid portrayal of a French countryside landscape in summer. The painting depicts a golden field of wheat, swaying gently in the breeze. The vibrant green hues of the young stalks contrast beautifully with the cloudless azure sky above. In the foreground, a solitary figure, a young woman, is seen gracefully walking through the field, her long flowing dress billowing around her. The sun casts a warm glow on her face, highlighting the delicate features and the serene expression on her face. The painting exudes a sense of tranquility, capturing the essence of a peaceful, rural life.",
    },
    {
      src: "/18.png",
      title: "House of Bones by Graham Masterton",
      content:
        "In Graham Masterton's House of Bones, a chilling tale unfolds amidst the dark and eerie atmosphere of a haunted mansion. The author expertly paints a scene where the protagonist, Kate, is confronted by a life-size painting depicting a room filled with skeletal remains. The vivid strokes of Masterton's words vividly capture the macabre details—the worn hardwood floor, cobwebs dancing in the dim light, and the hauntingly realistic bones strewn across the room. As Kate's terror mounts, the painting seemingly comes alive, intensifying the sinister aura of the House of Bones.",
    },
    {
      src: "/19.png",
      title: "Tales from Shakespeare by Charles Lamb,Mary Lamb",
      content:
        "In the painting, we see a vivid scene from Tales from Shakespeare by Charles Lamb and Mary Lamb. The backdrop is a vibrant forest, with towering trees and a clear blue sky. In the foreground, a group of characters from various plays are gathered. We can identify Romeo and Juliet, locked in an embrace, while Hamlet stands nearby, deep in thought. Lady Macbeth is seen clutching her hands, wearing a distraught expression. Othello stands tall and stoic, while Puck from A Midsummer Night's Dream playfully flies through the air. The painting captures the essence of these timeless tales, showcasing the range of emotions and diverse characters that make up the collection.",
    },
    {
      src: "/20.png",
      title: "The Birthplace (1903) by Henry James",
      content:
        "The Birthplace by Henry James (1903) takes us on a journey to a quaint New England town. The novel paints a vivid scene of a picturesque house with a white picket fence, surrounded by lush greenery. Inside, we encounter complex characters whose lives intertwine and clash, as if watching a mesmerizing tableau. James beautifully captures the essence of the time period through his meticulous descriptions, immersing readers in a vibrant world of class struggles, moral dilemmas, and the pursuit of personal identity.",
    },
    {
      src: "/21.png",
      title: "The Last Man by Mary Shelley",
      content:
        "In Mary Shelley's novel, The Last Man, a bleak and desolate landscape stretches before us. The sky is tinged with dark hues, foretelling the impending doom. A lone figure stands at the center, embodying despair and isolation. His eyes reflect a profound sadness, the weight of the world resting upon his shoulders. Surrounding him are remnants of a once vibrant civilization, now in ruins. The crumbling buildings and abandoned streets bear witness to the devastation wrought by a devastating plague that has decimated humanity. Nature reclaims its territory, as creeping vines consume the once proud structures. The atmosphere is heavy with a sense of loss and desolation, a poignant reminder of mankind's fragile existence. The Last Man's somber colors and haunting imagery mirrors the despair and anguish felt by the protagonist as he navigates a desolate world, grappling with the inevitability of his own mortality.",
    },
    {
      src: "/22.png",
      title: "Anathem by Neal Stephenson",
      content:
        "In Anathem by Neal Stephenson, imagine a breathtaking scene: a grand, meticulously detailed painting reveals a vast and secluded Avout monastery, set amidst rolling hills and ancient stone structures. Within the monastery's walls, scholars in austere robes engage in deep philosophical discussions and mathematical inquiries, their faces filled with intensity and curiosity. The painting captures the intricate architecture of the monastery, from its soaring spires and stained glass windows to its meticulously maintained gardens. In the foreground, a group of Avout stands together, engrossed in a heated debate, their gestures and expressions capturing the intellectual fervor that permeates their lives. The painting captures the essence of the novel's exploration of knowledge, faith, and the boundaries of human understanding, inviting viewers to immerse themselves in this captivating world.",
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
    <div
      className={s.container}
      style={{
        backgroundColor: light ? "" : "#10002b",
        color: light ? "" : "#f7fafc",
      }}
    >
      <div className="md:mb-8 lg:mb-8  xl:mb-8 ">
        <div onClick={() => setLight(!light)}>
          {light ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </div>
      </div>
      {texts.map((book, index) => (
        <div
          className={s.card}
          key={index}
          style={{
            backgroundColor: light ? "" : "#3c096c",
          }}
        >
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
                {/* {book.language} */}
              </div>
              {flagopenindex === index && (
                <div
                  className="mb-2 ml-3 flex w-24 flex-row rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  onMouseLeave={() => hideflags()}
                  onClick={() => hideflags()}
                >
                  <div
                    className={`relative flex w-8  rounded-md p-2 text-sm   ${
                      light ? "hover:bg-gray-100" : "hover:bg-gray-400"
                    }`}
                    onClick={() => handleLanguageClick("kk", index)}
                  >
                    🇰🇿
                  </div>
                  <div
                    className={`relative flex w-8  rounded-md p-2 text-sm   ${
                      light ? "hover:bg-gray-100" : "hover:bg-gray-400"
                    }`}
                    onClick={() => handleLanguageClick("ru", index)}
                  >
                    🇷🇺
                  </div>
                  <div
                    className={`relative flex w-8  rounded-md p-2 text-sm   ${
                      light ? "hover:bg-gray-100" : "hover:bg-gray-400"
                    }`}
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
