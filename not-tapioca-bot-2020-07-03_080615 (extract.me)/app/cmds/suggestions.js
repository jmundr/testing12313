const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {

if(!args[1]) return "Please enter a valid suggestion."
let text = args.slice(1).join(' ')
  
 const embed = new Discord.RichEmbed()
  .setColor("RANDOM")  
  .setDescription(text)
   .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL)
  
    
    
   

  let reportsChannel = message.guild.channels.find(`name`, "suggestions") 
  if(!reportsChannel) return message.channel.send("Couldn't find suggestions channel.");


 message.channel.send("Your suggestion has been submitted.")

 let msg = await reportsChannel.send(embed);

await msg.react('✅');
await msg.react('⛔');

}
module.exports.help = {
  name: "suggest",
  description: "Poll System."
}

