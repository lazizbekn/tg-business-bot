import { webhookCallback } from "grammy";
import { bot } from "../src/bot.js";

export const config = {
  api: { bodyParser: false },
};

const secret = process.env.WEBHOOK_SECRET;

export default webhookCallback(bot, "std/http", {
  secretToken: secret,
});
