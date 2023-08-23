import { RPC } from "@ckb-lumos/rpc";
import { config } from "@ckb-lumos/lumos";

export const CKB_RPC_URL = "https://testnet.ckbapp.dev"
export const CKB_RPC_INDEX_URL = "https://testnet.ckbapp.dev"
export const RPC_DEBUG_SERVICE = false
export const RPCClient = new RPC(CKB_RPC_URL);
export let CKB_CONFIG = config.predefined.AGGRON4
config.initializeConfig(config.predefined.AGGRON4)