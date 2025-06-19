import { GoogleGenAI } from "@google/genai";
class GeminiService {
  static {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  }

  async generateWorkout(context) {
    try {
      const prompt = `Generate a ${context.activity} workout for ${context.duration} minutes. Please respond ONLY with a valid JSON array containing workout information. 
The response should start with '[' and end with ']' with no additional text. 
       The focus should be ${context.focus}. The user is feeling ${context.freshness} and is ${context.motivation}.
       The response should always be an array of blocks, each block having a duration and zone from 1 easy to 5 hardest and a short description.`;
      const response = await GeminiService.ai.models
        .generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: { maxOutputTokens: 2000 },
        })
        .catch((e) => {
          console.warn(e);
          throw new Error(
            `Failed to generate workout data with gemini AI. Error: 
            ${e?.message ?? "no message"}`,
          );
        });
      if (!response.text || response.text.length === 0) {
        console.warn(
          "Throwing error in GeminiService.generateWorkout ... no error message",
        );
        throw new Error("Failed to generate workout data with gemini AI.");
      }

      const arrStartIndex = response.text.indexOf("[");
      const arrEndIndex = response.text.lastIndexOf("]") + 1;
      const onlyJsonPayload = response.text.substring(
        arrStartIndex,
        arrEndIndex,
      );
      return JSON.parse(onlyJsonPayload);
    } catch (error) {
      console.warn(error);

      throw new Error(error?.message);
    }
  }
}

export default new GeminiService();
