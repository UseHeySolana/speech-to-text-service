import { Response, Request } from "express";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const openAiTTS = async (text: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // const speechFile = path.resolve("./speech.mp3");

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);
  return buffer;
};

export default openAiTTS;
