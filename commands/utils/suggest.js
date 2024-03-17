const { Interaction } = require("discord.js");
const { MessageEmbed } = require ('discord.js');

module.exports = {
    name: "suggest",
    category: "utils",
    permissions: ['ADMINISTRATOR'],
    description: "Poster votre suggestion !",
    async run (client, message, args) {
        if (!args[0]) return message.reply('Merci de bien vouloir entrer une question pour le sondage');
        const embed = new MessageEmbed()
        .setTitle("🔔 Nouvelle suggestion !")
        .setColor('#00a3b5')
        .setDescription(args.slice(0).join(' '))
        .setTimestamp()
        .setFooter({text: `🤗 Nouvelle suggestion de ${message.author.tag} !🤗`});

        const poll = await message.reply({ embeds: [embed]});
        poll.react('✅')
        poll.react('❌')

    },
    options: [ {
        name: "titre",
        description: "écrivez votre titre !",
        type: "STRING",
        required: true,
    }, {
        name: "contenu",
        description: "expliquez votre suggestion !",
        type: "STRING",
        required: true,
    }],
    async runInteraction (client, Interaction) {
        const pollTitle = Interaction.options.getString('titre');
        const pollDescr = Interaction.options.getString('contenu');

        const embed = new MessageEmbed()
        .setTitle(pollTitle)
        .setColor('#00a3b5')
        .setDescription(pollDescr)
        .setTimestamp()
        .setFooter({text: `🤗 Nouvelle suggestion de ${Interaction.user.tag} !🤗`});

        const poll = await Interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('✅')
        poll.react('❌')

    }
};