const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native')
const fs = require("fs");
const { classToPlain } = require("class-transformer");
const { getlength } = require("../../functions");
const Pokemon = require("./../../Classes/Pokemon");
let Spawn = require('../../models/spawn.js')
let Guild = require('../../models/guild.js')
const Canvas = require('canvas')
 const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')


module.exports = {
  name: "route1",
  description: "Carne Village Route 1",
  category: "Pokemon Commands",
  args: false,
  usage: ["route1"],
  cooldown: 60,
  permissions: [],
    aliases: ["r1"],
  cooldown: 60,
    execute: async (client,message, args, prefix, guild, color, channel) => {
    let names = ["trapinch","spearow","pidgey","kakuna","caterpie","butterfree","pikachu"]
    let name = names[Math.floor(Math.random() * names.length)]

    let abc = ['996025876766543933']

    if(!abc.includes(message.channel.id)) return message.channel.send(` > You can only use this command in Official Server Carne Village Route!
     > Join official server for using this command.
    https://discord.gg/pokerode `);

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
    var shiny = false
    //type = galarian
    gen = Math.floor(Math.random() * 4096);
    if (gen <= 10) shiny = true;
       let lvl = Math.floor(Math.random()*69) + 1
       let pokemon = new Pokemon({ name: x.name.toLowerCase(), id: x.id, shiny: shiny,  url: url }, lvl);

       pokemon = await classToPlain(pokemon)

       let imgname = 'new.png'
       let spawn = await Spawn.findOne({id: message.channel.id})
       if (!spawn) await new Spawn({ id: message.channel.id }).save();
       spawn = await Spawn.findOne({id: message.channel.id})
       spawn.pokemon = []
       spawn.pokemon.push(pokemon)
       spawn.time = 259200000 + Date.now()
       await spawn.save()

        let bg = "https://cdn.discordapp.com/attachments/989813398059487235/996265681723068537/download_72.jpg";
       ;
         
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(pokemon.url)
          ctx.drawImage(pk,300,100,550,550)
           embedx = new Discord.MessageEmbed()
            .setAuthor(`You Went Inside Route 1 And Encountered A Pokemon!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .setColor('#add8e6')
             .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
    })
    return message.channel.send(embedx)
  
}
}