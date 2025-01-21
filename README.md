# **FrameCraft Studio**

**Craft Your Story, Frame by Frame**

FrameCraft Studio is an AI-powered platform that simplifies the creation of stop motion animations. By leveraging advanced AI models, it generates sequential image prompts, creates high-quality images, and compiles them into a stop motion video—all in one seamless workflow. Whether you're an animator, educator, content creator, or hobbyist, FrameCraft Studio makes stop motion animation accessible and fun.

---

## **Features**

- **AI-Generated Prompts:** Automatically generates 40 sequential image prompts based on your input.
- **AI-Powered Image Generation:** Creates stunning images for each frame using cutting-edge AI models.
- **Stop Motion Compilation:** Compiles images into a smooth stop motion video.
- **User-Friendly Interface:** Intuitive and easy to use, even for beginners.
- **Customizable Outputs:** Adjust frame rates, add music, or tweak prompts for personalized animations.

---

## **Tech Stack**

- **Frontend:** Next.js, React
- **Backend:** Next.js API Routes
- **AI APIs:**
  - [Hyperbolic API](https://api.hyperbolic.xyz/) for prompt generation.
  - [Pollinations API](https://image.pollinations.ai/) for image generation.
- **Image Storage:** Local file system (public/images).
- **Video Compilation:** FFmpeg (optional, for compiling images into a video).

---

## **Getting Started**

### **Prerequisites**

- Node.js (v16 or higher)
- FFmpeg (optional, for video compilation)
- API keys:
  - Hyperbolic API key (sign up at [Hyperbolic](https://hyperbolic.xyz/)).

---

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/framecraft-studio.git
   cd framecraft-studio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env.local` file in the root directory and add your API key:

   ```env
   HYPERBOLIC_API_KEY=your_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## **How It Works**

### **1. User Input**

- Users describe their stop motion animation idea in a text box (e.g., "A tiny robot exploring a magical forest").

### **2. AI-Generated Prompts**

- The platform sends the user's input to the Hyperbolic API, which generates 40 sequential image prompts.

### **3. AI-Powered Image Generation**

- Each prompt is sent to the Pollinations API, which generates a corresponding image.
- Images are saved locally in the `public/images` folder.

### **4. Stop Motion Compilation**

- The platform compiles the generated images into a stop motion video using FFmpeg.
- Users can preview and download the final video.

---

## **Folder Structure**

```
framecraft-studio/
├── public/
│   ├── images/                  # Generated images are stored here
│   └── output.mp4               # Final stop motion video
├── pages/
│   ├── api/
│   │   ├── generate-prompts.js  # API route for generating prompts
│   │   └── generate-images.js   # API route for generating images
│   └── index.js                 # Frontend homepage
├── styles/                      # CSS files
├── .env.local                   # Environment variables
└── package.json                 # Project dependencies
```

---

## **API Routes**

### **1. Generate Prompts**

- **Endpoint:** `/api/generate-prompts`
- **Method:** POST
- **Input:**
  ```json
  {
    "userInput": "A tiny robot exploring a magical forest"
  }
  ```
- **Output:**
  ```json
  {
    "prompts": [
      "Frame 1: A tiny robot stands at the edge of a magical forest.",
      "Frame 2: The robot takes its first step into the forest.",
      ...
    ]
  }
  ```

### **2. Generate Images**

- **Endpoint:** `/api/generate-images`
- **Method:** POST
- **Input:**
  ```json
  {
    "prompts": [
      "Frame 1: A tiny robot stands at the edge of a magical forest.",
      "Frame 2: The robot takes its first step into the forest.",
      ...
    ]
  }
  ```
- **Output:**
  ```json
  {
    "imageUrls": [
      "/images/frame-1.png",
      "/images/frame-2.png",
      ...
    ]
  }
  ```

---

## **Optional: Compile Images into a Video**

To compile the generated images into a video, use FFmpeg:

1. Install FFmpeg on your system.
2. Run the following command in the terminal:
   ```bash
   ffmpeg -framerate 10 -i public/images/frame-%d.png -c:v libx264 -r 30 -pix_fmt yuv420p public/output.mp4
   ```
   This will create a video file at `public/output.mp4`.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- [Hyperbolic](https://hyperbolic.xyz/) for the AI prompt generation API.
- [Pollinations](https://image.pollinations.ai/) for the image generation API.
- [FFmpeg](https://ffmpeg.org/) for video compilation.

---

## **Contact**

Have questions or feedback? Reach out to us at:

- **Email:** manlikemaingi@gmail.com

---

**Craft Your Story, Frame by Frame with FrameCraft Studio!** 🎬✨
