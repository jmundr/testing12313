const urban = require("relevant-urban");
const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
  if(!args[0]) { return "You haven't specified a word to look up." }
  
  let res = await urban(args.join(' ')).catch(e => {
    
    { return "Unable to find the specified word." };
  });
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(res.word)
  .setURL(res.urbanURL)
  .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
  
  message.channel.send(embed)
}
module.exports.help = {
  name: "dict"
}