import { NextResponse } from "next/server";

export async function GET(
  reqest: Request,
  { params }: { params: { userId: string } }
);
{
  const userId = params.userId;

  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    });

    return NextResponse.json(purchases);
  } catch (err) {
    return NextResponse.json(err);
  }
}
