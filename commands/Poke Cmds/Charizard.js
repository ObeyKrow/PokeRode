
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
  name: "usecharizard",
  description: "Rent A Pokemon And Fly With It .",
  category: "Pokemon Commands",
  args: false,
  usage: ["usecharizard"],
  cooldown: 30 ,
  permissions: [],
   aliases: ["usecharizard"],
    execute: async (client,message, args, prefix, guild, color, channel) => {

       let user = await User.findOne({id: message.author.id})
  
      if (user.rentcharizard<= 0) return message.channel.send(`> ❌ You need 1 Rented Charizard you currently have ${user.rentcharizard} . `); 
      
      await guild.save()
            user.balance = user.balance - 0
           await user.save()


      
      let names = ["charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","lugia","ho-oh","yveltal","zapdos","articuno","celesteela","arceus","rayquaza","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern","charizard","togekiss","scyther","honchkrow","gliscor","aerodactyl","crobat","gyarados","salamence","dragonite","noibat","noivern"]
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
    user.summon = user.summon - 7
    await user.save();
           embedx = new Discord.MessageEmbed()
            .setAuthor(`You Bumped Into A Some Sort Of Flying Pokemon!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .setColor('#FFFFFF')
            .setImage(pokemon.url)
    })
    return message.channel.send(embedx)
  
}
}