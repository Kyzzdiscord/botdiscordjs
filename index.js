const { Client } = require('discord.js');
const { Collection } = require('discord.js')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { uri } = require('mongoose')
dotenv.config();
const client = new Client({intents: 3276799});
const Logger = require('./utils/Logger')

client.commands = new Collection();

['CommandUtil', 'EventUtil'].forEach(handler => {require(`./utils/handlers/${handler}`)(client)});

process.on('exit',  code => { Logger.client(`Le processus s'est terminé avec le code ${code}`) });
process.on('uncaughtException', (err) => {
    console.log('Erreur non capturée : ', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('Rejection non traitée : ', reason);
    console.log('Promise : ', promise);
});
process.on('warning', (...args) => Logger.warn(...args));

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.client('Connecté à la base de données'); })
.catch(err=> { Logger.error(err); });
client.login(process.env.token);