import { getBLDs } from "../functions.js";

const account = process.env.ACCOUNT;

const blds = await getBLDs(account);
console.log(blds);