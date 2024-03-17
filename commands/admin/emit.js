const { Interaction } = require("discord.js");

module.exports = {
    name: 'emit',
    category: "admin",
    permissions: ['ADMINISTRATOR'],
    description: 'Emmetre un évenement au choix',
    run: (client, message, args) => {
    if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove|guildCreate)$/)) return message.reply('Merci d\'entrer un évènement valide (\`guildMemberAdd\`/\`guildMemberRemove\`)');

    if (args[0] == 'guildMemberAdd') {
        client.emit('guildMemberAdd', message.member);
        message.reply('Event guildMemberAdd émit !');
    } else if (args[0] == 'guildCreate') {
        client.emit('guildCreate', message.guild);
        message.reply('Event guildCreate émit !');
    } else {
        client.emit('guildMemberRemove', message.member);
        message.reply('Event guildMemberRemove émit !');
    }
    },
    options: [ {
        name: 'evenement',
        description: 'choisir un évenement à émettre',
        type: 'STRING',
        required: true,
        choices: [{
            name: 'guildMemberAdd',
            value: 'guildMemberAdd'
        },
        {
            name: 'guildMemberRemove',
            value: 'guildMemberRemove'
        }, {
            name: 'guildCreate',
            value: 'guildCreate'
        }]
    }],
    runInteraction: (client, Interaction) => {
        const eventChoices = Interaction.options.getString('evenement');

        if (eventChoices == 'guildMemberAdd'){
            client.emit('guildMemberAdd', Interaction.member);
            Interaction.reply({ content: "Event `guildMemberAdd` émit !", ephemeral: true });
        } else if (eventChoices == 'guildCreate') {
            client.emit('guildCreate', Interaction.guild);
            Interaction.reply({ content: "Event `guildCreate` émit !", ephemeral: true });
        }else {
            client.emit('guildMemberRemove', Interaction.member);
            Interaction.reply({ content: "Event `guildMemberRemove` émit !", ephemeral: true });
        }
    }
};