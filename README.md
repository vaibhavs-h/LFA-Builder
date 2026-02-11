# LFA Builder (Logical Framework Approach Builder)

LFA Builder is a web-based tool designed to help education practitioners create a **Logical Framework Approach (LFA)** step-by-step. The platform guides users through defining problems, mapping stakeholders, and generating **AI-assisted insights** using Google Gemini.

---

## 🔗 Live Application
The application is live and can be accessed at: 
**[lfa-builder.vercel.app](https://lfa-builder.vercel.app)**

---

## ✨ Key Features

*   **Step-by-Step Flow**: Guided process from Problem definition to KPI mapping.
*   **AI Insights**: Professional review and suggestions powered by **Google Gemini**.
*   **Persistent Progress**: Save your work automatically within the session.
*   **Export-Ready**: Print your LFA summary directly to PDF.

---

## 🏗️ Project Structure

The project is optimized for **Vercel** serverless deployment.

```
LFA-Builder/
├── backend/
│   └── server.js      # Serverless API (Gemini Integration)
├── frontend/
│   ├── pages/         # HTML Steps and Summary
│   ├── js/            # Client-side logic
│   └── assets/        # Project images/icons
├── package.json       # App dependencies
└── vercel.json        # Vercel routing configuration
```

---

## 🤖 AI Insights

The "Generate Insights" feature uses the Google Gemini API to analyze your LFA and provide:
- **Strengths**: Highlights of the design.
- **Gaps or Risks**: Potential issues or missing considerations.
- **System-Level Suggestions**: Strategic advice for scaling impact.

---

⭐ **If you found this project helpful, please consider giving it a star on GitHub!** ⭐

---
Built with ❤️ by [Vaibhav](https://github.com/vaibhavs-h)