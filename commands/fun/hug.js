const { MessageEmbed, Interaction } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "hug",
    category: "fun",
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'hug <user>',
    examples: ['hug @username'],
    description: "Faire un calin !",
     async run(client, message, args) {
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/hug");

          const personHugged = message.mentions.users.first();

          if(personHugged){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Gros calin !... 💞`)
        .setDescription(`${message.author} fait un calin à ${personHugged} :heart: !`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter({ 
            text: message.author.username, 
            iconURL: message.author.displayAvatarURL() });

            message.reply({ embeds: [embed]}); }
            
            else{message.channel.send(`Désolé ${message.author}... cette personne n'est pas dans le serveur !`)}
    },

    options: [ {
      name: "personne",
      description: "à qui voulez vous faire un calin ?",
      type: "USER",
      required: true,
  },],


    async runInteraction (client, interaction) {

        
        const personHugged2 = interaction.options.getUser("personne")
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/hug");

          if(personHugged2){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Gros calin !... 💞`)
        .setDescription(`${interaction.user} fait un calin à ${personHugged2} :heart: !`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter({ 
            text: interaction.user.username, 
            iconURL: interaction.user.displayAvatarURL() });

            interaction.reply({ embeds: [embed]}); }
    }
};