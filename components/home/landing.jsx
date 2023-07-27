import Image from 'next/image';
import s from '../home/Landing.module.css';
export default function Landing(){
  return (
    <>
    <div className={s.background}>
      <div className={s.logo}>
          Glimpse
      </div>
    </div>
    <div className={s.intro}>
<div className={s.introtext1}>Find Books For You!</div>
<div className={s.introtext2}>Enter the world of AI-generated book covers with <div className={s.purple}>Glipmse</div> - a game-changer for avid readers</div>
    </div>
    <div className={s.examples}>
      <div className={s.examplecard}>
        <div className={s.cardimg}>
        <Image
      src="/br.png"
      width="1000"
      height="1000"
      alt="The Brothers Karamazov"
    />
        </div>
        <div className={s.cardtext1}>The Brothers Karamazov</div>
        <div className={s.cardtext2}>The painting captures a crucial scene from the book. Three individuals are positioned at the center, each displaying distinctive emotions. The eldest brother, Dmitri, exudes passionate intensity. Ivan, the intellectual skeptic, wears a contemplative expression. The youngest, Alyosha, emanates serenity and compassion. Light and shadow emphasize their internal conflict</div>
      </div>
      <div className={s.examplecard}>
        <div className={s.cardimg}>
        <Image
      src="/2.png"
      width="1000"
      height="1000"
      alt="The Brothers Karamazov"
    />
        </div>
        <div className={s.cardtext1}>Day of the Oprichnik</div>
        <div className={s.cardtext2}>A striking scene from  with precise detail. A figure dressed in a traditional oprichniks attire commands attention at the center. His stern visage reflects unwavering loyalty, while his clenched fist conveys authority. The backdrop portrays a dystopian Moscow, draped in an eerie red glow. Illuminated by torchlight, the scene exudes an atmosphere of oppre</div>
      </div>
    </div>

    
    <div className={s.examples}>
      <div className={s.examplecard}>
        <div className={s.cardimg}>
        <Image
      src="/3.png"
      width="1000"
      height="1000"
      alt="The Brothers Karamazov"
    />
        </div>
        <div className={s.cardtext1}>A Separate Peace by John Knowles</div>
        <div className={s.cardtext2}>Summer day at a New England prep school. In the foreground two young boys sit on the branch of a tree, with their legs dangling over a clear blue river. The river is surrounded by lush green trees and bushes. the schools white buildings and red roofs are seen over the trees. The sky is a perfect shade of blue, with fluffy white clouds. peaceful and idyllic, a sense of tension beneath the surface.</div>
      </div>
      <div className={s.examplecard}>
        <div className={s.cardimg}>
        <Image
      src="/4.png"
      width="1000"
      height="1000"
      alt="The Brothers Karamazov"
    />
        </div>
        <div className={s.cardtext1}>Harry Potter by J. K. Rowling</div>
        <div className={s.cardtext2}>Harry, Hermione, and Ron standing in front of a magnificent castle, their wands raised and ready for action. The castle is Hogwarts, one of the most iconic settings in modern literature, and it looms in the background, shrouded in mist and mystery. The three young wizards are dressed in their Hogwarts robes, and their faces are full of determination and resolve. Behind them, we can see glimpses of magical creatures - a unicorn, a phoenix, a dragon - all hinting at the wonders and dangers that await within the castle walls.</div>
      </div>
    </div>


    <div className={s.howitworks}>
      <div className={s.howtitle}>How does it work?</div>
      <div>
      <div className={s.howtext}>Enter any book title, and our AI begins weaving its magic, generating a plethora of unique designs</div>
      <div className={s.howtext}>Get a glimpse of the book you are about to pick up</div>
     </div>
    </div>

    <div className={s.ready}>
    <div className={s.readytitle}>Get a <div className={s.purple}>Glipmse</div> of any book!!!</div>
    <div>
    <div className={s.readytext}>Join us on the cutting edge of AI-generated book cover design.</div>
    <div className={s.readytext}>Deside if the book is for you in just a few clicks.</div>
    <div className={s.readytext}>Lets get started!</div>
    </div>
    </div>


    <div className={s.contacts}>
      <div className={s.sm}>
        <div className={s.sm1}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M 0 0 L 32 0 L 32 32 L 0 32 Z" fill="transparent"></path>
            <path d="M 30.713 9.712 L 26.938 13.475 C 26.188 22.212 18.813 29 10 29 C 8.188 29 6.688 28.712 5.55 28.15 C 4.638 27.687 4.263 27.2 4.163 27.05 C 3.995 26.795 3.953 26.478 4.047 26.189 C 4.142 25.899 4.364 25.668 4.65 25.562 C 4.675 25.55 7.625 24.425 9.538 22.262 C 8.351 21.418 7.309 20.388 6.45 19.212 C 4.738 16.887 2.925 12.85 4.013 6.825 C 4.082 6.46 4.346 6.163 4.7 6.05 C 5.055 5.934 5.446 6.025 5.713 6.287 C 5.75 6.337 9.913 10.437 15 11.762 L 15 11 C 15.01 9.399 15.656 7.867 16.795 6.742 C 17.934 5.617 19.474 4.99 21.075 5 C 23.192 5.03 25.137 6.169 26.2 8 L 30 8 C 30.404 7.999 30.769 8.24 30.925 8.612 C 31.072 8.989 30.989 9.417 30.713 9.712 Z" fill="#10002B"></path>
          </svg>
        </div>

        <a href="https://www.linkedin.com/in/%D0%B6%D0%B8%D0%B1%D0%B5%D0%BA-%D0%B6%D1%83%D0%BC%D0%B0%D0%B3%D1%83%D0%BB-725658283/">
        <div className={s.sm2}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M 0 0 L 32 0 L 32 32 L 0 32 Z" fill="transparent"></path>
            <path d="M 12 16 C 12 13.791 13.791 12 16 12 C 18.209 12 20 13.791 20 16 C 20 18.209 18.209 20 16 20 C 13.791 20 12 18.209 12 16 Z" fill="#10002B"></path>
            <path d="M 21.5 3.5 L 10.5 3.5 C 6.634 3.5 3.5 6.634 3.5 10.5 L 3.5 21.5 C 3.5 25.366 6.634 28.5 10.5 28.5 L 21.5 28.5 C 25.366 28.5 28.5 25.366 28.5 21.5 L 28.5 10.5 C 28.5 6.634 25.366 3.5 21.5 3.5 Z M 16 22 C 12.686 22 10 19.314 10 16 C 10 12.686 12.686 10 16 10 C 19.314 10 22 12.686 22 16 C 22 19.314 19.314 22 16 22 Z M 22.5 11 C 21.672 11 21 10.328 21 9.5 C 21 8.672 21.672 8 22.5 8 C 23.328 8 24 8.672 24 9.5 C 24 10.328 23.328 11 22.5 11 Z" fill="#10002B"></path>
          </svg>
          </div>
        </a>
        <a href="https://instagram.com/noodlix?igshid=MzRlODBiNWFlZA==">
          <div className={s.sm4}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </div>
        </a>
      </div>
    </div>
    </>
  )
}
