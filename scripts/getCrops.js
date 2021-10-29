import { getCrops } from "../functions.js";

const account = process.env.ACCOUNT;

const crops = await getCrops(account);
console.log(crops);