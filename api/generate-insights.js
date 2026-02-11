import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { lfaData } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing GOOGLE_API_KEY in environment" });

    const genAI = new GoogleGenerativeAI(apiKey);
    const models = ["gemini-3-flash-preview", "gemini-flash-latest", "gemini-1.5-flash"];
    let lastError = null;

    for (const name of models) {
      try {
        console.log(`Attempting with model: ${name}`);
        const model = genAI.getGenerativeModel({ model: name });
        const result = await model.generateContent(`
Review this LFA and provide professional insights (### Strengths, ### Gaps/Risks, ### System-Level Suggestions):
Problem: ${lfaData.step1}
Change: ${lfaData.step2}
Interventions: ${lfaData.step3}
Stakeholders: ${(lfaData.step4 || []).map(s => s.name).join(", ")}
Practice Changes: ${lfaData.step5}
KPIs: ${lfaData.step6}
`);
        const response = await result.response;
        const text = response.text();
        if (text) {
          console.log(`Success with model: ${name}`);
          return res.status(200).json({ text, model: name });
        }
      } catch (err) {
        console.error(`Error with model ${name}:`, err.message);
        lastError = err;
        if (err.message.includes("API_KEY_INVALID") || err.message.includes("expired")) break;
      }
    }
    throw lastError || new Error("All models failed to generate content");
  } catch (err) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: "AI generation failed", details: err.message });
  }
}
