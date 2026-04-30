import type { Message } from "grammy/types";
import { storeMessage, getMessage } from "./redis.js";
import type { StoredMessage } from "../types.js";

export async function saveMessage(
  businessConnectionId: string,
  msg: Message
): Promise<void> {
  const chatId = msg.chat.id;
  const stored: StoredMessage = {
    messageId: msg.message_id,
    chatId,
    businessConnectionId,
    date: msg.date,
    data: msg,
  };
  await storeMessage(stored);
}

export async function fetchMessage(
  businessConnectionId: string,
  chatId: number,
  messageId: number
): Promise<StoredMessage | null> {
  return getMessage(businessConnectionId, chatId, messageId);
}
