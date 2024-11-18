import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

// エンドポイント
const ENDPOINT = "blogcommerce";

// 全ての書籍データを取得
export const getAllBooks = async () => {
  try {
    const allBooks = await client.getList<BookType>({
      endpoint: ENDPOINT,
    });
    return allBooks;
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw new Error("Failed to fetch all books");
  }
};

// 特定の書籍データを取得
export const getDetailBook = async (contentId: string) => {
  if (!contentId) {
    console.error("Invalid contentId:", contentId);
    throw new Error("Content ID is required to fetch detail book");
  }

  try {
    const detailBook = await client.getListDetail<BookType>({
      endpoint: ENDPOINT,
      contentId,
    });
    return detailBook;
  } catch (error) {
    console.error("Error fetching detail book:", error);

    // エラーレスポンスの詳細を表示
    if (error instanceof Response) {
      console.error("Status:", error.status);
      console.error("Status Text:", error.statusText);
    }

    throw new Error("Failed to fetch detail book");
  }
};
