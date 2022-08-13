const env = require('./.env');
const {Telegraf} = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const bot = new Telegraf(env.token);

let list = [];

const buttons = () => Extra.markup(
  Markup.inlineKeyboard(
    list.map(item => Markup.callbackButton(item, `delete ${item}`)),
    {columns: 3}
  )
);

bot.start(async content => {
  const name = content.update.message.from.first_name

  await content.reply(`Seja bem vindo(a), ${name}!`)
  await content.reply("Digite o nome do produto que deseja adicionar no carrinho")
});     

bot.on('text', content => {
  list.push(content.update.message.text)
  content.reply(`${content.update.message.text} foi adicionado.`, buttons())
})

bot.action(/delete (.+)/, content => {
  list = list.filter(item => item !== content.match[1])

  content.reply(`${content.match[1]} Deletado`, buttons())
})

bot.startPolling()