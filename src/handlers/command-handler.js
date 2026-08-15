import { logger } from '../lib/logger.js';

export async function handleCommand(interaction, commands) {
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
}
