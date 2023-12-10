const fs = require('fs');
const {SlashCommandBuilder} = require('discord.js');

// export storyline command function
module.exports = {
    // create new slash command called 'story'
    data: new SlashCommandBuilder()
        .setName('story')
        .setDescription('Returns the Fit Pit Mounties story'),
    // execute command
    async execute (interaction) {
        // get text data from text file
        const storyFilePath = './src/commands/storyline/story.txt';
        fs.readFile(storyFilePath, 'utf8', async (err, story) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            // print story to console
            await interaction.reply({
                content: story,
                ephemeral: true,
            });
        })
    }
}