module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            // if no command specified, return
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch(error){
                console.error(error);
                await interaction.reply({
                    content: `Mountie down! There was a problem executing this command...`,
                    ephemeral: true
                });
            }
        } else if (interaction.isStringSelectMenu()) {
            const { menus } = client;
            const { customId } = interaction;
            const menu = menus.get(customId);
            if (!menu) return new Error('There was a error opening the menu...');

            try{
                await menu.execute(interaction, client);
            }catch(error) {
                console.error(error);
            }
        }
    },
}