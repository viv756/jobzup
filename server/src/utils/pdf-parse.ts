import { PDFParse } from "pdf-parse";

export async function extractPdfText(buffer: Buffer) {
  // Convert Buffer to Uint8Array
  const uint8Array = new Uint8Array(buffer);
  const parser = new PDFParse(uint8Array);
  const result = await parser.getText();
  return result;
}
