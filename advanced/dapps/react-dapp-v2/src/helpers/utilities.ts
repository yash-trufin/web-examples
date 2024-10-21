import { BigNumber, BigNumberish, utils } from "ethers";

import { DEFAULT_CHAINS } from "../constants";

export function ellipseAddress(address = "", width = 10): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const sanitizeDecimals = (value: string, decimals = 18): string => {
  const [integer, fractional] = value.split(".");
  const _fractional = fractional
    ? fractional.substring(0, decimals).replace(/0+$/gi, "")
    : undefined;
  return _fractional ? [integer, _fractional].join(".") : integer;
};

export const toWad = (amount: string, decimals = 18): BigNumber => {
  return utils.parseUnits(sanitizeDecimals(amount, decimals), decimals);
};

export const fromWad = (wad: BigNumberish, decimals = 18): string => {
  return sanitizeDecimals(utils.formatUnits(wad, decimals), decimals);
};

export const LOCALSTORAGE_KEY_TESTNET = "TESTNET";
export const INITIAL_STATE_TESTNET_DEFAULT = true;

export function setLocaleStorageTestnetFlag(value: boolean): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCALSTORAGE_KEY_TESTNET, `${value}`);
  }
}

export function getLocalStorageTestnetFlag(): boolean {
  if (typeof window === "undefined") return false;
  let value = INITIAL_STATE_TESTNET_DEFAULT;
  const persisted = window.localStorage.getItem(LOCALSTORAGE_KEY_TESTNET);
  if (!persisted) {
    setLocaleStorageTestnetFlag(value);
  } else {
    value = persisted === "true" ? true : false;
  }
  return value;
}

export const getAllChainNamespaces = () => {
  const namespaces: string[] = [];
  DEFAULT_CHAINS.forEach((chainId) => {
    const [namespace] = chainId.split(":");
    if (!namespaces.includes(namespace)) {
      namespaces.push(namespace);
    }
  });
  return namespaces;
};
