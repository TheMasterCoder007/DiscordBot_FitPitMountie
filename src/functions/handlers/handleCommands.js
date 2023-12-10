const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

// export function that takes a client parameter
module.exports = (client) => {
    // defines handler command function
    // this function iterates though all command files and loads them
    // all commands are then integrated into the discord bot
    // metadata is stored within commandArray
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            const {commands, commandArray} = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                await commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const clientID = '1182907301720498206';
        const rest = new REST({version: '9'}).setToken(process.env.token);
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(clientID), {
                body: client.commandArray,
            });
        } catch (error) {
            console.error(error);
        }
    };
};