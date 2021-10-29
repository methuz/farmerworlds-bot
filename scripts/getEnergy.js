import { getAccount, refillEnergy } from "../functions.js";

console.log(process.env.ACCOUNT);
const account = process.env.ACCOUNT;
const enableRefillEnergy = process.env.ENABLE_REFILL_ENERGY;
const energyToRefill = process.env.ENERGY_TO_REFILL;

const acc = await getAccount(account);
const food = acc.balances[0].split(".")[0];

if (
  enableRefillEnergy &&
  acc.max_energy - acc.energy >= energyToRefill &&
  food >= energyToRefill / 5
) {
  console.log(
    `== Refill Energy == From : ${acc.energy}, For : ${energyToRefill}`
  );
  await refillEnergy(account, 250);
} else {
  `== ENERGY LEVEL : OK`;
}
