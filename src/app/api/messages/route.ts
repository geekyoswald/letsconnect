import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Message {
  senderId: number;
  receiverId: number;
  text: string;
}

export async function POST(req: NextRequest) {
  const { senderId, receiverId, text }: Message = await req.json();
  const newMessage = await prisma.message.create({
    data: { senderId, receiverId, text },
  });
  return NextResponse.json(newMessage);
}

export async function GET(req: NextRequest) {
  const userId = Number(req.headers.get("userId"));
  const { searchParams } = new URL(req.url);
  const friendId = Number(searchParams.get("friendId"));

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: friendId },
        { senderId: friendId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}
