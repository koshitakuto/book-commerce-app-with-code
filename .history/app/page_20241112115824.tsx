// "use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user: any = session?.user;

  let purchasesBookIds: any = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { catche: "no-store" }
    );
    const purchasesData = await response.json();

    console.log("API response:", purchasesData); // デバッグ用

    if (Array.isArray(purchasesData)) {
      purchasesBookIds = purchasesData.map(
        (purchaseBook: any) => purchaseBook.bookId
      );
    } else {
      console.error(
        "Expected purchasesData to be an array, but got:",
        purchasesData
      );
    }
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchasesBookIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
