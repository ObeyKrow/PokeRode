const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
    id: { type: String, required: true },
    prefix: { type: String, default: "p!" },
    spawnchannel: { type: String, default: null },
    spawnchannelx: { type: String, default: null },
    disabledChannels: { type: Array, default: [] },
    spawnbtn: { type: Boolean, default: true },
    levelupchannel: { type: String, default: null },
    levelupbtn: { type: Boolean, default: true },
    blacklist: {type: Boolean, default: false},
    incense: {type: Boolean, default: false},
    incenseamount: {type: Number, default: 0},
    time : {type: Boolean}
});

module.exports = mongoose.model("Guild", GuildSchema);