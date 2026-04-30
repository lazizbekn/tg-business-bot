import type { BotContext } from "../types.js";
import { saveMessage, fetchMessage } from "../services/messageStore.js";
import { getSettings, getConnectionOwner } from "../services/redis.js";
import { t } from "../services/i18n.js";
import { formatMessage } from "../services/formatter.js";

export async function onBusinessMessage(ctx: BotContext): Promise<void> {
  const msg = ctx.businessMessage;
  if (!msg) return;

  const businessConnectionId = ctx.update.business_message?.business_connection_id;
  if (!businessConnectionId) return;

  // Store every message for potential edit/delete recovery
  await saveMessage(businessConnectionId, msg);

  // Handle reply-based saving
  const replyTo = msg.reply_to_message;
  if (!replyTo) return;

  const ownerId = await getConnectionOwner(businessConnectionId);
  if (!ownerId) return;

  // Only trigger when the business account owner is the one replying
  const conn = await ctx.getBusinessConnection();
  const isOwnerReplying = ctx.from?.id === conn.user.id;
  if (!isOwnerReplying) return;

  const settings = await getSettings(ownerId);
  if (!settings.trackReplies) return;

  const s = t(settings.language);
  const chatTitle = msg.chat.title ?? msg.chat.first_name ?? "Unknown";

  // Try to get the richer stored version first, fall back to embedded reply object
  const stored = await fetchMessage(
    businessConnectionId,
    replyTo.chat?.id ?? msg.chat.id,
    replyTo.message_id
  );

  const sourceMsg = stored?.data ?? replyTo;
  const content = formatMessage(sourceMsg);

  await ctx.api.sendMessage(
    ownerId,
    `${s.replySaved(chatTitle)}\n\n${content}`,
    { parse_mode: "Markdown" }
  );
}
