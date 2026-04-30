import type { BotContext } from "../types.js";
import {
  getSettings,
  updateSettings,
  getConnectionOwner,
} from "../services/redis.js";
import { t } from "../services/i18n.js";
import {
  mainMenu,
  languageMenu,
  settingsMenu,
  profileMenu,
} from "../keyboards/menus.js";

export async function onCallbackQuery(ctx: BotContext): Promise<void> {
  const data = ctx.callbackQuery?.data;
  const userId = ctx.from?.id;
  if (!data || !userId) {
    await ctx.answerCallbackQuery();
    return;
  }

  const settings = await getSettings(userId);
  const s = t(settings.language);

  // ─── Menu navigation ────────────────────────────────────────────────────────

  if (data === "menu:back") {
    await ctx.editMessageText(s.welcome, {
      parse_mode: "Markdown",
      reply_markup: mainMenu(s),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  if (data === "menu:howToConnect") {
    await ctx.editMessageText(s.howToConnect, {
      parse_mode: "Markdown",
      reply_markup: new (await import("grammy")).InlineKeyboard().text(
        s.btnBack,
        "menu:back"
      ),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  if (data === "menu:howItWorks") {
    await ctx.editMessageText(s.howItWorks, {
      parse_mode: "Markdown",
      reply_markup: new (await import("grammy")).InlineKeyboard().text(
        s.btnBack,
        "menu:back"
      ),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  if (data === "menu:profile") {
    // Check if business is connected by trying to look up any active connection
    // We use a simple flag stored via settings or just show generic info
    const profileText = s.profile(userId, false, settings);
    await ctx.editMessageText(profileText, {
      parse_mode: "Markdown",
      reply_markup: profileMenu(s),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  if (data === "menu:settings") {
    await ctx.editMessageText("⚙️ *Settings*", {
      parse_mode: "Markdown",
      reply_markup: settingsMenu(s, settings),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  if (data === "menu:languages") {
    await ctx.editMessageText(s.languages, {
      parse_mode: "Markdown",
      reply_markup: languageMenu(),
    });
    await ctx.answerCallbackQuery();
    return;
  }

  // ─── Language selection ──────────────────────────────────────────────────────

  if (data.startsWith("lang:")) {
    const lang = data.split(":")[1];
    const updated = await updateSettings(userId, { language: lang });
    const newS = t(updated.language);

    await ctx.editMessageText(newS.welcome, {
      parse_mode: "Markdown",
      reply_markup: mainMenu(newS),
    });
    await ctx.answerCallbackQuery(newS.settingsUpdated);
    return;
  }

  // ─── Settings toggles ────────────────────────────────────────────────────────

  if (data.startsWith("toggle:")) {
    const key = data.split(":")[1] as
      | "trackEdits"
      | "trackDeletes"
      | "trackReplies";

    if (key in settings) {
      const updated = await updateSettings(userId, {
        [key]: !settings[key],
      });

      await ctx.editMessageReplyMarkup({
        reply_markup: settingsMenu(s, updated),
      });
      await ctx.answerCallbackQuery(s.settingsUpdated);
      return;
    }
  }

  await ctx.answerCallbackQuery();
}
