import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AdCopy, AspectRatio } from "../types";

const apiKey = process.env.API_KEY;
// Helper to ensure API key exists
const getClient = () => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates an image based on the user's prompt using gemini-2.5-flash-image
 */
export const generateAdImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const ai = getClient();
  
  // Enhancing prompt for better visual results suitable for ads
  const enhancedPrompt = `Professional advertisement photography, high resolution, 4k, cinematic lighting: ${prompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: enhancedPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    // Iterate to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data returned from the API.");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw new Error("Failed to generate advertisement image.");
  }
};

/**
 * Generates marketing copy based on the user's prompt using gemini-2.5-flash
 */
export const generateAdCopy = async (prompt: string): Promise<AdCopy> => {
  const ai = getClient();

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      headline: { type: Type.STRING, description: "A catchy, short headline for the ad." },
      tagline: { type: Type.STRING, description: "A memorable slogan." },
      body: { type: Type.STRING, description: "Persuasive body text explaining the product/service." },
      callToAction: { type: Type.STRING, description: "Short CTA like 'Buy Now' or 'Learn More'." },
    },
    required: ["headline", "tagline", "body", "callToAction"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write professional marketing copy for an advertisement based on this request: "${prompt}". 
      Make it engaging, professional, and suitable for a modern brand.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");

    return JSON.parse(text) as AdCopy;
  } catch (error) {
    console.error("Text Gen Error:", error);
    throw new Error("Failed to generate advertisement copy.");
  }
};