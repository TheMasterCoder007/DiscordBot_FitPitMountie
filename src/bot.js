// extract discord bot token from environment variables
require('dotenv').config();
const{token} = process.env;

// import necessary modules and packages
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const fs = require('fs');

// create a new instance of the bot client
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();
client.commandArray = [];

// create a collection to store the bots commands
client.commands = new Collection();

// dynamically load folders and files and pass client into all js files
const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles) {
        const path = `./functions/${folder}/${file}`;
        require(path)(client);
    }
}

// call handler functions
client.handleEvents();
client.handleCommands();
// log bot in
client.login(token)
    .then(() => {
        console.log('Fit Pit Mountie is now connected to Discord.');
    })
    .catch((error) => {
        console.error('There was a error logging in: ', error);
    });
