module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand() ||  interaction.isContextMenu()) {
            const cmd =  client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande ne fait pas partie des commandes de ce bot.');

            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`)pour effectuer cette commande. `, ephemeral: true});

            cmd.runInteraction(client, interaction);
        }
    },
};