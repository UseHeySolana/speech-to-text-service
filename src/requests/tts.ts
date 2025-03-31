import OpenAI from "openai";

const openAiTTS = async (text: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // const speechFile = path.resolve("./speech.mp3");

  const mp3 = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: text,
  });


  return mp3;
};


export default openAiTTS;
