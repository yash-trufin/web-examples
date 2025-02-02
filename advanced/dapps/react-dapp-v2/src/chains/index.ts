import * as near from "./near";

import { ChainMetadata } from "../helpers";

export function getChainMetadata(chainId: string): ChainMetadata {
  const namespace = chainId.split(":")[0];
  switch (namespace) {
    case "near":
      return near.getChainMetadata(chainId);
    default:
      throw new Error(`No metadata handler for namespace ${namespace}`);
  }
}
