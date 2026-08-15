import { logger } from '../lib/logger.js';

export async function handleMessage(message, client) {
  if (message.author.bot) {
    return;
  }

  const isDirectMessage = message.channel.isDMBased();

  if (!isDirectMessage && !message.mentions.has(client.user)) {
    return;
  }

  try {
    await message.reply('👋 Hey! I’m EmiBot. I’m online and working!');
  } catch (error) {
    logger.error(error, 'Failed to reply to Discord message');
  }
}
