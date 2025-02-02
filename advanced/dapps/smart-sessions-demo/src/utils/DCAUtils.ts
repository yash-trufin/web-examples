import { DCAFormSchemaType } from "@/schema/DCAFormSchema";
import { SmartSessionGrantPermissionsRequest } from "@reown/appkit-experimental/smart-session";
import { parseEther, toHex } from "viem";

export const assetsToAllocate = [
  { value: "eth", label: "ETH", supported: true },
  { value: "usdc", label: "USDC", supported: false },
  { value: "arb", label: "ARB", supported: false },
  { value: "op", label: "OP", supported: false },
];
export const assetsToBuy = [
  { value: "donut", label: "DONUT", supported: true },
  { value: "usdc", label: "USDC", supported: false },
];

export const intervalOptions = [
  { value: "minute", label: "Minute" },
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
];

export function getSampleAsyncDCAPermissions(
  data: DCAFormSchemaType,
): Omit<
  SmartSessionGrantPermissionsRequest,
  "signer" | "chainId" | "address" | "expiry"
> {
  return {
    permissions: [
      {
        type: "native-token-recurring-allowance",
        data: {
          allowance: toHex(parseEther(data.allocationAmount.toString())),
          period: calculateInterval(data.investmentInterval, data.intervalUnit),
          start: Date.now(),
        },
      },
    ],
    policies: [],
  };
}

// Helper function to calculate interval in milliseconds
export function calculateInterval(
  investmentInterval: number,
  intervalUnit: string,
): number {
  const unitToMilliseconds: Record<string, number> = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
  };

  return investmentInterval * (unitToMilliseconds[intervalUnit] || 0);
}
