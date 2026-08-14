import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { pingCommand } from './commands/ping.js';
import { config } from './config/env.js';
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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`Unknown slash command: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error, `Failed to execute /${interaction.commandName}`);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'Sorry, something went wrong while executing that command.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'Sorry, something went wrong while executing that command.',
        ephemeral: true,
      });
    }
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
