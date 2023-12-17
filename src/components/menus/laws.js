module.exports = {
    data: {
        name: `laws`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://findtheinvisiblecow.com/`
        });
    }
}