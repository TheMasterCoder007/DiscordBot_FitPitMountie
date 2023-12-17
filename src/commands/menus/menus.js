const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder} = require('discord.js');

// export menu command function
module.exports = {
    // create new slash command called 'story'
    data: new SlashCommandBuilder()
        .setName('select-law-for-display')
        .setDescription('Returns a list of Fit Pit laws'),
    // build select menu
    async execute (interaction, client) {
        const lawMenu = new StringSelectMenuBuilder()
            .setCustomId('laws')
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Cows')
                    .setDescription('Find the invisible cow')
                    .setValue('https://findtheinvisiblecow.com'),
            );

        // add law menu component to action row
        // send action row to user
        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(lawMenu)]
        });
    }
}