import { getAtomicAssets, sellCorn} from "../functions.js";
import _ from "lodash";

const account = process.env.ACCOUNT;

const atomicAssets = await getAtomicAssets(account);
const corns = _.filter(atomicAssets, {
  name: "Corn",
});


for (let i = 0; i < corns.length; i++) {
    const cornId = corns[i].asset_id;
    console.log(`${account} Selling Corn ${cornId}`)
    await sellCorn(account, cornId);
}