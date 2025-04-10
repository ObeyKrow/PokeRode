 const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const { capitalize } = require('../../functions.js');
const ms = require("ms");

module.exports = {
  name: "wondertrade",
  description: "Trade Your Pokemon For Another Random Pokemon",
  category: "Pokemon Commands",
  args: false,
  usage: ["wondertrade <pokemonID>"],
  cooldown: 3,
  permissions: [],
  aliases: ["wt"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({ id: message.author.id });
    if (!user || !user.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");
    if (user.pokemons.length == 1) return message.channel.send("You can't release your only pokemon!")
    if (user.pokemons.length == 0) return message.channel.send("You dont have any pokemon to release.")
    if (!args[0]) return message.channel.send(`Couldn't find/release 1 pokémon in this selection!`);
    if (args[0].toLowerCase() === "latest") args[0] = parseInt(user.pokemons.length);
    if (args[0].toLowerCase() === "l") args[0] = parseInt(user.pokemons.length);
    if (args[0].toLowerCase() !== "all" && isNaN(args[0])) return message.channel.send(`Couldn't find/release 1 pokémon in this selection!`);
      if(user.balance <= 3000) return message.channel.send(`You don\'t have enough coins to wondertrade your pokemon `)
    user.balance = user.balance - 3000
        await user.save()
  if (!user.pokemons[parseInt(args[0]) - 1]) return; //message.channel.send("You don't have a Pokémon with this number!");

    var num, name, embed;

    let pokes = []

    num = parseInt(args[0]) - 1;
    name = user.pokemons[num].name;
    if (user.pokemons[num].fav) return message.channel.send("You can't Release your Favorited Pokemons!")

    if (args.length === 1 && parseInt(args[0])) {
      if(parseInt(args[0])-1>user.pokemons.length) return message.channel.send("no")
      let embed1 = new MessageEmbed()
      .setAuthor("Are you sure you want to Wonder Trade the following Pokemon",`${user.pokemons[num].url}`)
        .setDescription(`\`\`\`Level ${user.pokemons[num].level} ${user.pokemons[num].shiny ? " ⭐ " : ""}${capitalize(name)}\`\`\``)
        .setThumbnail(user.pokemons[num].url)
        .setFooter(`ALERT : WonderTrading is not refundable`)
        .setColor(color)

      let msg = await message.channel.send(embed1);
      await msg.react("✅");
      msg.react("❌");

      const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❌'].includes(reaction.emoji.name) && userx.id === message.author.id, { time: 60000 });
      collector.on('collect', async (reaction, userx) => {
        if (reaction.emoji.name === "✅") {
          collector.stop();
          await user.pokemons.splice(num, 1);
          await user.markModified('pokemons');
   
let pokes = ["gible","cosmog","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","qwilfish","seaking","stunfisk","tynamo","relicanth","horsea","seadra","remoraid","octillery","kingdra","seadra","tentacool","tentacruel","staryu","starmie","shellder","cloyster","clampearl","corsola","mantine","seel","dewgong","spheal","walrein","sharpedo","wailmer","wailord","bruxish","arctovish","dracovish","psyduck","dewgong","golduck","corphish","crawdaunt","krabby","kingler","alomomola","basculin","carvanha","chinchou","eelektrik","eelektross","feebas","finneon","goldeen","gorebyss","huntail","lanturn","luvdisc","magikarp","kyogre","manaphy","suicune","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","geodude","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","diglett","diglett","geodude","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","diglett","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon","diglett","regirock","rhyperior","geodude","geodude","golem","golurk","graveler","onix","rihorn","groudon"]


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
    if (shiny  ) {url = `https://assets.poketwo.net/sprites/front-shiny/${t1.id}.png?v=26`}
    if (check === 1) {
      url = `https://assets.poketwo.net/sprites/front/${t1.id}.png?v=26`
    } else if (check === 2) {
      url = `https://assets.poketwo.net/sprites/front/${t1.id}.png?v=26`
    } else if (check === 3) {
      url = `https://assets.poketwo.net/sprites/front/${t1.id}.png?v=26`
    
    }  

          var shiny = false
    //type = galarian
    gen = Math.floor(Math.random() * 450);
    if (gen <= 10) shiny = true;

    let lvl = Math.floor(Math.random() *10)+ 2;

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
      shiny: shiny,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    });
if (shiny) {
            url = `https://assets.poketwo.net/sprites/front-shiny/${t.id}.png?v=26`}
    await user.markModified(`pokemons`)
       await user.save()
          message.reactions.removeAll();
          msg.reactions.removeAll();
           let embed2 = new MessageEmbed()
           .setAuthor("Success",`${url}`)
           .setDescription(`Successfully Wonder Traded. Your **Level ${user.pokemons[num].level} ${capitalize(name)}** for \`\`\`Level ${lvl} ${capitalize(poke)}\`\`\``)
           .setColor(color)
           .setImage(url)

          return message.channel.send(embed2)
              
              })
              } else if (reaction.emoji.name === "❌") {
          collector.stop("aborted");
          message.reactions.removeAll();
          msg.reactions.removeAll();
          return message.channel.send("Cancelled.")
        }
      });

      collector.on('end', collected => {
        return;
      });
    }
    }
  }
