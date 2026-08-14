export const pingCommand = {
  data: {
    name: 'ping',
    description: 'Check whether EmiBot is responding.',
  },

  async execute(interaction) {
    await interaction.reply('Pong! 🏓');
  },
};
