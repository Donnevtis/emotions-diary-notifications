import { Telegram } from 'telegraf'

const bot = new Telegram(String(process.env.BOT_TOKEN))

export default bot
