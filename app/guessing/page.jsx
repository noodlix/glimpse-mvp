"use client";
import Text from "@/components/home/text";
import Image from "next/image";
import s from "../guessing/Guessing.module.css";

export default async function Guessing() {
  const texts = [
    "In this captivating scene, a young woman stands at the edge of a vast, swirling abyss, her eyes filled with determination. Her flowing, ebony hair cascades down her back, glinting like onyx in the pale moonlight. Clad in a tattered, yet regal gown of deep crimson, she holds a shimmering sword in one hand, its blade reflecting the flickering flames that dance around her. The air crackles with energy as she prepares to face the unknown. Behind her, a hulking figure with fiery eyes watches, an embodiment of ancient power. This painting captures the essence of a thrilling adventure, where the heroine's courage and strength echo through the ages.",
    "In this chilling tableau, the scene unfolds within the opulent study of a wealthy collector. The room is adorned with rare artifacts and ornate bookshelves, harboring secrets deep within their intricate carvings. A lifeless body lies sprawled upon the Persian rug, the victim of a sinister plot. A detective, coldly analytical, examines the scene with keen eyes. Clues litter the room like scattered fragments of a broken mirror, waiting to be meticulously pieced together. The air is heavy with tension, the truth hidden within the brushstrokes of this perplexing and captivating piece.",
    "In a winter wonderland, a vast canvas unfolds. A group of majestic reindeer gracefully glide through pristine snow, their antlers reaching towards the heavens. Their noble leader, donning a coat of russet brown, leads them with unwavering determination. Beside them, loyal dogs with thick fur trot faithfully, their pawprints leaving trails of warmth in the cold. In the distance, figures enveloped in furs traverse the Frozen landscape on snow-shoes, leaving a fascinating pattern of footprints behind. The scene emanates strength, resilience, and harmony amidst the frozen splendor, inviting the viewer to explore the secrets of this frosty realm.",
  ];
  return (
    <div className={s.container}>
      {texts.map((text, index) => (
        <div className={s.card} key={index}>
          <Text text={text} />
          {/* <img className={s.image} src="/br.png" alt="" /> */}
          {/* <Image alt="2" src="/2.png" width={0} height={0} className="image" /> */}
          <Image
            alt="2"
            src="/2.png"
            width={400}
            height={400}
            style={{ width: "20vw", height: "20vw" }}
          />
        </div>
      ))}
    </div>
  );
}
