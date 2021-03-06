import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
                        command: "happy_birthday",
                        aliases: ["hbd", "hhp"],
			description: "You can use it for birthday wish",
			category: "fun",
			usage: `${client.config.prefix}happy_birthday`,
			baseXp: 10,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : ''
        if (!username) {
            const contact = this.client.getContact(user)
            username = contact.notify || contact.vname || contact.name || user.split('@')[0]
        }
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`Profile Picture not Accessible of ${username}`)
            pfp =
                'https://telegra.ph/file/10d10b9761bdca617f1bb.jpg'
        }
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://telegra.ph/file/10d10b9761bdca617f1bb.jpg'
            ),
            MessageType.image,
            undefined,
            undefined,
            `\t\t â¨ *âðð¡ð¡ðª ð¹ðð£ð¥ððððª* â¨ \n\n â¢ âÊá´á´á´Ê ÊÉªÊá´Êá´á´Ê! Éª Êá´á´á´ á´ÊÊ Êá´á´Ê ÊÉªÊá´Êá´á´Ê á´¡ÉªsÊá´s á´É´á´ á´Êá´á´á´s á´á´á´á´ á´Êá´á´.â\n\n â¢ âá´ á´¡ÉªsÊ Òá´Ê Êá´á´ á´É´ Êá´á´Ê ÊÉªÊá´Êá´á´Ê, á´¡Êá´á´á´á´ á´Ê Êá´á´ á´sá´ á´á´Ê Êá´á´ Êá´á´á´Éªá´ á´, á´¡Êá´á´á´á´ á´Ê Êá´á´ sá´á´á´ á´á´Ê Êá´á´ ÒÉªÉ´á´, á´¡Êá´á´á´á´ á´Ê Êá´á´ á´¡ÉªsÊ á´á´Ê Éªá´ Êá´ Òá´ÊÒÉªÊÊá´á´ á´É´ Êá´á´Ê ÊÉªÊá´Êá´á´Ê á´É´á´ á´Êá´¡á´Ês. Êá´á´á´Ê ÊÉªÊá´Êá´á´Ê!â\n\n á´´áµáµáµÊ¸ á´®á¶¦Ê³áµÊ°áµáµÊ¸
*@${user.split('@')[0]}*`
        )
    }
}
