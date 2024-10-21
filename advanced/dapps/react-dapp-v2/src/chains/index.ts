import { JsonRpcRequest } from "@walletconnect/jsonrpc-utils";

import * as near from "./near";

import { ChainMetadata, ChainRequestRender } from "../helpers";

export function getChainMetadata(chainId: string): ChainMetadata {
  const namespace = chainId.split(":")[0];
  switch (namespace) {
    case "near":
      return near.getChainMetadata(chainId);
    default:
      throw new Error(`No metadata handler for namespace ${namespace}`);
  }
}

export function getChainRequestRender(
  request: JsonRpcRequest,
  chainId: string
): ChainRequestRender[] {
  const namespace = chainId.split(":")[0];
  switch (namespace) {
    case "near":
      return near.getChainRequestRender(request);
    default:
      throw new Error(`No render handler for namespace ${namespace}`);
  }
}
