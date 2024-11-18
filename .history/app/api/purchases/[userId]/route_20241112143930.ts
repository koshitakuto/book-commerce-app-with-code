import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// 購入履歴検索API
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // `prisma`を使ってデータベースからユーザーの購入履歴を取得
    const purchases = await prisma.purchase.findMany({
      where: { userId: params.userId },
    });

    // 成功時にJSONレスポンスを返す
    return NextResponse.json(purchases);
  } catch (err) {
    // エラー発生時にエラーレスポンスを返す
    return NextResponse.json({
      error: "Failed to fetch purchases",
      details: err,
    });
  }
}
