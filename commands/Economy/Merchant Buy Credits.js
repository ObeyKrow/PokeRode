
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
  name: "merchantbuycredit",
  description: "Rent A Pokemon And Fly With It .",
  category: "Pokemon Commands",
  args: false,
  usage: ["merchantbuycredit"],
  cooldown: 50 ,
  permissions: [],
   aliases: ["merchantbuycredits"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

       let user = await User.findOne({id: message.author.id})
  
      if (user.shards < 80) return message.channel.send(`You don't have enough shards to buy 22400 Credits`);
       
      else if (user.stock2 <= 0) return message.channel.send(`Out Of Stock`);
      
      user.shards = user.shards - 80
      user.balance = user.balance + 22400
      user.stock2 = user.stock2 - 1
      await user.save()

    return message.channel.send("Bought 22400 Credits From Veneo")
  
}
}