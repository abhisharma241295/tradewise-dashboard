/**
 * Converts a string to a consistent hex color code
 * @param str The input string to convert to a color
 * @returns A hex color code
 */
export const stringToHexColor = (str: string): string => {
  // If the string is empty, return a default color
  if (!str) return "#000000"

  // Generate a hash from the input string
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Convert the hash to a hex color
  const color = Math.abs(hash).toString(16).slice(0, 6)

  // Ensure the color is 6 digits long by padding with zeros
  return `#${color.padStart(6, "0")}`
}
