'use client'
import Image from 'next/image';
import { useState } from 'react';
import s from '../guessing/Guessing.module.css';

export default function Guessing() {
  const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   fetch('/api/chat')
  //     .then((response) => response.json())
  //     .then((data) => setBooks(data))
  //     .catch((error) => console.error('Error fetching books:', error));
  // }, []);

  console.log(books)
  return (
    <div className={s.container}>
      <div className={s.maincard}>
        <Image
          src="/2.png"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', borderRadius: '30px' }}
          alt="The Brothers Karamazov"
        />
      </div>
      <div className={s.book}>
        <div className={s.title}></div>
        <div className={s.summary}></div>
        <div className={s.url}></div>
      </div>
      {/* {books.map((book, index) => (
        <div key={index}>{book.message}</div>
      ))} */}
    </div>
  );
}
