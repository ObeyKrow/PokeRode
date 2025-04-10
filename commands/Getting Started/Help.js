const Discord = require("discord.js");
const pagination = require('discord.js-pagination');
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const { capitalize } = require('../../functions.js');
const ms = require("ms");
const mega = require("../../db/mega.js");
let levelUp = require("../../db/levelup.js");

module.exports = {
    name: "help",
    description: "Help Command",
    category: "Getting Started",
    args: false,
    usage: ["help"],
    cooldown: 3,
    permissions: [],
    aliases: [""],
    execute: async (client, message, args, prefix, guild, color, channel) => {        
        let user = await User.findOne({ id: message.author.id });
        if (!user || !user.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");

        let embed = new MessageEmbed()
            .setColor(color)
            .setAuthor(`Pokerode Help Panel`)
            .setDescription(`Pokerode Help Panel Will Help You Start Your Amazing Journey Into Pokerode.
To Navigate Thru Pages Please Use ${prefix}help pages : 
\`${prefix}help pages\` \`\n\n Need Any Help Well Join ${client.user.username}'s [Official Server](https://discord.gg/ZN87EN7ESd) And We Will Help You Best We Can.

There Are A Total 7 Pages Click ▶ to go to the next page click ◀ to go to the previous page


🥳Latest Updates ( Join Official Server For Leaks And More Info)
\`-\` Tech Event Added (Added Only 30% So Far)

\`-\`New Merchant Rework ( Stocks Added )
`)
            .setThumbnail(client.user.displayAvatarURL())

        let embed1 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 1 | Getting Started!")
            .setDescription(`Hello there ! \`${prefix}start\` Do These Commands Below And Go To Next Page By Doing ▶ To Know More \n${client.user.username}
> \`${prefix}start\` : To Check What Pokemons You Can Pick
> \`${prefix}pick\` : Pick A Starter Pokemon ( do p!start to check what pokemons)
> There Are Other Usages To Check Them ${prefix}help [Command] To Check Alliases(Getting Reworked So Please Kindly Ask Admins / Staffs)`)
           
            .setColor(color)

        let embed2 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 2 | Commands")
            .setDescription(`If you need more information join official server
**Check The Commands Below**
\`${prefix}info pokemon\` : Give Info About Your Selected Pokemon (if its not select then p!info (id))
\`${prefix}select\` : Select a pokemon
\`${prefix}catch\` : Catch a spawned pokemon
\`${prefix}profile\` : Your Profile
\`${prefix}nickname\` : Nickname your selected pokemon
\`${prefix}duel <@user>\` : Battle a person (Disabled Due To Updating)
\`${prefix}gamble <@user> <amount>\` : Gamble Pokemon Balance to other players(Currently Disabled Due To Rework)`)

            .setColor(color)

        let embed3 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 3 | Pokémon Commands II")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
\`${prefix}moveinfo\` <move> : Shows moveinfo
\`${prefix}vote\` : Vote For The Bot 12 hours (Reworking)
\`${prefix}leaderboard <type>\` : Gets the leaderboard
\`${prefix}dig/fish/fly/shake/routes\`(routes are only in official server) : Another Way Of Encountering Pokemon Or For Quests
\`${prefix}wondertrade\`  : Trade A Pokemon For A Random Pokemon
\`${prefix}merchant\` : Merchant Gives You Cheapter Items Or More Expensive Items
\`${prefix}daycare\`  : Daycare Center ( Still Processing)`)
            .setColor(color)

        let embed4 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 4| Shop, Market, Auction & Trading")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
\`${prefix}market\` : Pokemon Market
\`${prefix}trade <user>\` : Trade With Someone ( NOTE : TRADE MIGHT BE BUGGED SOMETIMES BUT WE RE REWORKING IT)
\`${prefix}sent <@user> <item> <amount>\` : sent something with someone without trading
\`${prefix}shop <page>\` : Shop
\`${prefix}shopbuy <page no.> <item>\` : Buy something from shop
\`${prefix}bal\` : balance`)

            .setColor(color)

        let embed5 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 5| Server Settings")
            .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
\`${prefix}redirect #channel\` : Redirect a Channel To Spawn
\`${prefix}redirect reset\` : Reset redirect channel`)
            .setColor(color)

        let embed6 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 6| Miscellaneous")
          .setDescription(`If you need more information about a specific command, type \`${prefix}help <command>\`.
\`${prefix}event\` : Events
\`${prefix}invite\` : Invite The Bot
\`${prefix}stats\` : Display the bot stats
\`${prefix}ping\` : Shows the bot ping
\`${prefix}prefix\` : Shows Bot Prefix
\`${prefix}report\` : Report An User/Server`
)
            .setColor(color)

        let embed7 = new MessageEmbed()
            .setAuthor(client.user.username + " Page 7|Filters")
            .setDescription(`These are filters that can be used to order and find out your pokemons easily. \nNote: Only most used filters are specified here, if you wanna know all filters, Join Official server by doing \`discord.gg/pokerode\`, we will help you out.
Filters`,
                `\`--shiny\` | Search for shiny Pokémon\n` +
                `\`--name <Pokémon#name>\` | Search for a certain Pokémon\n` +
                `\`--nick <Nickname>\` | Displays a Pokémon with a certain nickname\n` +
                `\`--level >/< <Level>\` | Search for Pokémon with a certain level\n` +
                `\`--type <Type>\` | Search for Pokémon with a certain type\n` +
                //`\`--price <Price>\` | Search for Pokémon with a certain price\n` +
                `\`--mega\` | Search for mega Pokémon\n` +
                `\`--iv >/< <IV>\` | Search Pokémon with sum of their IVs\n` +
                `\`--legendary\` | Search for legendary Pokémon\n` +
                `\`--mythical\` | Search for mythical Pokémon\n` +
                `\`--ub\` | Search for Ultra Beast Pokémon\n` +
                `\`--alolan\` | Search for Alolan Pokémon\n` +
                `\`--starter\` | Search for starter Pokémon\n` +
                `\`--galarian\` | Search for galarian Pokémon\n` +
                `\`--alolan\` | Search for alolan Pokémon\n\n` +
                `Example: ${prefix}pk --spdef > 10\n\n` +
                `)`)
            .setColor(color)

        

        
        



        
            

        if (!args[0]) return message.channel.send(embed)
        if (args[0] === "pages") {
            const pages = [
                embed1,
                embed2,
                embed3,
                embed4,
                embed5,
                embed6,
                embed7
            ]
            const emojilist = ["◀", "▶"];
            const timeout = '120000';
            pagination(message, pages, emojilist, timeout)
        }
       
      
    
     
    }
}




