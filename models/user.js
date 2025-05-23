const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    balance: { type: Number, default: 0 },
    xp: { type: Number, default: 100 },
    level: { type: Number, default: 1 },
    selected: { type: Number, default: 0 },
    pokemons: { type: Array, default: [] },
    redeems: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    shards: { type: Number, default: 0 },
    normalfishingpass: { type: Number, default: 0 },
    goodfishingpass: { type: Number, default: 0 },
    superfishingpass: { type: Number, default: 0 },
    rentfishingpass: { type: Number, default: 0 },
    bulldoze: { type: Number, default: 0 },
    rentaltaria: { type: Number, default: 0 },
    rentpidgeot: { type: Number, default: 0 },
    rentcharizard: { type: Number, default: 0 },
    techcoins: { type: Number, default: 0 },
    techwatch: { type: Number, default: 0 },
    techbattery: { type: Number, default: 0 },
    techbox: { type: Number, default: 0 },
    techcap: { type: Number, default: 0 },
    shtech: { type: Number, default: 0 },
    techcrystals: { type: Number, default: 0 },
    axe: { type: Number, default: 0 },
    pickaxe: { type: Number, default: 0 },
    wood: { type: Number, default: 0 },
    crystals: { type: Number, default: 0 },
    usd: { type: Number, default: 0 },
    woodaxe: { type: Number, default: 0 },
    bronzeaxe: { type: Number, default: 0 },
    sliveraxe: { type: Number, default: 0 },
    goldaxe: { type: Number, default: 0 },
    jadeaxe: { type: Number, default: 0 },
    chamaxe: { type: Number, default: 0 },
    gwon: { type: Number, default: 0 },
    glost: { type: Number, default: 0 },
    gambles: { type: Number, default: 0 },
    cwongamble: { type: Number, default: 0 },
    clostgamble: { type: Number, default: 0 },
    stock1: { type: Number, default: 10 },
    stock2: { type: Number, default: 5 },
    stock3: { type: Number, default: 7 },
    badges: { type: Array, default: [] },
    released: { type: Number, default: 0 },
    orderAlphabet: { type: Boolean, default: false },
    orderIV: { type: Boolean, default: false },
    orderLevel: { type: Boolean, default: false },
    lbhide: { type: Boolean, default: false },
    shinyCaught: { type: Number, default: 0 },
    caught: { type: Array, default: [] },
    blacklist: { type: Boolean, default: false },
    createdAt: { type: String, default: Date.now() },
    lbcaught: { type: Number, default: 0 },
    shcount: { type: Number, default: 0 },
    shname: { type: String, default: null },
    bronzecrate: { type: Number, default: 0 },
    silvercrate: { type: Number, default: 0 },
    goldencrate: { type: Number, default: 0 },
    diamondcrate: { type: Number, default: 0 },
    deluxecrate: { type: Number, default: 0 },
    trade : { type: Boolean, default: false },
    egg: {type:Number, default: 0},
  questcaught: {type:Number, default: 0},
  questclaim: {type:Number, default: 0},
  questclaim2: {type:Number, default: 0},
   questclaim3: {type:Number, default: 0},
  questclaim4: {type:Number, default: 0},
  openedegg: {type:Number, default: 0},

});

module.exports = mongoose.model("User", UserSchema);