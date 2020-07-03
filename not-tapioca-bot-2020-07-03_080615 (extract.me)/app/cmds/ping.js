module.exports.run = async (bot, message, args) => {
message.channel.send('Ping = `' + Math.floor(Math.round(bot.ping)) + '`ms')


}
  module.exports.help = {
    name: "ping"
  }