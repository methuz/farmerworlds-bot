import { getAtomicAssets, getAnimals, feedCow } from "../functions.js";
import _ from "lodash";

const account = process.env.ACCOUNT;

const animals = await getAnimals(account);


const cows = _.filter(animals, {
    name: 'Dairy Cow'
})

const now = new Date().getTime() / 1000;

for (let i = 0; i < cows.length; i++) {
    const cowId = cows[i].asset_id;
    if (now >= cows[i].next_availability) {
        const atomicAssets = await getAtomicAssets(account);
        const barleys = _.filter(atomicAssets, {
            name:'Barley'
        })
        if (barleys.length > 0) {
            const barleyId = barleys[i].asset_id;
            console.log(barleyId);
            console.log (`${account} Feeding Cow ${cowId} with Barley ${barleyId}`);
            if (account, cowId, barleyId) {
                await feedCow(account, cowId, barleyId);
            } else {
                console.log(`${account} Error, cowId or _barley not found`)
            }
        } else {
            console.log(`${account} Not enough barley`)
        }
    } else {
        console.log(`${account} Cooldown Cow ${cowId}`)
    }
}