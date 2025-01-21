/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { ImageGenerator } from "@/lib/imageGenerator";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const { prompts } = await request.json();

  try {
    // Clean up old generated images
    const outputDir = path.join(process.cwd(), "public", "generated");
    if (fs.existsSync(outputDir)) {
      fs.readdirSync(outputDir).forEach((file) => {
        const filePath = path.join(outputDir, file);
        fs.unlinkSync(filePath);
      });
    }

    const imagePaths = await Promise.all(
      prompts.map((prompt: string, index: number) =>
        ImageGenerator.generateAndSaveImage(prompt, index)
      )
    );

    return NextResponse.json({ imagePaths });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}
