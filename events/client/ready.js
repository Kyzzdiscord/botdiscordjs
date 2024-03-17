const Logger = require('../../utils/Logger')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client('Est prêt pour la bagarre !')

        const devGuild = await client.guilds.cache.get('1210917493867155516');
        devGuild.commands.set(client.commands.map(cmd => cmd));

        const activities = [
            '🤖 Bot de modération du serveur SsV !',
            '📞 Contacte @kyzz.blend pour avoir un bot !',
            '🎤 Mon développeur adore pop smoke !',
            '➕ Abonne toi à KYZZDZN sur youtube !'
        ]
    
        setInterval(() => {
            const status = activities[Math.floor(Math.random() * activities.length)];
            client.user.setPresence({activities: [{name: `${status}`}]});
        }, 12000);
    },
};