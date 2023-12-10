const fs = require('fs');

// export function for handling events
module.exports = (client) => {
    // defines handler event function
    // reads through all folder and files within events
    // executes events as needed
    client.handleEvents = async() => {
        const eventFolders = fs.readdirSync(`./src/events`);
        for (const folder of eventFolders) {
            const eventFiles = fs
                .readdirSync(`./src/events/${folder}`)
                .filter(file => file.endsWith('.js'));

            // switch event logic based on event folder
            switch (folder) {
                case 'client':
                    for(const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        // client requires event to only execute once
                        if (event.once) {
                           client.once(event.name, (...args) => event.execute(...args, client));
                        }
                        // client requires event to execute multiple times
                        else {
                            client.on(event.name, (...args) => event.execute(...args, client));
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }
}