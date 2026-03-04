import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// API route to process voice/text input
app.post("/ai-task", async (req, res) => {
  const text = req.body.text;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
            messages: [
        {
            role: "system",
            content:
"You are a todo task extractor. Convert the sentence into a natural todo task exactly like a human would write in a todo list. Remove phrases like 'I should', 'I need to', 'remind me to', but keep the main action and object."
        },
        {
            role: "user",
            content: text
        }
        ]
    });

    // Extract AI response
   let aiTask = completion.choices[0].message.content.trim();

aiTask = aiTask.replace(/^I should\s*/i, "")
               .replace(/^I need to\s*/i, "")
               .replace(/^Remind me to\s*/i, "")
               .replace(/^I have to\s*/i, "");

    res.json({
      task: aiTask
    });

  } catch (error) {
    console.error("OpenAI Error:", error);

    // fallback: return original text
    res.json({
      task: text
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});