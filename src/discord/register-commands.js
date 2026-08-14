import { REST, Routes } from 'discord.js';

import { config } from '../config/env.js';
import { pingCommand } from '../commands/ping.js';
import { logger } from '../lib/logger.js';

const commands = [pingCommand.data];

if (!config.discord.guildId) {
  throw new Error('DISCORD_GUILD_ID is required to register slash commands.');
}

const rest = new REST({ version: '10' }).setToken(config.discord.token);

try {
  logger.info('Registering slash commands...');

  await rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.guildId), {
    body: commands,
  });

  logger.info(`Successfully registered ${commands.length} slash command(s).`);
} catch (error) {
  logger.error(error, 'Failed to register slash commands');
  process.exit(1);
}
