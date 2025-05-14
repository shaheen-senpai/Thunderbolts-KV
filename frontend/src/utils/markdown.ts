// Utility to convert code blocks in text to proper markdown format
export const formatCodeBlocks = (text: string): string => {
  // Replace ```language\ncode\n``` with proper markdown code blocks
  return text.replace(
    /```([\w-]+)?\n([\s\S]+?)```/g, 
    (_, language, code) => `\`\`\`${language || ''}\n${code.trim()}\n\`\`\``
  );
};

// Function to highlight syntax in code blocks
export const formatMarkdown = (text: string): string => {
  return formatCodeBlocks(text);
};
