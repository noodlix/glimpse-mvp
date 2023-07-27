// 'use client'
import Image from 'next/image';
// import { useState } from 'react';
import s from '../guessing/Guessing.module.css';

// export async function getServerSideProps() {
//   const response = await fetch('/api/covers/route');
//   const { booksData } = await response.json();

//   return {
//     props: {
//       books: booksData,
//     },
//   };
// }


export default async function Guessing({ books }) {
  // const [books, setBooks] = useState([]);


  const response = await fetch('/api/covers', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ }),

  })

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
      {/* <div className={s.book}>
        <div className={s.title}></div>
        <div className={s.summary}></div>
        <div className={s.url}></div>
      </div> */}
      {/* {books.map((book) => (
        <div key={book._id} className={s.book}>
          <div className={s.title}>{book.title}</div>
          <div className={s.summary}>{book.summary}</div>
          <div className={s.url}>{book.url}</div>
        </div>
      ))} */}
    </div>
  );
}
