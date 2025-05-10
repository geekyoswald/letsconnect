import React from "react";

interface SingleMessageType {
  text: string;
  isSender: boolean; // true if sender, false if receiver
}

const SingleMessage = ({ text, isSender }: SingleMessageType) => {
  // Detect and extract code blocks, bullet points, and paragraphs
  const codeBlockRegex = /```([\s\S]*?)```/gs;
  const bulletPointRegex = /(^|\n)-\s(.*?)(?=\n|$)/g;
  const boldRegex = /\*\*(.*?)\*\*/g;
  const italicRegex = /\*(.*?)\*/g;
  const underlineRegex = /__(.*?)__/g;
  const headerRegex = /^(#{1,6})\s+(.*)/gm;

  const formattedText = text.split(codeBlockRegex).map((part, index) => {
    if (index % 2 === 1) {
      return (
        <pre
          key={index}
          className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-y-auto max-h-96 w-full shadow-lg border border-gray-700"
        >
          <code className="whitespace-pre-wrap font-mono text-sm">
            {part.trim()}
          </code>
        </pre>
      );
    }
    return part.split("\n").map((line, idx) => {
      if (line.match(headerRegex)) {
        const headerMatch = line.match(headerRegex);
        if (headerMatch) {
          const level = headerMatch[1].length;
          return React.createElement(
            `h${level}`,
            { key: idx, className: "font-bold mt-2 mb-2 text-xl" },
            headerMatch[2]
          );
        }
      }
      if (line.match(bulletPointRegex)) {
        return (
          <li key={idx} className="list-disc ml-5">
            {line.replace(/^[-\s]+/, "")}
          </li>
        );
      }
      let formattedLine = line;
      formattedLine = formattedLine.replace(boldRegex, "<strong>$1</strong>");
      formattedLine = formattedLine.replace(italicRegex, "<em>$1</em>");
      formattedLine = formattedLine.replace(underlineRegex, "<u>$1</u>");
      return (
        <p
          key={idx}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        ></p>
      );
    });
  });

  return (
    <div
      className={`w-full flex ${isSender ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-2xl p-4 rounded-2xl border border-gray-300 shadow-md whitespace-pre-wrap ${
          isSender ? "bg-rose-50" : "bg-gray-100"
        }`}
      >
        {formattedText}
      </div>
    </div>
  );
};

export default SingleMessage;
