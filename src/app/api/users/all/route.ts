import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const JWT_SECRET = process.env.JWT_SECRET_KEY || "";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized due to missing token" });
  }
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized due to invalid token" });
  }
  
  const currentUserId = decodedToken.id;
  
  // Fetch all users except the current user
  const allUsers = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
      },
    },
  });
  
  return NextResponse.json(allUsers);
}
