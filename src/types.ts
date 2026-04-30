import type { Context } from "grammy";
import type { Message } from "grammy/types";

export interface UserSettings {
  trackEdits: boolean;
  trackDeletes: boolean;
  trackReplies: boolean;
  language: string;
}

export interface StoredMessage {
  messageId: number;
  chatId: number;
  businessConnectionId: string;
  date: number;
  data: Message;
}

export type BotContext = Context;
