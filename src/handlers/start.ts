import type { BotContext } from "../types.js";
import { getSettings } from "../services/redis.js";
import { t } from "../services/i18n.js";
import { mainMenu } from "../keyboards/menus.js";

export async function onStart(ctx: BotContext): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) return;

  const settings = await getSettings(userId);
  const s = t(settings.language);

  await ctx.reply(s.welcome, {
    parse_mode: "Markdown",
    reply_markup: mainMenu(s),
  });
}
