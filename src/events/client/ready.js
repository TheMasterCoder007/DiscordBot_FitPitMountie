// report that the Fit Pit Mountie is logged in and online
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
    console.log(`Reporting for duty! ${client.user.tag} is logged in and online`);
    }
}