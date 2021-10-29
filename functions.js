import { rpc, api } from "./core.js";
import  axios  from "axios";

async function getConfig() {
  const cfg = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "config", // Table name
    table_key: "last_fee_updated",
    limit: 1, // Maximum number of rows that we want to get
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return cfg.rows[0];
}

async function getAccount(_account) {
  const acc = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "accounts", // Table name
    table_key: "owner",
    limit: 20, // Maximum number of rows that we want to get
    lower_bound: _account,
    upper_bound: _account,
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return acc.rows[0];
}

async function getTool(_id) {
  const tools = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "tools", // Table name
    table_key: "owner",
    limit: 1, // Maximum number of rows that we want to get
    lower_bound: _id,
    upper_bound: _id,
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return tools.rows[0];
}

async function getCrop(_id) {
  const crops = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "crops", // Table name
    table_key: "owner",
    limit: 1, // Maximum number of rows that we want to get
    lower_bound: _id,
    upper_bound: _id,
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return crops.rows[0];
}

async function getAtomicAssets(_account) {
  const assets = await axios.get("https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + _account + '&page=1&limit=1000&order=desc&sort=asset_id');
  return assets.data.data;
}

async function getAnimals(_account) {
  const animals = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "animals", // Table name
    index_position: "2",
    key_type:"i64",
    limit: 20, // Maximum number of rows that we want to get
    lower_bound: _account,
    upper_bound: _account
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return animals.rows;
}

async function getCrops(_account) {
  const crops = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "crops", // Table name
    index_position: "2",
    key_type:"i64",
    limit: 20, // Maximum number of rows that we want to get
    lower_bound: _account,
    upper_bound: _account,
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return crops.rows;
}

async function getBLDs(_account) {
  const blds = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: "farmersworld", // Contract that we target
    scope: "farmersworld", // Account that owns the data
    table: "buildings", // Table name
    index_position: "2",
    key_type:"i64",
    limit: 20, // Maximum number of rows that we want to get
    lower_bound: _account,
    upper_bound: _account,
    //   reverse: false, // Optional: Get reversed data
    //   show_payer: false, // Optional: Show ram payer
  });
  return blds.rows;
}

async function cropClaim(_account, _id) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "farmersworld",
          name: "cropclaim",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            crop_id: _id,
            owner: _account,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
}
async function claim(_account, _id) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "farmersworld",
          name: "claim",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            asset_id: _id,
            owner: _account,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
}

async function bldClaim(_account, _id) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "farmersworld",
          name: "bldclaim",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            asset_id: _id,
            owner: _account,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
}

async function sellCorn(_account, _cornId) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "atomicassets",
          name: "transfer",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            asset_ids: [_cornId],
            from: _account,
            to: "farmersworld",
            memo:"burn"
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  )
}
async function feedCow(_account, _cowId, _barleyId) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "atomicassets",
          name: "transfer",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            asset_ids: [_barleyId],
            from: _account,
            to: "farmersworld",
            memo:"feed_animal:" + _cowId
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  )
}

async function refillEnergy(_account, _amount) {
  const result = await api.transact(
    {
      actions: [
        {
          account: "farmersworld",
          name: "recover",
          authorization: [
            {
              actor: _account,
              permission: "active",
            },
          ],
          data: {
            energy_recovered: _amount,
            owner: _account,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
}

export { getAccount, getAnimals, getConfig, getCrops, getBLDs, getAtomicAssets, bldClaim, claim, sellCorn, cropClaim, feedCow, getTool, getCrop, refillEnergy };
