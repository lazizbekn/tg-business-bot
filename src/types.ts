import type { Context, SessionFlavor } from "grammy";
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

export interface SessionData {
  language: string;
}

export type BotContext = Context & SessionFlavor<SessionData>;
