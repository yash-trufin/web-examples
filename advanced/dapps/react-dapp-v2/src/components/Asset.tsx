import * as React from "react";
import styled from "styled-components";

import Icon from "./Icon";

import { AssetData, fromWad } from "../helpers";

const SAsset = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const SAssetLeft = styled.div`
  display: flex;
`;

const SAssetName = styled.div`
  display: flex;
  margin-left: 10px;
`;

const SAssetRight = styled.div`
  display: flex;
`;

const SAssetBalance = styled.div`
  display: flex;
`;

function getAssetIcon(asset: AssetData): JSX.Element {
  if (!!asset.contractAddress) {
    const src = `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${asset.contractAddress.toLowerCase()}.png`;
    return <Icon src={src} fallback={"/assets/erc20.svg"} />;
  }
  switch (asset.symbol.toLowerCase()) {
    case "eth":
      return <Icon src={"/assets/eth.svg"} />;
    default:
      return <Icon src={"/assets/eth20.svg"} />;
  }
}

interface AssetProps {
  asset: AssetData;
}

const Asset = (props: AssetProps) => {
  const { asset } = props;
  return (
    <SAsset {...props}>
      <SAssetLeft>
        {getAssetIcon(asset)}
        <SAssetName>{asset.name}</SAssetName>
      </SAssetLeft>
      <SAssetRight>
        <SAssetBalance>
          {fromWad(asset.balance || "0")} {asset.symbol}
        </SAssetBalance>
      </SAssetRight>
    </SAsset>
  );
};

export default Asset;
