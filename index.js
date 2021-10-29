import { readFile } from "fs/promises";

import {
  getAccount,
  claim,
  cropClaim,
  getTool,
  getCrop,
  bldClaim,
  getBLDs,
  getCrops,
  refillEnergy,
} from "./functions.js";

const itemList = JSON.parse(
  await readFile(new URL("./items.json", import.meta.url))
);

const account = process.env.ACCOUNT;

const acc = await getAccount(account);

const cropList = await getCrops(account);

// ============ CHECK ENERGY AND REFILL ==================
const enableRefillEnergy = process.env.ENABLE_REFILL_ENERGY;
const energyThreshold = process.env.ENERGY_TRSH;
const food = acc.balances[0].split(".")[0];

console.log(`${account} Checking energy...`);
const missingEnergy = acc.max_energy - acc.energy;
if (missingEnergy >= energyThreshold) {
  console.log(`${account} DANGER ENERGY BELOW THRESHOLD`);
  if (enableRefillEnergy) {
    console.log(`${account} Auto Refill`);
    if (food >= missingEnergy / 5) {
      console.log(
        `${account} == Refill Energy == From : ${acc.energy}, For : ${missingEnergy}`
      );
      await refillEnergy(account, missingEnergy);
    } else {
      console.log(
        `${account} == Cannot refill ${acc.energy}/${acc.max_energy}, Missing Food`
      );
    }
  }
  process.exit(0);
} else {
  console.log(`${account} == Energy OK ${acc.energy}/${acc.max_energy}`);
}

if (acc.energy <= 50) {
  console.log(`${account} == DANGER == energy <= 50`);
  process.exit(0);
}

console.log(`${account} Checking tools...`);

for (let i = 0; i < itemList.length; i++) {
  const itemID = itemList[i];
  const tool = await getTool(itemID);
  const now = new Date().getTime() / 1000;

  if (tool.current_durability <= 15) {
    console.log(
      `${account} == DANGER == Item : ${itemID} Low Durability: ${tool.current_durability}/${tool.durability}`
    );
    continue;
  }

  if (now >= tool.next_availability && tool.current_durability >= 10) {
    console.log(
      `${account} == Claiming == Item : ${itemID}, Type : ${tool.type}, Durability: ${tool.current_durability}/${tool.durability}`
    );
    await claim(account, itemID);
  } else {
    console.log(
      `${account} == Cooldown == Item : ${itemID}, Type : ${tool.type}, Durability: ${tool.current_durability}/${tool.durability}`
    );
  }
}
console.log(`${account} Checking crops...`);

for (let i = 0; i < cropList.length; i++) {
  const crop = cropList[i];
  const now = new Date().getTime() / 1000;

  if (now >= crop.next_availability) {
    console.log(`${account} == Claiming == Crop : ${crop.asset_id}`);
    await cropClaim(account, crop.asset_id);
  } else {
    console.log(`${account} == Cooldown == Crop : ${crop.asset_id}`);
  }
}

if (process.env.ENABLE_BLD) {
  console.log(`${account} Enable Checking BLD...`);
  const blds = await getBLDs(account);
  const now = new Date().getTime() / 1000;

  for (let i = 0; i < blds.length; i++) {
    const bld = blds[i];
    if (!bld.is_ready) {
      if(now >= bld.next_availability) {
        console.log(`${account} == Claiming == BLD : ${bld.asset_id}`);
        await bldClaim(account, bld.asset_id);
      } else {
        console.log(`${account} == Cooldown == BLD : ${bld.asset_id}`);
      }
    } 
  }
}
