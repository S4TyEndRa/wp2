/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys/lib/WAConnection";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import * as typings from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "info",
			description: "Will display the info of the bot",
			category: "general",
			usage: `${client.config.prefix}info`,
			baseXp: 0,
		});
	}

	run = async (M: typings.ISimplifiedMessage): Promise<void> => {
		//eslint-disable @typescript-eslint/no-explicit-any/
        const chats: any = this.client.chats		
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		const pad = (s: any) => (s < 10 ? "0" : "") + s;
		function formatTime(seconds: any): string {
			const hours = Math.floor(seconds / (60 * 60));
			const minutes = Math.floor((seconds % (60 * 60)) / 60);
			const secs = Math.floor(seconds % 60);
			return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
		}
		const users = await this.client.DB.user.count();
                const uban = await this.client.DB.user.count({ban: true});
		function uptime() {
			return newFunction(formatTime);
		}
		this.run = async (M: typings.ISimplifiedMessage): Promise<void> => {
			const texas =
				"https://telegra.ph/file/20d75a844b2e74a49edfc.jpg";
			return void this.client.sendMessage(
				M.from,
				{ url: texas },
				MessageType.image,
				{
                                        caption: `*╭─* \n*│Name: Texαs* ✨\n*│ℙ𝕣𝕖𝕗𝕚𝕩:* *${this.client.config.prefix}*\n*│Owner: Alι_Aryαɴ*\n*│Total Groups: ${chats.length}*\n*│Uptime: ${uptime()}*\n*│Total Members: ${users}*\n*│Banned Members: ${uban}*\n*╰────────────*\n`
				}
			);
		};
	}
}
function newFunction(formatTime: (seconds: any) => string) {
	return formatTime(process.uptime());
}
