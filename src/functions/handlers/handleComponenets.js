const { readdirSync } = require('fs');

module.exports = (client) => {
    client.handleComponents = async() => {
        const componentFolders = readdirSync(`./src/components`)
        for (const folder in componentFolders) {
            const componentFiles = readdirSync(`.src/components/${folder}`)
                .filter(file => file.endsWith('.js'));

            const { menus } = client;

            switch (folder)
            {
                case 'menus':
                    for (const file in componentFiles) {
                        const menu = require(`../../components/${folder}/${file}`);

                        menus.set(menus.button.name, menu);
                    }
                        break;
                default:
                    break;
            }
        }
    }
}