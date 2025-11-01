import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default ai