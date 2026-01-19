import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const validatePassword = (password: string): { isValid: boolean; error: string | null } => {
  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters long" };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one number" };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one special character (!@#$%^&*...)" };
  }
  return { isValid: true, error: null };
};

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Validate username length
    if (username.trim().length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters long" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username.trim(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username: username.trim(), password: hashedPassword },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    // Handle Prisma errors or other unexpected errors
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
