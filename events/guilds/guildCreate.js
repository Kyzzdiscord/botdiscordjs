const  { Guild }  = require('../../models/index');
const Logger = require('../../utils/Logger');

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild) {
        const createGuild = await new Guild({ id:  guild.id });
        createGuild.save().then(g => Logger.client(`nouveau serveur: ${g.id}`));
    }
};