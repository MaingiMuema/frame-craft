/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [scenario, setScenario] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Generating prompts...");

    try {
      // Generate prompts
      const promptResponse = await fetch("/api/generate-prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });
      const { prompts } = await promptResponse.json();

      // Generate images
      setStatus("Generating images...");
      const imageResponse = await fetch("/api/generate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompts }),
      });
      const { imagePaths } = await imageResponse.json();
      setImages(imagePaths);
      setStatus("Complete!");
    } catch (error) {
      setStatus("Error occurred");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Stop Motion Generator</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe your stop motion animation scenario"
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Generate Animation
          </button>
        </form>

        {status && <p className="mb-4">{status}</p>}

        <div className="grid grid-cols-4 gap-4">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Frame ${index}`}
              width={200}
              height={200}
              className="rounded"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
