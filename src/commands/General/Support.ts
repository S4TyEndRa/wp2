import { MessageType, Mimetype } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'support',
            aliases: ['support'],
            description: 'Gets the support group links In DM',
            category: 'general',
            usage: `${client.config.prefix}Support`,
            dm: true,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        (await this.client.sendMessage(
        M.sender.jid,
        `*Texαs Support Group* ✨\n\n *https://chat.whatsapp.com/F3ox61UsSkq6pBbVWuUCL4* \n\n*You Can Also Contact on Telegram Group!* \n*https://t.me/AnimeListChat*`,
           MessageType.text
        ))
        const n = [
            'https://telegra.ph/file/7b2e3b0e08229c111311f.mp4'
        ]
        let beckylynch = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url:beckylynch }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `Sent you the support Link in personal message \n` }
        )

        }
}
