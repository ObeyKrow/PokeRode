const Discord = require('discord.js')
const { get } = require('request-promise-native')
const { classToPlain } = require('class-transformer')
const User = require('../../models/user.js')

const { capitalize, getlength } = require("../../functions.js");

module.exports = {
  name: "open",
  description: "open a crate",
  category: "Testing",
  args: true,
  usage: ["open <crate name>"],
  cooldown: 3,
  permissions: [],
  aliases: ["o"], 
 
  execute: async (client, message, args, prefix, guild, color, channel) => {

     let user = await User.findOne({id: message.author.id})

   if(args[0].toLowerCase() === "techbox") {

       if(user.techbox === 0) return message.channel.send(`You dont have a techbox to open dummy!`)

       let pokes = ["magnemite","magnezone","helioptile","heliolisk","dedenne","pikachu","tynamo","raichu","jolteon","electrike","raikou","luxio","shinx","luxray","tynamo","boltund","yamper"]


      let poke = pokes[Math.floor(Math.random() * pokes.length)]
      
      let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; 
    let type; 
    
      await get(options).then(async t1 => {
      
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url;
    if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t1.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t1.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t1.id}.png`
    }

      

   
  
    let lvl = Math.floor(Math.random() *4)+ 1;

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv =(((hp + atk + def + spatk + spdef + speed))/186)*100
let iv = totaliv.toFixed(2);
      
       user.pokemons.push({
      level: lvl,
      xp: 0,
      name: poke,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: false,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    })
    await user.markModified(`pokemons`)
    user.techbox = user.techbox - 1
    user.techcoins = user.techcoins + 100
    await user.save();

    

    let embed = new Discord.MessageEmbed()
    .setColor('#add8e6')
    .setTitle('Opening Tech Box...')
    .setDescription(` **Rewards Recived**\n Level ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
     .setThumbnail(url)
     .setFooter(`You Also Got 100 Tech Coins `)
  return message.channel.send(embed)
  })
 } else if(args[0].toLowerCase() === "techcapsule") {

       if(user.techcap === 0) return message.channel.send(`You dont have a tech capsule imagine even using this command!`)

       let pokes = ["Pheromosa","regice","latias","genesect","celebi","regirock","registeel","raikou","zapdos","moltres","articuno","groudon","kyogre","celesteela","buzzwole","mew","mewtwo","suicine","entei"]


      let poke = pokes[Math.floor(Math.random() * pokes.length)]
      
      let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; 
    let type; 
    
      await get(options).then(async t1 => {
      
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url;
    if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t1.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t1.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t1.id}.png`
    }

      

   
  
    let lvl = Math.floor(Math.random() *4)+ 1;

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv =(((hp + atk + def + spatk + spdef + speed))/186)*100
let iv = totaliv.toFixed(2);
      
       user.pokemons.push({
      level: lvl,
      xp: 0,
      name: poke,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: false,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    })
    await user.markModified(`pokemons`)
    user.techcap = user.techcap - 1
    user.techbattery = user.techbattery + 3
    await user.save();

    

    let embed = new Discord.MessageEmbed()
    .setColor('#add8e6')
    .setTitle('Opening Tech Capsule Crate...')
    .setDescription(` **Rewards Recived**\n Level ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
     .setThumbnail(url)
     .setFooter(`You also recived 3 tech battery as well `)
  return message.channel.send(embed)
  })
  
      } else  if(args[0].toLowerCase() === "shinytechchest") {

       if(user.shtech === 0) return message.channel.send(`You dont have a shiny tech chest and i bet you wont have one soon`)

       let pokes = ["raikou","registeel","xurkitress","zeraora","regieleki","thundurus","zekrom","cobalion","dialga","heatran","regigigias"]


      let poke = pokes[Math.floor(Math.random() * pokes.length)]
      
      let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; 
    let type; 
    
      await get(options).then(async t1 => {
      
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url =
    `https://assets.poketwo.net/shiny/${t1.id}.png?v=26`
   
    let imgname = 'new.png'
    let lvl = Math.floor(Math.random() *4)+ 1;

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv =(((hp + atk + def + spatk + spdef + speed))/186)*100
let iv = totaliv.toFixed(2);
      
       user.pokemons.push({
      level: lvl,
      xp: 0,
      name: poke,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: true,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    })
    await user.markModified(`pokemons`)
    user.shtech = user.shtech - 1
    user.techbattery = user.techbattery + 10
    await user.save();

    

    let embed = new Discord.MessageEmbed()
    .setColor('#add8e6')
    .setTitle('Opening Shiny Tech Chest Crate...')
    .setDescription(` **Rewards Recived**\n   Level ${lvl} ✨ Shiny  ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
     .setThumbnail(url)
     .setFooter(`You also recived 10 Tech Battery `)
  return message.channel.send(embed)
    })
} else {
  message.channel.send(`wrong arguments`)
}//lol u here
}//yes lol but u gone
  }
