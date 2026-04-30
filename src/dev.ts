import "dotenv/config";
import { bot } from "./bot.js";

console.log("Starting bot in polling mode (dev)...");
bot.start();
