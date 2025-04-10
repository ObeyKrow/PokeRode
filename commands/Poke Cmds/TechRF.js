
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
  name: "tteleportresearchfaciliity",
  description: "teleportresearchfaciliity .",
  category: "Pokemon Commands",
  args: false,
  usage: ["teleportresearchfaciliity"],
  cooldown: 15 ,
  permissions: [],
   aliases: ["teleport researchfacility"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

       let user = await User.findOne({id: message.author.id})

     if (user.techwatch<= 0) return message.channel.send(`> ❌ You Dont Have A Tech Watch `); 


      if (user.techbattery<= 0) return message.channel.send(`> ❌ You Need To Charge Your Watch By Buying Tech Battery. `); 
      
      await guild.save()
            user.techbattery = user.techbattery - 1
           await user.save()


      
      let names = []
    let name = names[Math.floor(Math.random() * names.length)]


    let ab = {
     url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      json: true
    }    
    let embedx;
    await get(ab).then(async x => {
       let check = x.id.toString().length
        if (check === 1) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${x.id}.png`
          } else if (check === 2) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${x.id}.png`
          } else if (check === 3) {
            url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${x.id}.png`
          }

       let lvl = Math.floor(Math.random()*69) + 1
       let pokemon = new Pokemon({ name: x.name.toLowerCase(), id: x.id, shiny: false,  url: url }, lvl);

       pokemon = await classToPlain(pokemon)

       let imgname = 'new.png'
       let spawn = await Spawn.findOne({id: message.channel.id})
       if (!spawn) await new Spawn({ id: message.channel.id }).save();
       spawn = await Spawn.findOne({id: message.channel.id})
       spawn.pokemon = []
       spawn.pokemon.push(pokemon)
       spawn.time = 259200000 + Date.now()
       await spawn.save()
    user.techcrystals = user.techcrystals + 3
    await user.save();
           embedx = new Discord.MessageEmbed()
            .setAuthor(`Wild Pokemon Appeared!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .setColor('#964B00')
            .setImage(pokemon.url)
    })
    return message.channel.send(embedx)
  
}
}