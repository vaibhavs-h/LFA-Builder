import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

app.post("/generate-insights", async (req, res) => {
  try {
    const { lfaData } = req.body;

    const prompt = `
You are an education systems expert.
Based on the following Logical Framework data, generate concise strategic insights:

Problem Statement:
${lfaData.step1}

Desired Change:
${lfaData.step2}

Intervention:
${lfaData.step3}

Stakeholders:
${(lfaData.step4 || []).map(s => s.name).join(", ")}

Practice Changes:
${lfaData.step5}

KPIs:
${lfaData.step6}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
