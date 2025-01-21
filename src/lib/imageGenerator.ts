/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import path from "path";
import https from "https";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export class ImageGenerator {
  static async generateAndSaveImage(
    prompt: string,
    index: number
  ): Promise<string> {
    const baseUrl = "https://image.pollinations.ai/prompt/";
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = baseUrl + encodedPrompt;
    const outputDir = path.join(process.cwd(), "public", "generated");
    const timestamp = Date.now();
    const fileName = `frame-${index}-${timestamp}.jpg`;
    const filePath = path.join(outputDir, fileName);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      https
        .get(imageUrl, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP error! status: ${response.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(filePath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            revalidatePath("/generated");
            resolve(`/generated/${fileName}`);
          });
        })
        .on("error", reject);
    });
  }
}
