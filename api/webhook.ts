import type { VercelRequest, VercelResponse } from "@vercel/node";
import { bot, botReady } from "../src/bot.js";

export const config = {
  api: { bodyParser: true },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(200).json({ ok: true });
    return;
  }

  try {
    await botReady; // ensure bot info is fetched before handling
    await bot.handleUpdate(req.body);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
