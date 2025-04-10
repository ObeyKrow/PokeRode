const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize } = require("../../functions.js");
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
  name: "gambleprofile",
  description: "Displays stuff available in shop",
  category: "Pokemon Commands",
  args: false,
  usage: ["gambleprofile"],
  cooldown: 3,
  permissions: [],
  aliases: ["gpf"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({ id: message.author.id });

    if (!user || !user.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");


    if (!user.createdAt || !isNaN(user.createdAt)) user.createdAt = new Date();
    await user.save();
    var time = user.createdAt.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    time = new Date(time).toISOString()
    time = time.replace("-", "T")
    time = time.replace("-", "T")
    time = time.split("T")
    time = `${time[2]}/${time[1]}/${time[0]}`;

    let e = message,
      n = args.join(" "),
      a = user,
      s = a.pokemons.map((r, i) => { r.num = i + 1; return r }),
      zbc = {};
    n.split(/--|—/gmi).map(x => {
      if (x && (x = x.split(" "))) zbc[x.splice(0, 1)] = x.join(" ").replace(/\s$/, '') || true;
    })
    let psinfo;
    if (!user.pokemons[selected]) {
      psinfo = 'Not Selected'
    }
    else {
      var selected = user.selected;
      var name = user.pokemons[selected].name;
      var Name = name;
      psinfo = `Lvl ${user.pokemons[user.selected].level} ${user.pokemons[selected].shiny ? "⭐ " : ""}${capitalize(user.pokemons[user.selected].name)}`
    }


    let embed = new MessageEmbed()
  .setAuthor(`${message.author.username} Gamble Profile`)
.addField("Gambles Won",`${user.gwon}`)
.addField("Gambles Lost",`${user.glost}`)
.addField("Winrate",`N/A`)
.addField("Gambles",`${user.gambles}`)
.addField("Gamble Titles",`None / Not Out`)
.addField("Gamble Badges",`None / Not Out`)
.addField("Coins Won",`${user.cwongamble}`)
.addField("Coins Lost",`${user.clostgamble}`)



      .setColor("#36393e")
      .setAuthor(`${message.author.username}'s Profile`)
      
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter("Started " + client.user.username + " On | " + time)
    message.channel.send(embed)



  }
}

//
