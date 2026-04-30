import type { BotContext } from "../types.js";
import {
  storeConnection,
  removeConnection,
  getSettings,
} from "../services/redis.js";
import { t } from "../services/i18n.js";

export async function onBusinessConnect(ctx: BotContext): Promise<void> {
  const conn = ctx.businessConnection;
  if (!conn) return;

  const userId = conn.user.id;

  if (conn.is_enabled) {
    await storeConnection(conn.id, userId);
    const settings = await getSettings(userId);
    const s = t(settings.language);
    await ctx.api.sendMessage(conn.user_chat_id, s.connected);
  } else {
    await removeConnection(conn.id);
    const settings = await getSettings(userId);
    const s = t(settings.language);
    await ctx.api.sendMessage(conn.user_chat_id, s.disconnected);
  }
}
