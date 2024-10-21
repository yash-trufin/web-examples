import { getAppMetadata } from "@walletconnect/utils";

if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error("`NEXT_PUBLIC_PROJECT_ID` env variable is missing.");

export const DEFAULT_MAIN_CHAINS = [
  // mainnets
  // "eip155:1",
  // "eip155:10",
  // "eip155:100",
  // "eip155:137",
  // "eip155:324",
  // "eip155:42161",
  // "eip155:42220",
  // "cosmos:cosmoshub-4",
  // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  // "polkadot:91b171bb158e2d3848fa23a9f1c25182",
  // "mvx:1",
  // "tron:0x2b6653dc",
  // "tezos:mainnet",
  // "kadena:mainnet01",
];

export const DEFAULT_TEST_CHAINS = [
  // testnets
  "near:testnet",
];

export const DEFAULT_CHAINS = [...DEFAULT_MAIN_CHAINS, ...DEFAULT_TEST_CHAINS];

export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const DEFAULT_RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL;

export const DEFAULT_LOGGER = "debug";

export const DEFAULT_APP_METADATA = {
  name: "React App",
  description: "React App for WalletConnect",
  url: "https://walletconnect.com/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  verifyUrl: "https://verify.walletconnect.com",
};

/**
 * NEAR
 */
export enum DEFAULT_NEAR_METHODS {
  NEAR_SIGN_IN = "near_signIn",
  NEAR_SIGN_OUT = "near_signOut",
  NEAR_GET_ACCOUNTS = "near_getAccounts",
  NEAR_SIGN_AND_SEND_TRANSACTION = "near_signAndSendTransaction",
  NEAR_SIGN_AND_SEND_TRANSACTIONS = "near_signAndSendTransactions",
}

export enum DEFAULT_NEAR_EVENTS {}

export const DEFAULT_GITHUB_REPO_URL =
  "https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2";

type RelayerType = {
  value: string | undefined;
  label: string;
};

export const REGIONALIZED_RELAYER_ENDPOINTS: RelayerType[] = [
  {
    value: DEFAULT_RELAY_URL,
    label: "Default",
  },
  {
    value: "wss://us-east-1.relay.walletconnect.com",
    label: "US",
  },
  {
    value: "wss://eu-central-1.relay.walletconnect.com",
    label: "EU",
  },
  {
    value: "wss://ap-southeast-1.relay.walletconnect.com",
    label: "Asia Pacific",
  },
];

export const ORIGIN_OPTIONS = [
  {
    value: getAppMetadata().url,
    label: "VALID",
  },
  {
    value: "https://invalid.origin",
    label: "INVALID",
  },
  {
    value: "unknown",
    label: "UNKNOWN",
  },
];
