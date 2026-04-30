import type { BotContext } from "../types.js";
import { fetchMessage, saveMessage } from "../services/messageStore.js";
import { getSettings, getConnectionOwner } from "../services/redis.js";
import { t } from "../services/i18n.js";
import { formatMessage } from "../services/formatter.js";

export async function onEditedBusinessMessage(ctx: BotContext): Promise<void> {
  const msg = ctx.editedBusinessMessage;
  if (!msg) return;

  const businessConnectionId =
    ctx.update.edited_business_message?.business_connection_id;
  if (!businessConnectionId) return;

  const ownerId = await getConnectionOwner(businessConnectionId);
  if (!ownerId) return;

  const settings = await getSettings(ownerId);
  if (!settings.trackEdits) {
    // Still update the stored version even if not forwarding
    await saveMessage(businessConnectionId, msg);
    return;
  }

  const s = t(settings.language);
  const chatTitle = msg.chat.title ?? msg.chat.first_name ?? "Unknown";

  // Fetch the original before overwriting
  const original = await fetchMessage(
    businessConnectionId,
    msg.chat.id,
    msg.message_id
  );

  // Overwrite stored version with the new edited message
  await saveMessage(businessConnectionId, msg);

  const originalContent = original
    ? formatMessage(original.data)
    : s.noContent;
  const editedContent = formatMessage(msg);

  await ctx.api.sendMessage(
    ownerId,
    `${s.editedMessage(chatTitle)}\n${originalContent}`,
    { parse_mode: "Markdown" }
  );

  await ctx.api.sendMessage(
    ownerId,
    `${s.editedMessageNew}\n${editedContent}`,
    { parse_mode: "Markdown" }
  );
}
