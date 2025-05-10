import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

// ✅ OpenRouter Free DeepSeek API
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL!;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("authorization");
  const token = bearerToken?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized due to missing token" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
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

// export async function POST(req: NextRequest) {
//   try {
//     console.log("Incoming request:", req);

//     let jsonBody;
//     try {
//       jsonBody = await req.json();
//     } catch (parseError) {
//       console.error("JSON parsing error:", parseError);
//       return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
//     }

//     const { messages } = jsonBody;
//     console.log("Parsed messages:", messages);

//     // ✅ Calling Free DeepSeek API via OpenRouter
//     const response = await fetch(OPENROUTER_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "deepseek/deepseek-r1:free", // ✅ Free DeepSeek Model
//         messages,
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`API request failed: ${response.status} - ${errorText}`);
//       throw new Error(errorText);
//     }

//     const data = await response.json();

//     // ✅ Ensure the response structure matches what the frontend expects
//     if (!data.choices || data.choices.length === 0) {
//       throw new Error("Invalid response from DeepSeek API");
//     }

//     let messageContent = data.choices[0].message.content || "";

//     // ✅ Automatically format code blocks
//     messageContent = formatCodeBlocks(messageContent);

//     console.log("Final Response:", messageContent);

//     // ✅ Return response in a structured format
//     return NextResponse.json({
//       choices: [
//         {
//           message: {
//             role: "assistant",
//             content: messageContent,
//           },
//         },
//       ],
//     });
//   } catch (error) {
//     console.error("Server error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    console.log("Raw incoming request body:\n", rawBody);

    const jsonBody = JSON.parse(rawBody);
    const { messages } = jsonBody;

    // 🔄 Stream request to Ollama
    const ollamaResponse = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        messages,
      }),
    });

    if (!ollamaResponse.body) {
      throw new Error("No response body from Ollama");
    }

    // 🧠 Collect streamed response line-by-line
    const reader = ollamaResponse.body.getReader();
    const decoder = new TextDecoder();
    let result = "";
    let completeContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      result += decoder.decode(value, { stream: true });

      // 🧼 Process complete lines (newline-delimited JSON)
      const lines = result.split("\n");
      result = lines.pop()!; // save last incomplete line for next iteration

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.message?.content) {
            completeContent += parsed.message.content;
          }
        } catch (err) {
          console.warn("Skipping malformed line:", line);
        }
      }
    }

    // 🧽 Format the final result (if needed)
    const messageContent = formatCodeBlocks(completeContent);

    return NextResponse.json({
      choices: [
        {
          message: {
            role: "assistant",
            content: messageContent,
          },
        },
      ],
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 Function to format DeepSeek's code response
function formatCodeBlocks(text: string): string {
  return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `\n\`\`\`${lang || "plaintext"}\n${code.trim()}\n\`\`\`\n`;
  });
}
