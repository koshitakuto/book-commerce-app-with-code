import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllBooks(); // getAllBooksが関数として認識されるか確認
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  // 初期化を空の配列で行う
  let purchasesBookIds: string[] = [];

  if (user) {
    try {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
        { cache: "no-store" } // SSR用
      );
      const purchasesData = await response.json();

      console.log("API response:", purchasesData); // デバッグ用

      if (Array.isArray(purchasesData)) {
        purchasesBookIds = purchasesData.map(
          (purchaseBook: Purchase) => purchaseBook.bookId
        );
      } else {
        console.error(
          "Expected purchasesData to be an array, but got:",
          purchasesData
        );
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
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
            isPurchased={
              Array.isArray(purchasesBookIds) &&
              purchasesBookIds.includes(book.id)
            }
          />
        ))}
      </main>
    </>
  );
}
