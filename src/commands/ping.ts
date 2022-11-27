export const testCommand = {
    data: {
        name: 'ping',
        description: 'Pong?',       
    },
    run: async (interaction: any) => {
        await interaction.reply('pong');
    }
}