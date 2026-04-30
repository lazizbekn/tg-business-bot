import { Bot } from "grammy";
import type { BotContext } from "./types.js";
import { onStart } from "./handlers/start.js";
import { onBusinessConnect } from "./handlers/business.js";
import { onBusinessMessage } from "./handlers/messages.js";
import { onEditedBusinessMessage } from "./handlers/edits.js";
import { onDeletedBusinessMessages } from "./handlers/deletes.js";
import { onCallbackQuery } from "./handlers/settings.js";

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}

export const bot = new Bot<BotContext>(process.env.BOT_TOKEN);

bot.command("start", onStart);

bot.on("business_connection", onBusinessConnect);

bot.on("business_message", onBusinessMessage);

bot.on("edited_business_message", onEditedBusinessMessage);

bot.on("deleted_business_messages", onDeletedBusinessMessages);

bot.on("callback_query:data", onCallbackQuery);

bot.catch((err) => {
  console.error("Bot error:", err);
});
