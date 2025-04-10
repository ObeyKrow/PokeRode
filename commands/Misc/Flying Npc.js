const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const config = require('../../config.js')
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "flying",
    description: "flying npc",
    category: "misc",
    args: false,
    usage: ["flying"],
    cooldown: 3,
    permissions: [],
    aliases: ["fly"],
    execute: async (client, message, args, prefix, guild, color, channel) => {

      let embed = new MessageEmbed()
      .setDescription(`**Flying Trainer Stacy**

**Trained Flying Ceritified(With Flying License) Pokemons For Rent**

**Altaria**

Altaria Is The Best For Starters.

**Speed : 50**

**Cost : 5k**

(${prefix}ff1buy altaria)

Usage : ${prefix}usealtaria

**Pidgeot**

Pidgeot Is A Great Bird , Protects His/Her Master And Finds Decent Pokemon , Since Its Speed Is Fast When You Battle A Wild Flying Pokemon You Can Get Away Easier.

**Speed : 101**

**Cost : 10k**

(${prefix}ff2buy pidgeot)

Usage : ${prefix}usepidgeot

**Charizard**

Charizard Might Be Less Slower Than Pidgeot But Smells Good Pokemon From Far Away Can get You Better Encounters

**Speed : 100**

**Cost : 15k**

(${prefix}ff3buy charizard)

Usage : ${prefix}usecharizard

**Rent Last Forever**`)
        .setFooter(`Random Message : You Cannot Use Your Own Pokemon To Fly Because You Dont Have License This Is Why Your Renting One That HaS
        
        Tip: Faster the pokemon faster the cooldown`)
      .setColor('#FFFFFF')
  .setImage("https://cdn.discordapp.com/attachments/992042766005698580/1000348182598926367/SkyTrainer-Female.webp")
      message.channel.send(embed)

    }
}