import type { BotContext } from "../types.js";
import { fetchMessage } from "../services/messageStore.js";
import { getSettings, getConnectionOwner } from "../services/redis.js";
import { t } from "../services/i18n.js";
import { formatMessage } from "../services/formatter.js";

export async function onDeletedBusinessMessages(ctx: BotContext): Promise<void> {
  const deletion = ctx.update.deleted_business_messages;
  if (!deletion) return;

  const businessConnectionId = deletion.business_connection_id;
  const chatId = deletion.chat.id;
  const chatTitle =
    deletion.chat.title ?? deletion.chat.first_name ?? "Unknown";

  const ownerId = await getConnectionOwner(businessConnectionId);
  if (!ownerId) return;

  const settings = await getSettings(ownerId);
  if (!settings.trackDeletes) return;

  const s = t(settings.language);

  for (const messageId of deletion.message_ids) {
    const stored = await fetchMessage(businessConnectionId, chatId, messageId);
    if (!stored) continue;

    const content = formatMessage(stored.data);

    await ctx.api.sendMessage(
      ownerId,
      `${s.deletedMessage(chatTitle)}\n\n${content}`,
      { parse_mode: "Markdown" }
    );
  }
}
