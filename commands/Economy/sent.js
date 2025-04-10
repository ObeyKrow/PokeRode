const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
  name: "sent",
  description: "Send Trainers Pokemon / Credits Without Trading.",
  category: "Pokemon Commands",
  args: false,
  usage: ["sent <item> <@user/userID> <amount/id>"],
  cooldown: 3,
  permissions: [],
  aliases: ["st"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    let embed = new MessageEmbed()
      .setColor(color)
      .addField("Sent",
        `\`\`\`${prefix}sent(st) credits(cr) <@user/userId/userName> [amount]\n`
                + `${prefix}sent(st) pokemon(p) <@user/userId/userName> [pokemon_Id pokemon2_Id pokemon3_id ...]\n\`\`\``
      )
    if (!args[0]) return message.channel.send(embed)
    let user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");

    // Fetching User From Message!
    let user1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user1) return message.channel.send(`Provide an user to sent to!`);

    // Fetching Mentioned User's DB!
    let user2 = await User.findOne({ id: user1.id });
    if (!user2) return message.channel.send(user1 + " needs to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!")

    if (user1.id == message.author.id) return message.channel.send(`You can't sent to yourself!`)
    let authorDB = await User.findOne({ id: message.author.id });
    if (!authorDB) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");

    let userDB = await User.findOne({ id: user1.id });
    if (!userDB || !userDB.pokemons[0]) return message.channel.send(user.toString() + " need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");

    // Fetching Amount From Message!
    if (!args[2]) return message.channel.send(`Error: It should be in the form of \`${prefix}${module.exports.usage[0]}\``)
    if (!Number(args[2])) return message.channel.send("Failed to convert `Parametre` to `Int`.")
    let amount = args[2];
    amount = parseInt(amount);
    if (amount > 1) {
      g = "Credits"
      r = "Redeems"
    } else {
      g = "Credit"
      r = "Redeem"
    }
    let ggift = new MessageEmbed()
      .setAuthor(`${g} sent`)
      .setDescription(`${message.author} , Do you confirm to give <@${user1.id}> **${amount}** ${g}?`)
      .setColor(color);
    let rgift = new MessageEmbed()
      .setAuthor(`${r} sent`)
      .setDescription(`${message.author} , Do you confirm to give <@${user1.id}> **${amount}** ${r}?`)
      .setColor(color);
    if (["cr", "bal", "credit", "credits"].includes(args[0].toLowerCase())) {
      if (user.balance == 0) return message.channel.send(`You don't have any ${g} to trade!`);
      if (user1.id == message.author.id) return message.channel.send(`Strange! You wanna trade your own Items to Yourself??`);
      if (amount > user.balance) return message.channel.send(`You don't have ${amount} ${g} in your balance to trade!`)
      let msg = await message.channel.send(ggift)
      await msg.react("✅")
      msg.react("❎")
      const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❎'].includes(reaction.emoji.name) && userx.id === message.author.id, {
        time: 60000
      });
      collector.on('collect', async (reaction, userx) => {
        if (reaction.emoji.name === "✅") {
          collector.stop();
          user2.balance = user2.balance + amount;
          user.balance = user.balance - amount;
          await user2.save();
          await user.save();
          message.reactions.removeAll();
          msg.reactions.removeAll();
          return message.channel.send(`Traded!🎉`)
        } else if (reaction.emoji.name === "❎") {
          collector.stop("aborted");
          message.reactions.removeAll();
          msg.reactions.removeAll();
          return message.channel.send("Cancelled!")
        }
      });
      collector.on('end', collected => {
        return;
      })
    }
    if (["r", "redeem", "redeems"].includes(args[1].toLowerCase())) {
      if (user.redeems == 0) return message.channel.send(`You don't have any ${r} to quicktrade!`);
      if (user1.id == message.author.id) return message.channel.send(`Strange! You wanna trade your own Items to Yourself??`);
      if (amount > user.redeems) return message.channel.send(`You don't have ${amount} ${r} in your inventory to trade!`);
      let msg = await message.channel.send(rgift);
      await msg.react("✅")
      msg.react("❎")
      const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❎'].includes(reaction.emoji.name) && userx.id === message.author.id, {
        time: 60000
      });
      collector.on('collect', async (reaction, userx) => {
        if (reaction.emoji.name === "✅") {
          collector.stop();
          user2.redeems = user2.redeems + amount;
          user.redeems = user.redeems - amount;
          await user2.save();
          await user.save();
          message.reactions.removeAll();
          msg.reactions.removeAll();
          return message.channel.send(`Traded!`)
        } else if (reaction.emoji.name === "❎") {
          collector.stop("aborted");
          message.reactions.removeAll();
          msg.reactions.removeAll();
          return message.channel.send("Cancelled!")
        }
      });
      collector.on('end', collected => {
        return;
      })
    }
    if (["p", "pokemon", " pokemons"].includes(args[0].toLowerCase())) {
      if (user.pokemons.length == 0) return message.channel.send("You dont have any pokemon to give!");
      if (isNaN(args[2])) return message.channel.send(`Unexpected \`<p_id>\` provided. It should be in the form of \`${prefix}${module.exports.usage[0]}\``);
      if (parseInt(args[2]) - 1 > user.pokemons.length) return message.channel.send("You don't have a Pokémon with this number!")
      var num, name

      let pokes = []

      num = parseInt(args[2]) - 1;
      name = authorDB.pokemons[num].name;
      for (var x = 0; x < args.length; x++) {
        if (Number(args[x])) {
          num = parseInt(args[x]) - 1;
          name = authorDB.pokemons[num].name;
          if (!authorDB.pokemons[num].fav) pokes.push(authorDB.pokemons[num])
        }
      }


      if (pokes.length == 1) {
        p = "pokémon"
      } else {
        p = "pokémons"
      }
      let embed5 = new MessageEmbed()
        .setTitle(`${p} Trade`)
        .addField(`${message.author}, Do you confirm to give the following ${p} to ${user1.user.username}?`, pokes.map(r => `\`Level ${r.level} ${r.name} ( ${r.totalIV}% IV)\``).join("\n"))
        .setColor(color)



      let msg = await message.channel.send(embed5);
      await msg.react("✅");
      msg.react("❌");

      const collector = msg.createReactionCollector((reaction, userx) => ['✅', '❌'].includes(reaction.emoji.name) && userx.id === message.author.id, { time: 60000 });



      collector.on('collect', async (reaction, userx) => {
        if (reaction.emoji.name === "✅") {
          collector.stop();

          for (var z = 0; z < pokes.length; z++) {
            pokes[z]
            if (authorDB.pokemons.find(r => r === pokes[z])) {
              let index = authorDB.pokemons.indexOf(pokes[z]);
              if (index > -1) {
                await authorDB.pokemons.splice(index, 1);
                await userDB.pokemons.push(pokes[z]);
                await authorDB.markModified("pokemons");
                await userDB.markModified("pokemons");
                message.reactions.removeAll();
                msg.reactions.removeAll();
              }
            }
          }
          await authorDB.save();
          await userDB.save();
          return message.channel.send(`Sented The Item!🎉`)

        } else if (reaction.emoji.name === "❌") {
          collector.stop("aborted");
          return message.channel.send("Cancelled.")
        }
      });

      collector.on('end', collected => {
        return;
      });
    }
  }
}












