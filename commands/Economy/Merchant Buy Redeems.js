
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
  name: "merchantbuyredeem",
  description: "Rent A Pokemon And Fly With It .",
  category: "Pokemon Commands",
  args: false,
  usage: ["merchantbuyredeem"],
  cooldown: 50 ,
  permissions: [],
   aliases: ["merchantbuyredeems"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

       let user = await User.findOne({id: message.author.id})
  
      if (user.balance < 24000) return message.channel.send(`You don't have enough balance to buy redeems`);

      if (user.stock3 <= 0) return message.channel.send(`Out Of Stock`);
       
      
      
      user.balance = user.balance - 24000
      user.redeems = user.redeems + 1
      user.stock3 = user.stock3 - 1
      await user.save()

    return message.channel.send("Bought a Redeem From Veneo")
  
}
}