const env = require('./.env');
const {Telegraf} = require('telegraf');

const bot = new Telegraf(env.token)

bot.start(content => {
  const from = content.update.message.from

  console.log(from)

  content.reply(`Seja bem vindo, ${from.first_name}!`)
})

bot.on('text', (content, next) => {
  content.reply('MersonBot')
  next()
})

bot.startPolling()