const { MessageEmbed, Formatters } = require ('discord.js')

module.exports = {
    name: "guildMemberRemove",
    once: false,
    async execute(client, member) {

    const embed = new MessageEmbed()
    .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.displayAvatarURL() })
    .setColor('#21ff81')
    .setDescription(`± Nom d'utilisateur: ${member.displayName}
    ± Créé le: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
    ± Rejoint le: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
    ± Quitté le: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>)
    `)
    
    .setTimestamp()
    .setFooter({ text: 'L\'utilisateur à quitté!'})

    const logChannel = client.channels.cache.get('1213844637987643402');
    logChannel.send({embeds: [embed]})
    },
};
