import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  const newUser = await prisma.user.create({
    data: { username: username },
  });
  return NextResponse.json(newUser);
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  return NextResponse.json(user);
}
