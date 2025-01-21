/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { scenario } = await request.json();

  const url = "https://api.hyperbolic.xyz/v1/chat/completions";
  const prompt = `Generate 40 detailed image prompts for a stop motion animation sequence about: ${scenario}. 
    Each prompt should be one line and describe a subtle progression from the previous frame.`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5saWtlbWFpbmdpQGdtYWlsLmNvbSIsImlhdCI6MTczNTMxNDIwMX0.dy4jANPuzStUYy46hyD5HUVm0mHBZ0aidd7B55wvpIw",
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V3",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.9,
        stream: false,
      }),
    });

    const json = await response.json();
    const prompts = json.choices[0].message.content.split("\n").filter(Boolean);

    return NextResponse.json({ prompts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate prompts" },
      { status: 500 }
    );
  }
}
