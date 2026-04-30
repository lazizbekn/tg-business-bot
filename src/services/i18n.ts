export type LangCode = "en" | "ru" | "uz";

const strings = {
  en: {
    welcome:
      "👋 Hello! I'm a Telegram Business assistant bot.\n\nI save messages that are edited or deleted in your business chats, and let you recover messages that can't be forwarded.\n\nUse the menu below to get started.",
    howToConnect:
      "📌 *How to connect me to your Telegram Business account:*\n\n1. Open Telegram → Settings → Telegram Business\n2. Tap *Chatbots*\n3. Tap *Add a Chatbot*\n4. Enter my username and confirm\n\nOnce connected, I'll start tracking your business chat messages automatically.",
    howItWorks:
      "⚙️ *How it works:*\n\n• *Sharing disabled* — When someone disables forwarding on their messages, you can still save them by replying to them.\n\n• *Edit tracking* — When a user edits a message, you receive both the original and edited versions.\n\n• *Delete tracking* — When a user deletes a message, I send you the deleted content.\n\n• *Saved from reply* — Reply to any message (including view-once or timed messages) and I'll save it for you.\n\nYou can mute me so I don't distract you — I'll still send messages for you to review later.",
    profile: (
      userId: number,
      connected: boolean,
      settings: {
        trackEdits: boolean;
        trackDeletes: boolean;
        trackReplies: boolean;
      }
    ) =>
      `👤 *Your Profile*\n\n🆔 User ID: \`${userId}\`\n🔗 Business connected: ${connected ? "✅ Yes" : "❌ No"}\n\n*Settings:*\n• Edit tracking: ${settings.trackEdits ? "✅" : "❌"}\n• Delete tracking: ${settings.trackDeletes ? "✅" : "❌"}\n• Save from replies: ${settings.trackReplies ? "✅" : "❌"}`,
    languages: "🌐 Choose your language:",
    settingsUpdated: "✅ Settings updated.",
    connected: "✅ Bot connected to your Telegram Business account! I'll now track your chats.",
    disconnected: "🔌 Bot disconnected from your Telegram Business account.",
    editedMessage: (chatTitle: string) =>
      `✏️ *Message edited* in *${chatTitle}*\n\n*Original:*`,
    editedMessageNew: "📝 *Edited version:*",
    deletedMessage: (chatTitle: string) =>
      `🗑️ *Deleted message* from *${chatTitle}*:`,
    replySaved: (chatTitle: string) =>
      `💾 *Saved message* from *${chatTitle}*:`,
    noContent: "[No text content]",
    btnHowToConnect: "📌 How to connect",
    btnHowItWorks: "⚙️ How it works",
    btnProfile: "👤 Profile",
    btnLanguages: "🌐 Languages",
    btnTrackEdits: (on: boolean) => `${on ? "✅" : "❌"} Edit tracking`,
    btnTrackDeletes: (on: boolean) => `${on ? "✅" : "❌"} Delete tracking`,
    btnTrackReplies: (on: boolean) => `${on ? "✅" : "❌"} Save from replies`,
    btnBack: "« Back",
  },
  ru: {
    welcome:
      "👋 Привет! Я бот-помощник для Telegram Business.\n\nЯ сохраняю сообщения, которые были отредактированы или удалены в ваших бизнес-чатах, и помогаю восстановить сообщения с запрещённым пересылом.\n\nИспользуйте меню ниже для начала работы.",
    howToConnect:
      "📌 *Как подключить меня к Telegram Business:*\n\n1. Откройте Telegram → Настройки → Telegram Business\n2. Нажмите *Чат-боты*\n3. Нажмите *Добавить чат-бот*\n4. Введите моё имя пользователя и подтвердите\n\nПосле подключения я начну отслеживать ваши бизнес-чаты.",
    howItWorks:
      "⚙️ *Как это работает:*\n\n• *Пересылка запрещена* — Если пользователь запретил пересылку, вы всё равно можете сохранить сообщение, ответив на него.\n\n• *Отслеживание изменений* — При редактировании вы получите оригинал и новую версию.\n\n• *Отслеживание удалений* — При удалении я пришлю вам удалённое содержимое.\n\n• *Сохранение по ответу* — Ответьте на любое сообщение (включая одноразовые) — я сохраню его.\n\nВы можете заглушить меня — я всё равно буду присылать сообщения.",
    profile: (
      userId: number,
      connected: boolean,
      settings: { trackEdits: boolean; trackDeletes: boolean; trackReplies: boolean }
    ) =>
      `👤 *Ваш профиль*\n\n🆔 ID: \`${userId}\`\n🔗 Business подключён: ${connected ? "✅ Да" : "❌ Нет"}\n\n*Настройки:*\n• Изменения: ${settings.trackEdits ? "✅" : "❌"}\n• Удаления: ${settings.trackDeletes ? "✅" : "❌"}\n• Сохранение по ответу: ${settings.trackReplies ? "✅" : "❌"}`,
    languages: "🌐 Выберите язык:",
    settingsUpdated: "✅ Настройки обновлены.",
    connected: "✅ Бот подключён к вашему Telegram Business! Начинаю отслеживать чаты.",
    disconnected: "🔌 Бот отключён от вашего Telegram Business.",
    editedMessage: (chatTitle: string) =>
      `✏️ *Сообщение изменено* в *${chatTitle}*\n\n*Оригинал:*`,
    editedMessageNew: "📝 *Новая версия:*",
    deletedMessage: (chatTitle: string) =>
      `🗑️ *Удалённое сообщение* из *${chatTitle}*:`,
    replySaved: (chatTitle: string) => `💾 *Сохранённое сообщение* из *${chatTitle}*:`,
    noContent: "[Нет текстового содержимого]",
    btnHowToConnect: "📌 Как подключить",
    btnHowItWorks: "⚙️ Как работает",
    btnProfile: "👤 Профиль",
    btnLanguages: "🌐 Языки",
    btnTrackEdits: (on: boolean) => `${on ? "✅" : "❌"} Отслеживание изменений`,
    btnTrackDeletes: (on: boolean) => `${on ? "✅" : "❌"} Отслеживание удалений`,
    btnTrackReplies: (on: boolean) => `${on ? "✅" : "❌"} Сохранение по ответу`,
    btnBack: "« Назад",
  },
  uz: {
    welcome:
      "👋 Salom! Men Telegram Business yordamchi botiman.\n\nMen sizning biznes chatlarингиздa tahrirlangan yoki o'chirilgan xabarlarни saqlayman va yo'naltirilishi cheklangan xabarlarni tiklashga yordam beraman.\n\nBoshlash uchun quyidagi menyudan foydalaning.",
    howToConnect:
      "📌 *Meni Telegram Business'ga qanday ulash mumkin:*\n\n1. Telegram → Sozlamalar → Telegram Business\n2. *Chatbotlar*ni bosing\n3. *Chatbot qo'shish*ni bosing\n4. Mening foydalanuvchi nomimni kiriting va tasdiqlang\n\nUlangandan so'ng men biznes chatlaringizni kuzata boshlayman.",
    howItWorks:
      "⚙️ *Qanday ishlaydi:*\n\n• *Ulashish o'chirilgan* — Agar foydalanuvchi xabarlarini yo'naltirishni taqiqlagan bo'lsa, ularga javob bersangiz saqlashingiz mumkin.\n\n• *Tahrir kuzatuvi* — Xabar tahrirlanganida asl va yangi versiyani olasiz.\n\n• *O'chirish kuzatuvi* — Xabar o'chirilganida men sizga o'chirilgan mazmunni yubora­man.\n\n• *Javobdan saqlash* — Istalgan xabarga (shu jumladan bir martalik) javob bering — men uni saqlayman.\n\nMeni ovozsiz qo'yishingiz mumkin — baribir xabar yuboraverama.",
    profile: (
      userId: number,
      connected: boolean,
      settings: { trackEdits: boolean; trackDeletes: boolean; trackReplies: boolean }
    ) =>
      `👤 *Profilingiz*\n\n🆔 ID: \`${userId}\`\n🔗 Business ulangan: ${connected ? "✅ Ha" : "❌ Yo'q"}\n\n*Sozlamalar:*\n• Tahrir kuzatuvi: ${settings.trackEdits ? "✅" : "❌"}\n• O'chirish kuzatuvi: ${settings.trackDeletes ? "✅" : "❌"}\n• Javobdan saqlash: ${settings.trackReplies ? "✅" : "❌"}`,
    languages: "🌐 Tilni tanlang:",
    settingsUpdated: "✅ Sozlamalar yangilandi.",
    connected: "✅ Bot Telegram Business hisobingizga ulandi! Chatlarni kuzatishni boshladim.",
    disconnected: "🔌 Bot Telegram Business hisobingizdan uzildi.",
    editedMessage: (chatTitle: string) =>
      `✏️ *Tahrirlangan xabar* — *${chatTitle}*\n\n*Asl versiya:*`,
    editedMessageNew: "📝 *Yangi versiya:*",
    deletedMessage: (chatTitle: string) =>
      `🗑️ *O'chirilgan xabar* — *${chatTitle}*:`,
    replySaved: (chatTitle: string) => `💾 *Saqlangan xabar* — *${chatTitle}*:`,
    noContent: "[Matn yo'q]",
    btnHowToConnect: "📌 Qanday ulash",
    btnHowItWorks: "⚙️ Qanday ishlaydi",
    btnProfile: "👤 Profil",
    btnLanguages: "🌐 Tillar",
    btnTrackEdits: (on: boolean) => `${on ? "✅" : "❌"} Tahrir kuzatuvi`,
    btnTrackDeletes: (on: boolean) => `${on ? "✅" : "❌"} O'chirish kuzatuvi`,
    btnTrackReplies: (on: boolean) => `${on ? "✅" : "❌"} Javobdan saqlash`,
    btnBack: "« Orqaga",
  },
} as const;

export interface Strings {
  welcome: string;
  howToConnect: string;
  howItWorks: string;
  profile: (
    userId: number,
    connected: boolean,
    settings: { trackEdits: boolean; trackDeletes: boolean; trackReplies: boolean }
  ) => string;
  languages: string;
  settingsUpdated: string;
  connected: string;
  disconnected: string;
  editedMessage: (chatTitle: string) => string;
  editedMessageNew: string;
  deletedMessage: (chatTitle: string) => string;
  replySaved: (chatTitle: string) => string;
  noContent: string;
  btnHowToConnect: string;
  btnHowItWorks: string;
  btnProfile: string;
  btnLanguages: string;
  btnTrackEdits: (on: boolean) => string;
  btnTrackDeletes: (on: boolean) => string;
  btnTrackReplies: (on: boolean) => string;
  btnBack: string;
}

export function t(lang: string): Strings {
  const code = (lang in strings ? lang : "en") as LangCode;
  return strings[code] as Strings;
}
