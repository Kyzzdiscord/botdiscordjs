const { MessageEmbed, User } = require ('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const prefix = '+';

const contextDescription = {
    userinfo: 'renvoie les informations d\'un utilisateur'
}

module.exports = {
    name: "help",
    category: "utils",
    permissions: ['ADMINISTRATOR'],
    description: "Voir les différentes commandes !",
    async run (client, message, args) {
        if(!args.length) {
            const noArgsEmbed = new  MessageEmbed()
            .setColor('#6e4aff')
            .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <votre commande>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `${category.toUpperCase()}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }
            return message.channel.send({embeds: [noArgsEmbed]});
        }

        const cmd = client.commands.get(args[0]);
        if (!cmd) return message.reply(`🔴 **La commande** \`${prefix}${args[0]}\` **n\'existe pas!** 🔴`);

        return message.channel.send(`
\`\`\`makefile

[Help: commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ pour les admins du bot uniquement /!\\': ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`] } 

Permission(s) requise(s): ${cmd.permissions.join(', ')}
Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
---

${prefix} = préfixe utilisé pour le bot (Les commandes / marchent aussi !)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
Ne pas inclure ces caractères -> {}, [], <> dans vos commandes !
\`\`\``)


    },
    options: [ {
        name: "commande",
        description: "précisez la commande !",
        type: "STRING",
        required: false,
    },],
    
    async runInteraction (client, Interaction) {
        const cmdName = Interaction.options.getString('commande');

        if(!cmdName) {
            const noArgsEmbed = new  MessageEmbed()
            .setColor('#6e4aff')
            .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <votre commande>\``)

            for (const category of commandFolder) {
                noArgsEmbed.addField(
                    `${category.toUpperCase()}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }
            return Interaction.reply({embeds: [noArgsEmbed], ephemeral: true});
        }

        const cmd = client.commands.get(cmdName);
        if (!cmd) return Interaction.reply({content: `🔴 **La commande n\'existe pas!** 🔴`, ephemeral: true});

        return Interaction.reply({content:`
\`\`\`makefile

[Help: commande -> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ pour les admins du bot uniquement /!\\': ''}

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`] } 

Permission(s) requise(s): ${cmd.permissions.join(', ')}
Utilisation: ${prefix}${cmd.usage}
Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
---

${prefix} = préfixe utilisé pour le bot (Les commandes / marchent aussi !)
{} = sous-commande(s) disponible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnelle(s)
Ne pas inclure ces caractères -> {}, [], <> dans vos commandes !
\`\`\``, ephemeral: true })
    }
};