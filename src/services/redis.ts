import { Redis } from "@upstash/redis";
import type { UserSettings, StoredMessage } from "../types.js";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// ─── Keys ────────────────────────────────────────────────────────────────────

const msgKey = (
  businessConnectionId: string,
  chatId: number,
  messageId: number
) => `msg:${businessConnectionId}:${chatId}:${messageId}`;

const settingsKey = (userId: number) => `settings:${userId}`;
const connKey = (businessConnectionId: string) => `conn:${businessConnectionId}`;

// ─── Messages ────────────────────────────────────────────────────────────────

export async function storeMessage(msg: StoredMessage): Promise<void> {
  await redis.set(
    msgKey(msg.businessConnectionId, msg.chatId, msg.messageId),
    msg
  );
}

export async function getMessage(
  businessConnectionId: string,
  chatId: number,
  messageId: number
): Promise<StoredMessage | null> {
  return redis.get<StoredMessage>(msgKey(businessConnectionId, chatId, messageId));
}

// ─── User Settings ───────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: UserSettings = {
  trackEdits: true,
  trackDeletes: true,
  trackReplies: true,
  language: "en",
};

export async function getSettings(userId: number): Promise<UserSettings> {
  const stored = await redis.get<UserSettings>(settingsKey(userId));
  return stored ?? { ...DEFAULT_SETTINGS };
}

export async function updateSettings(
  userId: number,
  patch: Partial<UserSettings>
): Promise<UserSettings> {
  const current = await getSettings(userId);
  const updated = { ...current, ...patch };
  await redis.set(settingsKey(userId), updated);
  return updated;
}

// ─── Business Connections ────────────────────────────────────────────────────

export async function storeConnection(
  businessConnectionId: string,
  userId: number
): Promise<void> {
  await redis.set(connKey(businessConnectionId), userId);
}

export async function removeConnection(businessConnectionId: string): Promise<void> {
  await redis.del(connKey(businessConnectionId));
}

export async function getConnectionOwner(
  businessConnectionId: string
): Promise<number | null> {
  return redis.get<number>(connKey(businessConnectionId));
}
