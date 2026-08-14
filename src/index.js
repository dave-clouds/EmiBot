import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { config } from './config/env.js';
import { logger } from './lib/logger.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once('clientReady', (readyClient) => {
  logger.info(`EmiBot is online as ${readyClient.user.tag}`);
});

client.on('messageCreate', async (message) => {
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
});

client.on('error', (error) => {
  logger.error(error, 'Discord client error');
});

process.on('SIGINT', () => {
  logger.info('Shutting down EmiBot...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down EmiBot...');
  client.destroy();
  process.exit(0);
});

client.login(config.discord.token).catch((error) => {
  logger.error(error, 'Failed to connect to Discord');
  process.exit(1);
});
