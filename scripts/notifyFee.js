import dotenv from "dotenv";
import line  from "@line/bot-sdk"

dotenv.config();

import { getConfig } from "../functions.js";

const lineConfig = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(lineConfig);

const cfg = await getConfig();

const msg = { type: 'text', text: `Withdraw Fee is ${cfg.fee}%` };

if (cfg.fee <= 5) {
    await client.broadcast(msg);
} 

console.log(`Fee is ${cfg.fee}%`)

process.exit(0);
