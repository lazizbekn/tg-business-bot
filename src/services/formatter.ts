import type { Message } from "grammy/types";

export function formatMessage(msg: Message): string {
  const parts: string[] = [];

  const senderName =
    "first_name" in msg.from!
      ? `${msg.from!.first_name}${msg.from!.last_name ? " " + msg.from!.last_name : ""}`
      : "Unknown";

  parts.push(`👤 *From:* ${escapeMarkdown(senderName)}`);

  if (msg.text) {
    parts.push(`💬 ${escapeMarkdown(msg.text)}`);
  } else if (msg.caption) {
    parts.push(`📎 _[Media]_ ${escapeMarkdown(msg.caption)}`);
  } else if (msg.photo) {
    parts.push("📷 _[Photo]_");
  } else if (msg.video) {
    parts.push("🎥 _[Video]_");
  } else if (msg.voice) {
    parts.push("🎤 _[Voice message]_");
  } else if (msg.audio) {
    parts.push("🎵 _[Audio]_");
  } else if (msg.document) {
    parts.push(`📄 _[Document: ${escapeMarkdown(msg.document.file_name ?? "file")}]_`);
  } else if (msg.sticker) {
    parts.push(`${msg.sticker.emoji ?? "🎭"} _[Sticker]_`);
  } else if (msg.video_note) {
    parts.push("📹 _[Video note]_");
  } else if (msg.contact) {
    parts.push(
      `📞 _[Contact: ${escapeMarkdown(msg.contact.first_name)}]_`
    );
  } else if (msg.location) {
    parts.push(
      `📍 _[Location: ${msg.location.latitude}, ${msg.location.longitude}]_`
    );
  } else if (msg.poll) {
    parts.push(`📊 _[Poll: ${escapeMarkdown(msg.poll.question)}]_`);
  } else {
    parts.push("_[Unsupported message type]_");
  }

  const date = new Date(msg.date * 1000);
  parts.push(`🕐 ${date.toUTCString()}`);

  return parts.join("\n");
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
