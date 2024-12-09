import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

import jwt from "jsonwebtoken";
interface Message {
  senderId: number;
  receiverId: number;
  text?: string;
  imageUrl?: string;
  emoji?: string;
}

export async function POST(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized due to missing token" });
  }
  const isTokenValid = jwt.verify(token, JWT_SECRET);
  if (!isTokenValid) {
    return NextResponse.json({ error: "Unauthorized due to invalid token" });
  }

  const formData = await req.formData();
  const senderId = Number(formData.get("senderId"));
  const receiverId = Number(formData.get("receiverId"));
  const text = formData.get("text") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const emoji = formData.get("emoji") as string;

  const newMessage = await prisma.message.create({
    data: { senderId, receiverId, text, imageUrl, emoji },
  });
  return NextResponse.json(newMessage);
}

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized due to missing token" });
  }
  const isTokenValid = jwt.verify(token, JWT_SECRET);
  if (!isTokenValid) {
    return NextResponse.json({ error: "Unauthorized due to invalid token" });
  }
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
