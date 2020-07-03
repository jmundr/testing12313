const ownerID = '336911762890817537';

const keepalive = require("express-glitch-keepalive");

const https = require("https");

const fs = require("fs");

/*
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tapioca-bot", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const RepObject = require("./models/rep.js")
*/
const active = new Map();
let ops = {
  ownerID: ownerID,
  active: active
  

}


const http = require('http');
const express = require('express');
const app = express();

app.use(keepalive);

app.get("/", (request, response) => {
  console.log(Date.now() + " ping Received");
  response.json("Ok");
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const rbx = require("noblox.js");
const bot = new Discord.Client();
bot.on("guildMemberAdd", function(message) {
    let guild = message.guild;
    let member = message;
    
     https.get("https://groups.roblox.com/v1/groups/5143009", resp => {
        let data = "";
        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          console.log(JSON.parse(data).memberCount);
          member.guild.channels.get("708235968372670474") .setName("Roblox Members - " + JSON.parse(data).memberCount);
        
        });
          
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  const embed = new Discord.RichEmbed()
  .setColor("#1fdec8")
  .setTitle("Welcome")
 .setDescription(`Welcome to Tapioca Parlor, ${member.user}! \n  \n Total Members: ${guild.memberCount}`)
 .setThumbnail(member.user.avatarURL)
  .setTimestamp()

  
  guild.channels.find(`name`, "landing").send({ embed: embed});
  
    let memberCountChannel = guild.channels.get('708235811157704736');
  memberCountChannel.setName("Discord Members - " + guild.memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error))
    


});

async function startApp() {
  await rbx.setCookie(
    "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_F82D23E69FCA71D60D23F813DFDF134678F3593566DAFF2E8AADD27611E5FE65D788CBBE3DCB0E5091ED76FF6728704F177745C6382E08D0DF13D2DC23C2F060701E56B670BC790C57B0A0D3B97EC632E3F46A691DD55148B2C12DF471381BC8181F6E0A48C9ED30EAF6FD577EA90B9D455A7BB1BCD9BB4D072C32BEE8A3BDF56B732F266356BCF11295820B31BC9062CFBC5751647C00C604B28E33E8930097E7D41FD0091561159D05EFE3F5606CD9A6C80B2392E36655556BA72C43A5F722BCC88956574DB944DC52800EC6FF01572540A67593FF702F8F6B31E0055CE42B070DE146A9541F0CB798CB01E3C8A536A5DD5471774E30C953BA643247F062F2EA2C992D7FA2ACE2EBAB617B98B16552EBD527A062628DFC5634E7B30A9AF342EB8BAF0745F60482991FA11C951C4B6E93F54CD0"
  );
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp()
/*
bot.on("messageUpdate", async(oldMessage, newMessage) => {
   if(oldMessage.content === newMessage.content){
  return;
}
   var logchannel = bot.channels.get("620243568606314498");
  
  let logembed = new Discord.RichEmbed()
 .setColor("#29b0d9")
  .setTitle("**Message Edited**")
  .addField("Author", oldMessage.author)
  .addField("Channel", newMessage.channel)   
 .addField("Before", oldMessage.content)
  .addField("After", newMessage.content)
    
  .setTimestamp()
  
  logchannel.send(logembed)
  

})

bot.on("messageDelete", async message => {
  
   var logchannel = bot.channels.get("620243568606314498");
 
  let logembed = new Discord.RichEmbed()
  .setColor("#d92b37")
  .setTitle("**Message Deleted**")
  .addField("Author", message.author)
   .addField("Channel", message.channel)
   .addField("Message", message.content)
  .setTimestamp()
  logchannel.send(logembed)

})

*/

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


const config = require('./config.json');



bot.prefix = config.prefix;

bot.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
  if (err) throw err;

  let jsFiles = files.filter(f => f.split('.').pop() === 'js');

  jsFiles.forEach(f => {
    let props = require(`./cmds/${f}`);
    bot.commands.set(props.help.name, props);
  });
  console.log(`Loaded ${jsFiles.length} commands`);
});

bot.errMsg = (message) => {
  message.channel.send('Error (Random Number): Please enter command properly. There was a **Syntax Error in the command**.');
}
bot.permMsg = (message) => {
  message.channel.send('I don\'t have permission to do this. :(');
}

String.prototype.capitalize = function(allWords) {
  if (allWords) return this.split(/ +/g).map(str => str.charAt(0).toUpperCase() + str.toLowerCase().substring(1)).join(' ');
  else return this.toLowerCase().charAt() + this.toLowerCase(0).substring(1);
}

bot.on('ready', () => {
  console.log(`Bot ${bot.user.username} is on`);
  bot.user.setActivity('Tapioca Parlor', { type: 'PLAYING' });
  bot.user.setStatus('avalable', null)
});


const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;

bot.on('message', (message) => {
  if(message.author.bot) return;
  if(usersMap.has(message.author.id)) {
      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimeStamp - lastMessage.CreatedTimeStamp;
      let msgCount = userData.msgCount;
      if(difference > DIFF ) {
        clearTimeout(timer);
        userData.msgCount = 1;
        userData.lastMessage = message;
        userData.timer = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, userData)
      }
    else { 
      ++msgCount;
      if(parseInt(msgCount) === LIMIT) {
        let muterole = message.guild.roles.find('name', "Muted");
        message.member.addRole(muterole.id);
        message.reply(`<@${message.member.id}> has been muted for 30 seconds for spamming.`);
        
        
        
      let wUser = message.member

      let warnchannel = bot.channels.get("716757736825552916")

      if( !warns[wUser.id]) {
        warns[wUser.id] = {
          User: (`${wUser}`),
          Cases: [],
        };
      }
      warns[wUser.id].Cases.push({
        Reason: "Auto-Mute (Spamming)",
        Timestamp: message.createdAt, 
        Moderator: message.member.user.username,
        Type: ":clock1::mute: Auto-Mute",
        CaseNo: Math.floor(100000 + Math.random() * 900000)
      })


      fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err);
      });

      let warnEmbed = new Discord.RichEmbed()
      .setDescription("[ANTI SPAM]")
      .setAuthor(message.author.username)
      .setColor("#fc6400")
      .addField("Auto-Muted User ", wUser.user.tag)
      .addField("Muted In ", message.channel)
      .addField("Reason ", "Auto-Mute (Spamming)")
      .setFooter(message.createdAt);

      if(!warnchannel) return message.reply("Couldn't find channel 'mod-logs'.");

      warnchannel.send(warnEmbed);


      let warnEmbedDM = new Discord.RichEmbed()
      .setAuthor("You've been Muted")
      .setFooter(message.createdAt)
      .addField("Time:", `30 Seconds`)
      .addField("Reason ", "Auto-Mute (Spamming)")
      .setColor("#fc6400");

      wUser.send(warnEmbedDM);
        
      setTimeout(() => {
          message.channel.send(`<@${message.member.id}> has been unmuted!`);
          message.member.removeRole(muterole.id)
        
          let muteEmbedDM = new Discord.RichEmbed()
          .setAuthor("You've been Un-Muted")
          .addField("Reason ", "[TIME EXPIRED]")
          .setFooter(message.createdAt)
          .setColor("#fc6400");
           
          message.member.send(muteEmbedDM)

        }, 30000)
    } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData);
        }
  }
  }
else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, 5000);
       usersMap.set(message.author.id, {
        msgCount: 1, 
        lastMessage: message,
        timer: fn
      });
    }
  
  if (message.channel.id === '619849279410012170' || message.channel.id == '716757835223924766' || message.channel.id == "715856344405508117") {
  if (message.content.startsWith(bot.prefix)) {
    let args = message.content.substring(bot.prefix.length).trim().split(/ +/g);
    let cmd = bot.commands.get(args[0].toLowerCase());
    try{
     if (cmd) 
     var returnValue = cmd.run(bot, message, args, ops);
      returnValue.then(function(result) {
          if (String(result) == "undefined") {
          }else{
          let failedPreconditions = new Discord.RichEmbed()
          .setAuthor("ERROR: Failed to meet preconditions to run this command")
          .setDescription("\:warning: " +  result)
          .setColor(0xff0000)
          .setFooter(message.createdAt)
          message.channel.send(failedPreconditions)
        }
      });
    

    }
    catch(err){
      if (String(err) === "TypeError: Cannot read property 'then' of undefined"){
        let Embed = new Discord.RichEmbed()
        .setAuthor("Command not Recognised")
        .setDescription("Please use .cmds/.help for a list of commands.")
        .setFooter(err)
    
        message.channel.send(Embed)
      }
      else{
      let Embed = new Discord.RichEmbed()
      .setAuthor("ERROR://")
      .setDescription(err)
      .setFooter(message.createdAt)
    
      message.channel.send(Embed)
      }
    }
    }

  } 
/*
  else {
    let reptoadd = 1
    RepObject.findOne({
      userID: message.author.id, 
      serverID: message.guild.id
    }, (err, rep) => {
      if(err) console.log(err);
      if(!rep) {
        const newRep = new RepObject({
          userID: message.author.id, 
          serverID: message.guild.id, 
          rep: reptoadd
        })
        newRep.save().catch(err => console.log(err));
        } else{
          RepObject.rep = RepObject.rep + reptoadd;
          RepObject.save().catch(err => console.log(err));
      }
    })
  }
*/
});


app.get("/setrank", function (req, res) {
  var User = req.param("userid");
  var Rank = req.param("rank");
  rbx.setRank(5143009, parseInt(User), parseInt(Rank));
  res.json("Ranked!");
});

app.get("/suspend", function (req, res) {
  var User = req.param("userid");
  var PlayerName = req.param("playerName");
  var Staff = req.param("staff");
  rbx.setRank(5143009, parseInt(User), 3);
  bot.channels.get("697802998390194196").send("**" + PlayerName + "** has been suspended by **" + Staff + "**");
  res.json("Suspended!");
});



app.get("/promotecommand", function (req, res) {
  var user_id = req.param("userid");
  var staffname = req.param("staffname");
  var playername = req.param("playername");
  console.log(user_id);
  user_id = parseInt(user_id)
  if (staffname != playername) {
    rbx.promote(5143009, user_id);
    const Msg = new Discord.RichEmbed()
      .setTitle("Chat Promotion")
      .setColor(0x42f489)
      .setDescription(
        playername + " was promoted through the chat command by " + staffname
      )
      .setTimestamp();
    bot.channels.get("697802998390194196").send(Msg);
  }
  res.json("Done!")
});


app.get("/internapplication", function (req, res) {
  var application = req.param("application");
  bot.channels.get("699329554346672288").send(application);
  res.json("Submitted!!")
});
app.get("/demotecommand", function (req, res) {
  var user_id = req.param("userid");
  var staffname = req.param("staffname");
  var playername = req.param("playername");
  console.log(user_id);
  if (staffname != playername) {
    rbx.promote(5143009, user_id);
    const Msg = new Discord.RichEmbed()
      .setTitle("Chat Demotion")
      .setColor(0x42f489)
      .setDescription(
        playername + " was demoted through the chat command by " + staffname
      )
      .setTimestamp();
    bot.channels.get("697802998390194196").send(Msg);
  }
});

bot.login(process.env.TOKEN)