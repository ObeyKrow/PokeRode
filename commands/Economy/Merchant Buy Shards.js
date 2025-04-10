
const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
let Spawn = require('../../models/spawn.js')
let Guild = require('../../models/guild.js')
const User = require('../../models/user.js')

const Canvas = require('canvas')
 const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')


module.exports = {
  name: "merchantbuyshard",
  description: "Rent A Pokemon And Fly With It .",
  category: "Pokemon Commands",
  args: false,
  usage: ["merchantbuyshard"],
  cooldown: 50 ,
  permissions: [],
   aliases: ["merchantbuyshards"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

       let user = await User.findOne({id: message.author.id})
  
      if (user.balance < 18000) return message.channel.send(`You don't have enough balance to buy 70 shards`);

      if (user.stock1 <= 0) return message.channel.send(`Out Of Stock`);
       
      
      
      user.balance = user.balance - 18000
      user.shards = user.shards + 70
      user.stock1 = user.stock1 - 1
      await user.save()


    return message.channel.send("Bought 70 Shards From Veneo")
  
}
}