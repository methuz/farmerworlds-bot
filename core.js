import dotenv from "dotenv";
import { Api, JsonRpc, RpcError } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig.js";
import fetch from "node-fetch";

import { TextDecoder, TextEncoder } from "util"; //node only

dotenv.config();

const privateKey = process.env.KEY;
const account = process.env.ACCOUNT;

const signatureProvider = new JsSignatureProvider([privateKey]);

const rpc = new JsonRpc("http://wax.eoseoul.io", { fetch });

const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

export { rpc, api };
