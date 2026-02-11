import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateHandler = async (req, res) => {
  try {
    const { lfaData } = req.body;
    if (!process.env.GOOGLE_API_KEY) return res.status(500).json({ error: "Missing API Key" });

    const models = ["gemini-3-flash-preview", "gemini-flash-latest", "gemini-1.5-flash"];
    let lastError = null;

    for (const name of models) {
      try {
        const model = genAI.getGenerativeModel({ model: name });
        const result = await model.generateContent(`
Review this LFA and provide insights (### Strengths, ### Gaps/Risks, ### System-Level Suggestions):
Problem: ${lfaData.step1}
Change: ${lfaData.step2}
Interventions: ${lfaData.step3}
Stakeholders: ${(lfaData.step4 || []).map(s => s.name).join(", ")}
Practice Changes: ${lfaData.step5}
KPIs: ${lfaData.step6}
`);
        const text = result.response.text();
        if (text) return res.json({ text, model: name });
      } catch (err) {
        lastError = err;
        if (err.message.includes("API_KEY_INVALID") || err.message.includes("expired")) break;
      }
    }
    throw lastError || new Error("Generation failed");
  } catch (err) {
    res.status(500).json({ error: "AI generation failed", details: err.message });
  }
};

app.post("/api/generate-insights", generateHandler);
app.post("/generate-insights", generateHandler);
export default app;