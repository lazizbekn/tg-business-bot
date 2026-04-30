import { InlineKeyboard } from "grammy";
import type { Strings } from "../services/i18n.js";
import type { UserSettings } from "../types.js";

export function mainMenu(s: Strings): InlineKeyboard {
  return new InlineKeyboard()
    .text(s.btnHowToConnect, "menu:howToConnect")
    .text(s.btnHowItWorks, "menu:howItWorks")
    .row()
    .text(s.btnProfile, "menu:profile")
    .text(s.btnLanguages, "menu:languages");
}

export function languageMenu(): InlineKeyboard {
  return new InlineKeyboard()
    .text("🇬🇧 English", "lang:en")
    .text("🇷🇺 Русский", "lang:ru")
    .text("🇺🇿 O'zbek", "lang:uz")
    .row()
    .text("« Back", "menu:back");
}

export function settingsMenu(s: Strings, settings: UserSettings): InlineKeyboard {
  return new InlineKeyboard()
    .text(s.btnTrackEdits(settings.trackEdits), "toggle:trackEdits")
    .row()
    .text(s.btnTrackDeletes(settings.trackDeletes), "toggle:trackDeletes")
    .row()
    .text(s.btnTrackReplies(settings.trackReplies), "toggle:trackReplies")
    .row()
    .text(s.btnBack, "menu:profile");
}

export function profileMenu(s: Strings): InlineKeyboard {
  return new InlineKeyboard()
    .text("⚙️ Settings", "menu:settings")
    .row()
    .text(s.btnBack, "menu:back");
}
