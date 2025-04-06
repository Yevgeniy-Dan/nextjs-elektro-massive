/**
 * Extracts the first N characters from Rich Text (blocks) without markup, returning text trimmed to the nearest space. Used for Rich Text fields in Strapi.
 * @param richTextArray
 * @param maxLength
 * @returns string
 * @example
 * const trimmedDescription = getTrimmedMetaDescription(richTextArray, 150);
 * console.log(trimmedDescription); // Outputs the trimmed description
 */
export const getTrimmedMetaDescription = (
  richTextArray: any[],
  maxLength = 150
): string => {
  if (!Array.isArray(richTextArray)) return "";

  const fullText = richTextArray
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((child: { text: any }) => child.text)
          .join("");
      }
      return "";
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (fullText.length <= maxLength) return fullText;

  const trimmed = fullText.slice(0, maxLength);
  const lastSpaceIndex = trimmed.lastIndexOf(" ");

  return trimmed.slice(0, lastSpaceIndex) + "...";
};
