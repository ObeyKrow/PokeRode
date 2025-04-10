const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
    name: "gamble",
    description: "Starts a gamble.",
    category: "Economy",
    args: true,
    usage: ["gamble <@user> <amount>"],
    cooldown: 3,
    permissions: [],
    aliases: ["bet"],
    execute: async (client, message, args, prefix, guild, color, channel) => {
        let authorDB = await User.findOne({ id: message.author.id });
        if (!authorDB || !authorDB.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");

        let user = message.mentions.members.first();
        if(!user) return message.channel.send("???")
        if (user.id === message.author.id) return message.channel.send(`1 Iq Brain, Why You Gambling Yourself Stupid???`);
        let userDB = await User.findOne({ id: user.id });
        if (!userDB || !userDB.pokemons[0]) return message.channel.send(user.user.username + " needs to pick a starter Pokémon using the \`" + prefix + "start\` command before gambling!");



        let u1 = false,
            u2 = false;

        if (!args[1] || isNaN(args[1])) return message.channel.send(`No <amount>! Please gamble in the format \`${prefix}gamble <@user> <amount>\``);
        let amount = parseInt(args[1]);
        if (amount > authorDB.balance) return message.channel.send(`You don't have enough balance to Gamble`);
        if (amount > userDB.balance) return message.channel.send(`${user.id} doesn't have enough balance to Gamble.`);
      if (amount < 0) return message.channel.send(`❌ You Cant Gamble Negative Credits `);

        let msg = await message.channel.send(`<@${user.id}> You Got A Gamble Request With ${amount} PokeCredits From ${message.author.username}?`);
        await msg.react("💰");
        await msg.react("❌");

        const collector = msg.createReactionCollector((reaction, user) => ["💰", "❌"].includes(reaction.emoji.name) && user.id === userDB.id, { time: 60000 });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === "💰") {
                collector.stop("ended");
                message.reactions.removeAll();
                msg.reactions.removeAll();
                check();
            }
            if (reaction.emoji.name === "❌") {
                collector.stop("ended");
                message.reactions.removeAll();
                msg.reactions.removeAll();
                return message.channel.send(`${message.author}, <@${user.id}> has rejected your gamble request to play ${amount} Pokecredits`);
            }
        });

        collector.on('end', (r, reason) => {
            if (reason === 'ended') {
                return
            }
        });

        async function check() {
            let ar = false
            let result = Math.floor(Math.random() * 2);
            if(result > 1) ar = true;
            let msg = await message.channel.send(`https://tenor.com/view/casino-gamble-roulette-gambling-gif-5280264`);
            setTimeout(async () => {
                if (result) {
                    /**
                     * Author Won!
                     */
                    authorDB.balance = authorDB.balance + amount;
                    authorDB.gwon = authorDB.gwon + 1;
                    userDB.balance = userDB.balance - amount;
                    userDB.glost = userDB.glost + 1;
                    userDB.gambles = userDB.gambles + 1;
                    authorDB.gambles = authorDB.gambles + 1;
                    authorDB.cwongamble = authorDB.cwongamble + amount;
                    userDB.clostgamble = userDB.clostgamble + amount;
                    await authorDB.save();
                    await userDB.save();
                    return message.channel.send(`<@${message.author.id}> won ${amount} Credits!`);
                } else {
                    /**
                     * User Won!
                     */
                    userDB.balance = userDB.balance + amount;
                    userDB.gwon = userDB.gwon + 1;
                    authorDB.balance = authorDB.balance - amount;
                    authorDB.glost = authorDB.glost + 1;
                    authorDB.gambles = authorDB.gambles + 1;
                    userDB.gambles = userDB.gambles + 1;
                    userDB.cwongamble = userDB.cwongamble + amount;
                    authorDB.clostgamble = authorDB.clostgamble + amount;
                    await userDB.save();
                    await authorDB.save();
                    return message.channel.send(`<@${user.id}> won ${amount} Credits!`);
                }
            }, 3000)
        }
    }
}