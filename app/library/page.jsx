"use client";
import Text from "@/components/home/text";
import Image from "next/image";
import s from "../library/Library.module.css";

export default async function Guessing() {
  const texts = [
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
  ];
  const handleTextTypingFinished = (isTyping) => {
    console.log("Text typing finished:", !isTyping);
  };

  return (
    <div className={s.container}>
      {texts.map((book, isTyping, index) => (
        <div className={s.card} key={index}>
          <div className={s.textbox}>
            <div className={s.title}>{book.title}</div>

            <Text
              text={book.content}
              onFinishTyping={handleTextTypingFinished}
            />
          </div>
          {/* {isTyping ? ( */}
          <Image
            alt="2"
            src={book.src}
            width={400}
            height={400}
            style={{ width: "20vw", height: "20vw" }}
          />

          {/* ) : (
           <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
          )} */}
        </div>
      ))}
    </div>
  );
}
