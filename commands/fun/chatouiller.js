const { MessageEmbed, Interaction } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "chatouiller",
    category: "fun",
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'chatouiller <user>',
    examples: ['chatouiller @username'],
    description: "Chatouiller quelqu'un !",
     async run(client, message, args) {
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/tickle");

          const personHugged = message.mentions.users.first();

          if(personHugged){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Un fou rire explose !... 🤣`)
        .setDescription(`${message.author} chatouille ${personHugged} 😹 !`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter({ 
            text: message.author.username, 
            iconURL: message.author.displayAvatarURL() });

            message.reply({ embeds: [embed]}); }
            
            else{message.channel.send(`Désolé ${message.author}... cette personne n'est pas dans le serveur !!`)}
    },

    options: [ {
      name: "personne",
      description: "Qui est ce que vous voulez xhatouiller ?",
      type: "USER",
      required: true,
  },],


    async runInteraction (client, interaction) {

        
        const personHugged2 = interaction.options.getUser("personne")
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/tickle");

          if(personHugged2){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Un fou rire explose !... 🤣`)
        .setDescription(`${interaction.user} chatouille ${personHugged2} 😹!`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter({ 
            text: interaction.user.username, 
            iconURL: interaction.user.displayAvatarURL() });

            interaction.reply({ embeds: [embed]}); }
    }
};