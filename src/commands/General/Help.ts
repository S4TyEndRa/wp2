import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "help",
			description:
				"Displays the help menu or shows the info of the command provided",
			category: "general",
			usage: `${client.config.prefix}help (command_name)`,
			aliases: ["h"],
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		parsedArgs: IParsedArgs
	): Promise<void> => {
		const user = M.sender.jid;
		const chitoge =
			"https://telegra.ph/file/7c076009065e15ae0f432.jpg";
		if (!parsedArgs.joined) {
			const commands = this.handler.commands.keys();
			const categories: { [key: string]: ICommand[] } = {};
			for (const command of commands) {
				const info = this.handler.commands.get(command);
				if (!command) continue;
				if (!info?.config?.category || info.config.category === "dev") continue;
                                if (
					!info?.config?.category ||
					(info.config.category === "nsfw" &&
						!(await this.client.getGroupData(M.from)).nsfw)
				)
					continue;
				if (Object.keys(categories).includes(info.config.category))
					categories[info.config.category].push(info);
				else {
					categories[info.config.category] = [];
					categories[info.config.category].push(info);
				}
			}
			let text = `*${M.sender.username}*, š'š¦ ššš±šš¬!\n\nšš² šš«ššš¢š± " *${this.client.config.prefix}* "\n\nšš«šØš®š© ššš¦ššš«: *@${user.split("@")[0]}*\nššØš®š« šš±š©: *${(await this.client.getUser(user)).Xp || 0}*\n\nšš”šš¬š šš«š š­š”š ššØš¦š¦šš§šš¬ š²šØš® ššš§ š®š¬š~ ć\n\n`;
			const keys = Object.keys(categories);
			for (const key of keys)
				text += `*ć ${this.client.util.capitalize(
					key
	                         )} ć* \nā \`\`\`${categories[key]
					.map((command) => command.config?.command)
					.join(', ')}\`\`\`\n\n`;
			return void this.client.sendMessage(
				M.from,
				{ url: chitoge },
				MessageType.image,
				{

					caption: `${text} š Use ${this.client.config.prefix}help <command_name> to view the full info.\n\nš§ Eg: ${this.client.config.prefix}help waifu`,
					contextInfo: { mentionedJid: [user] },
				}
			);
		}
		const key = parsedArgs.joined.toLowerCase();
		const command =
			this.handler.commands.get(key) || this.handler.aliases.get(key);
		if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);
		const state = await this.client.DB.disabledcommands.findOne({
			command: command.config.command,
		});
		M.reply(
			`ā *Command:* ${this.client.util.capitalize(
				command.config?.command
			)}\nš *Status:* ${
				state ? "Disabled" : "Available"
			}\nš§© *Category:* ${this.client.util.capitalize(
				command.config?.category || ""
			)}${
				command.config.aliases
					? `\nš± *Aliases:* ${command.config.aliases
							.map(this.client.util.capitalize)
							.join(", ")}`
					: ""
			}\nš¬ *Group Only:* ${this.client.util.capitalize(
				JSON.stringify(!command.config.dm ?? true)
			)}\nš ļø *Usage:* ${command.config?.usage || ""}\n\nš *Description:* ${
				command.config?.description || ""
			}`
		);
	};
}
