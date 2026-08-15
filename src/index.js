import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { pingCommand } from './commands/ping.js';
import { config } from './config/env.js';
import { handleCommand } from './handlers/command-handler.js';
import { handleMessage } from './handlers/message-handler.js';
import { logger } from './lib/logger.js';

const commands = new Map([[pingCommand.data.name, pingCommand]]);

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
  await handleMessage(message, client);
});

client.on('interactionCreate', async (interaction) => {
  await handleCommand(interaction, commands);
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
