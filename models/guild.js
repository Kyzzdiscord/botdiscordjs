const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '+'},
    logChannel: { 'type': String, 'default': '1213844637987643402' }

});
module.exports = mongoose.model('Guild', guildSchema);