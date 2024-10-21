import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Banner from "../components/Banner";
import Blockchain from "../components/Blockchain";
import Column from "../components/Column";
import RelayRegionDropdown from "../components/RelayRegionDropdown";
import Header from "../components/Header";
import Modal from "../components/Modal";
import {
  DEFAULT_MAIN_CHAINS,
  DEFAULT_TEST_CHAINS,
  DEFAULT_NEAR_METHODS,
} from "../constants";
import { AccountAction, setLocaleStorageTestnetFlag } from "../helpers";
import Toggle from "../components/Toggle";
import RequestModal from "../modals/RequestModal";
import PairingModal from "../modals/PairingModal";
import PingModal from "../modals/PingModal";
import {
  SAccounts,
  SAccountsContainer,
  SButtonContainer,
  SConnectButton,
  SContent,
  SDropDownContainer,
  SLanding,
  SLayout,
  SToggleContainer,
} from "../components/app";
import { useWalletConnectClient } from "../contexts/ClientContext";
import { useJsonRpc } from "../contexts/JsonRpcContext";
import { useChainData } from "../contexts/ChainDataContext";
import Icon from "../components/Icon";
import OriginSimulationDropdown from "../components/OriginSimulationDropdown";
import LoaderModal from "../modals/LoaderModal";
import RequestLoaderModal from "../modals/RequestLoaderModal";

// Normal import does not work here
const { version } = require("@walletconnect/sign-client/package.json");

const Home: NextPage = () => {
  const [modal, setModal] = useState("");

  const closeModal = () => setModal("");
  const openPairingModal = () => setModal("pairing");
  const openPingModal = () => setModal("ping");
  const openRequestModal = () => setModal("request");
  const openDisconnectModal = () => setModal("disconnect");

  // Initialize the WalletConnect client.
  const {
    client,
    pairings,
    session,
    connect,
    disconnect,
    chains,
    relayerRegion,
    accounts,
    balances,
    isFetchingBalances,
    isInitializing,
    setChains,
    setRelayerRegion,
    origin,
  } = useWalletConnectClient();

  // Use `JsonRpcContext` to provide us with relevant RPC methods and states.
  const {
    ping,
    nearRpc,
    isRpcRequestPending,
    rpcResult,
    isTestnet,
    setIsTestnet,
  } = useJsonRpc();

  const { chainData } = useChainData();

  // Close the pairing modal after a session is established.
  useEffect(() => {
    if (session && modal === "pairing") {
      closeModal();
    }
  }, [session, modal]);

  const onConnect = () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    // Suggest existing pairings (if any).
    if (pairings.length) {
      openPairingModal();
    } else {
      // If no existing pairings are available, trigger `WalletConnectClient.connect`.
      connect();
    }
  };

  const onPing = async () => {
    openPingModal();
    await ping();
  };

  const onDisconnect = useCallback(async () => {
    openDisconnectModal();
    try {
      await disconnect();
    } catch (error) {
      toast.error((error as Error).message, {
        position: "bottom-left",
      });
    }
    closeModal();
  }, [disconnect]);

  async function emit() {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }

    await client.emit({
      topic: session?.topic || "",
      event: { name: "chainChanged", data: {} },
      chainId: "eip155:5",
    });
  }

  const getNearActions = (): AccountAction[] => {
    const onSignAndSendTransaction = async (
      chainId: string,
      address: string
    ) => {
      openRequestModal();
      await nearRpc.testSignAndSendTransaction(chainId, address);
    };
    const onSignAndSendTransactions = async (
      chainId: string,
      address: string
    ) => {
      openRequestModal();
      await nearRpc.testSignAndSendTransactions(chainId, address);
    };
    return [
      {
        method: DEFAULT_NEAR_METHODS.NEAR_SIGN_AND_SEND_TRANSACTION,
        callback: onSignAndSendTransaction,
      },
      {
        method: DEFAULT_NEAR_METHODS.NEAR_SIGN_AND_SEND_TRANSACTIONS,
        callback: onSignAndSendTransactions,
      },
    ];
  };

  const getBlockchainActions = (account: string) => {
    const [namespace] = account.split(":");
    switch (namespace) {
      case "near":
        return getNearActions();
      default:
        break;
    }
  };

  // Toggle between displaying testnet or mainnet chains as selection options.
  const toggleTestnets = () => {
    const nextIsTestnetState = !isTestnet;
    setIsTestnet(nextIsTestnetState);
    setLocaleStorageTestnetFlag(nextIsTestnetState);
  };

  const handleChainSelectionClick = (chainId: string) => {
    if (chains.includes(chainId)) {
      setChains(chains.filter((chain) => chain !== chainId));
    } else {
      setChains([...chains, chainId]);
    }
  };

  // Renders the appropriate model for the given request that is currently in-flight.
  const renderModal = () => {
    switch (modal) {
      case "pairing":
        if (typeof client === "undefined") {
          throw new Error("WalletConnect is not initialized");
        }
        return <PairingModal pairings={pairings} connect={connect} />;
      case "request":
        return (
          <RequestModal pending={isRpcRequestPending} result={rpcResult} />
        );
      case "ping":
        return <PingModal pending={isRpcRequestPending} result={rpcResult} />;
      case "requestLoader":
        return (
          <RequestLoaderModal
            pending={isRpcRequestPending}
            result={rpcResult}
          />
        );
      case "disconnect":
        return <LoaderModal title={"Disconnecting..."} />;
      default:
        return null;
    }
  };

  const [openSelect, setOpenSelect] = useState(false);

  const openDropdown = () => {
    setOpenSelect(!openSelect);
  };

  const renderContent = () => {
    const chainOptions = isTestnet ? DEFAULT_TEST_CHAINS : DEFAULT_MAIN_CHAINS;

    return !accounts.length && !Object.keys(balances).length ? (
      <SLanding center>
        <Banner />
        <h6>{`Using v${version || "2.0.0-beta"}`}</h6>
        <SButtonContainer>
          <h6>Select chains:</h6>
          <SToggleContainer>
            <p>Testnets Only?</p>
            <Toggle active={isTestnet} onClick={toggleTestnets} />
          </SToggleContainer>
          {chainOptions.map((chainId) => (
            <Blockchain
              key={chainId}
              chainId={chainId}
              chainData={chainData}
              onClick={handleChainSelectionClick}
              active={chains.includes(chainId)}
            />
          ))}
          <SConnectButton left onClick={onConnect} disabled={!chains.length}>
            Connect
          </SConnectButton>
          <SDropDownContainer>
            <RelayRegionDropdown
              relayerRegion={relayerRegion}
              setRelayerRegion={setRelayerRegion}
              show={openSelect}
            />
            <OriginSimulationDropdown origin={origin} show={openSelect} />
          </SDropDownContainer>
          <button onClick={openDropdown} style={{ background: "transparent" }}>
            <Icon size={30} src={"/assets/settings.svg"} />
          </button>
        </SButtonContainer>
      </SLanding>
    ) : (
      <SAccountsContainer>
        <h3>Accounts</h3>
        <SAccounts>
          {accounts.map((account) => {
            const [namespace, reference, address] = account.split(":");
            const chainId = `${namespace}:${reference}`;
            return (
              <Blockchain
                key={account}
                active
                chainData={chainData}
                fetching={isFetchingBalances}
                address={address}
                chainId={chainId}
                balances={balances}
                actions={getBlockchainActions(account)}
              />
            );
          })}
        </SAccounts>
      </SAccountsContainer>
    );
  };

  return (
    <SLayout>
      <Column maxWidth={1000} spanHeight>
        <Header
          ping={onPing}
          disconnect={onDisconnect}
          session={session}
          emit={emit}
        />
        <SContent>{isInitializing ? "Loading..." : renderContent()}</SContent>
      </Column>
      <Modal show={!!modal} closeModal={closeModal}>
        {renderModal()}
      </Modal>
    </SLayout>
  );
};

export default Home;
