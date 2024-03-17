const { MessageEmbed, Interaction } = require("discord.js");
const superagent = require('superagent');

module.exports = {
    name: "frapper",
    category: "fun",
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'frapper <user>',
    examples: ['frapper @username'],
    description: "Taper quelqu'un !",
     async run(client, message, args) {
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/slap");

          const personHugged = message.mentions.users.first();

          if (message.mentions.users.first() ==message.author)  
            return message.channel.send(`☣ vous ne pouvez pas vous frapper vous même !`);

          if(personHugged){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Une bagarre est en train d'arriver... 🤜`)
        .setDescription(`${message.author} frappe ${personHugged} 🤜 !`)
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
      description: "Qui est ce que vous voulez frapper ?",
      type: "USER",
      required: true,
  },],


    async runInteraction (client, interaction) {
      

        
        const personHugged2 = interaction.options.getUser("personne")
        
        const { body } = await superagent
          .get("https://nekos.life/api/v2/img/slap");

          if(personHugged2){
        const embed = new MessageEmbed()
        .setColor("#FF4A4A")
        .setTitle(`Une bagarre est en train d'arriver... 🤜`)
        .setDescription(`${interaction.user} frappe ${personHugged2} 🤜!`)
        .setImage(body.url)
        .setTimestamp()
        .setFooter({ 
            text: interaction.user.username, 
            iconURL: interaction.user.displayAvatarURL() });

            interaction.reply({ embeds: [embed]}); }
    }
};