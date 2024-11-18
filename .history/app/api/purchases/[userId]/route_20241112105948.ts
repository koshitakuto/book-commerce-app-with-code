export async function GET(
  reqest: Request,
  { params }: { params: { userId: string } }
);
{
  const userId = params.userId;

  try {
    const purchases = await prisma.purchases.findMany({
      where: { userId: userId },
    });
  } catch (err) {
    return NextResponse.json(err);
  }
}
