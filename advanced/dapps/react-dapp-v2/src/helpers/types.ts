export interface AssetData {
  symbol: string;
  name: string;
  contractAddress?: string;
  balance?: string;
}

export interface ChainData {
  name: string;
  id: string;
  rpc: string[];
  slip44: number;
  testnet: boolean;
}
export interface ChainsMap {
  [reference: string]: ChainData;
}

export interface ChainMetadata {
  name?: string;
  logo: string;
  rgb: string;
}

export interface NamespaceMetadata {
  [reference: string]: ChainMetadata;
}
export interface ChainNamespaces {
  [namespace: string]: ChainsMap;
}

export interface AccountAction {
  method: string;
  callback: (chainId: string, address: string) => Promise<void>;
}

export interface AccountBalances {
  [account: string]: AssetData[];
}
