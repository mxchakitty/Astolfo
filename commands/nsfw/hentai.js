const Errors = require('../../util/Errors.js');
const Discord = require('discord.js');
const Command = require('../../util/Command');

module.exports = new Command({
  name: 'hentai',
  description: 'a',
  usage: 'a!eval <code> [--return <any>]',
  args: [],
  run: async (message, args, flags) => {
    try {
      if (args[1]) null; // Errors.throw('HentaiUsage', message.channel);
      if (!message.channel.nsfw) return Errors.throw('NSFWOnly', message.channel);
      const { image } = (await (await require('node-fetch')('http://api.nekos.fun:8080/api/hentai')).json());
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle('Hentai!')
          .setColor(16233177)
          .setURL(image)
          .setImage(image)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })),
      );
    } catch (error) {
      console.log(error);
      return Errors.throw('Generic', message.channel);
    }
  },
});
