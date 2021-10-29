import { rpc, api } from "./core.js";
import { getAccount } from "./functions.js";

const account = process.env.ACCOUNT;

async function claimDrop() {
  const result = await api.transact(
    {
      actions: [
        {
          account: "atomicdropsx",
          name: "claimdrop",
          authorization: [
            {
              actor: account,
              permission: "active",
            },
          ],
          data: {
            claim_amount: 1,
            claimer: "midas.gm",
            country: "TH",
            drop_id: 84317,
            // drop_id: 84319,
            intended_delphi_median: 3255,
            referrer: "atomichub",
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
  console.log("result = ", result);
}

claimDrop();

