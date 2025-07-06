"use client";

import {
  APTOS_CONNECT_ACCOUNT_URL,
  AboutAptosConnect,
  AboutAptosConnectEducationScreen,
  AdapterNotDetectedWallet,
  AdapterWallet,
  AptosPrivacyPolicy,
  WalletItem,
  WalletSortingOptions,
  groupAndSortWallets,
  isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Copy,
  LogOut,
  User,
} from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useToast } from "../components/ui/use-toast";

export function WalletSelector(walletSortingOptions: WalletSortingOptions) {
  const { account, connected, disconnect, wallet } = useWallet();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address.toString());
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  // Send wallet address to agent when connected
  useEffect(() => {
    const sendWalletToAgent = async () => {
      if (connected && account?.address) {
        try {
          // Get or create user_id
          let userId = localStorage.getItem('user_id');
          if (!userId) {
            console.log("Connecting to agent =====================")
            const res = await fetch('https://aptos-agent.onrender.com/start', { method: 'POST' });
            const data = await res.json();
            if (data.user_id) {
              userId = data.user_id;
              localStorage.setItem('user_id', userId);
            }
          }

          // Send wallet address to /query
          if (userId) {
            const queryRes = await fetch('https://aptos-agent.onrender.com/query', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userId,
                query: `My wallet address is ${account.address.toString()}`,
              }),
            });

            if (queryRes.ok) {
              console.log("Wallet address sent to agent successfully");
            }
          }
        } catch (error) {
          console.error("Error sending wallet address to agent:", error);
        }
      }
    };

    sendWalletToAgent();
  }, [connected, account?.address]);

  // Custom connect handler
  const handleConnect = async () => {
    setConnecting(true);
    try {
      // Open the wallet selection dialog
      setIsDialogOpen(true);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to open wallet selection.",
      });
    } finally {
      setConnecting(false);
    }
  };

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border border-pink-500/20">
          {account?.ansName ||
            truncateAddress(account?.address?.toString()) ||
            "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border border-pink-500/20">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2 text-white hover:bg-pink-500/20">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a
              href={APTOS_CONNECT_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-white hover:bg-pink-500/20"
            >
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2 text-white hover:bg-red-500/20">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={handleConnect} 
          disabled={connecting}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border border-pink-500/20"
        >
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DialogTrigger>
      <ConnectWalletDialog close={closeDialog} {...walletSortingOptions} />
    </Dialog>
  );
}

interface ConnectWalletDialogProps extends WalletSortingOptions {
  close: () => void;
}

function ConnectWalletDialog({
  close,
  ...walletSortingOptions
}: ConnectWalletDialogProps) {
  const { wallets = [], notDetectedWallets = [] } = useWallet();

  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(
      [...wallets, ...notDetectedWallets],
      walletSortingOptions
    );

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <DialogContent className="max-h-screen overflow-auto bg-black/90 backdrop-blur-md border border-pink-500/20 text-white">
      <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center leading-snug text-white">
            {hasAptosConnectWallets ? (
              <>
                <span>Log in or sign up</span>
                <span>with Social + Aptos Connect</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </DialogTitle>
        </DialogHeader>

        {hasAptosConnectWallets && (
          <div className="flex flex-col gap-2 pt-3">
            {aptosConnectWallets.map((wallet) => (
              <AptosConnectWalletRow
                key={wallet.name}
                wallet={wallet}
                onConnect={close}
              />
            ))}
            <p className="flex gap-1 justify-center items-center text-gray-300 text-sm">
              Learn more about{" "}
              <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-pink-400 hover:text-pink-300">
                Aptos Connect <ArrowRight size={16} />
              </AboutAptosConnect.Trigger>
            </p>
            <AptosPrivacyPolicy className="flex flex-col items-center py-1">
              <p className="text-xs leading-5 text-gray-400">
                <AptosPrivacyPolicy.Disclaimer />{" "}
                <AptosPrivacyPolicy.Link className="underline underline-offset-4 text-pink-400 hover:text-pink-300" />
                <span className="text-gray-400">.</span>
              </p>
              <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-gray-400" />
            </AptosPrivacyPolicy>
            <div className="flex items-center gap-3 pt-4 text-gray-500">
              <div className="h-px w-full bg-pink-500/20" />
              Or
              <div className="h-px w-full bg-pink-500/20" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-3">
          {availableWallets.map((wallet) => (
            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
          ))}
          {!!installableWallets.length && (
            <Collapsible className="flex flex-col gap-3">
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-2 text-white hover:bg-pink-500/20">
                  More wallets <ChevronDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-3">
                {installableWallets.map((wallet) => (
                  <WalletRow
                    key={wallet.name}
                    wallet={wallet}
                    onConnect={close}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </AboutAptosConnect>
    </DialogContent>
  );
}

interface WalletRowProps {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between px-4 py-3 gap-4 border border-pink-500/20 rounded-md bg-black/20 hover:bg-pink-500/10 transition-colors"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal text-white" />
      </div>
      {isInstallRequired(wallet) ? (
        <Button size="sm" variant="ghost" asChild className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/20">
          <WalletItem.InstallLink />
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
            Connect
          </Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <Button size="lg" variant="outline" className="w-full gap-4 bg-black/20 border-pink-500/20 text-white hover:bg-pink-500/10">
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  return (
    <>
      <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
        <Button variant="ghost" size="icon" onClick={screen.cancel} className="text-white hover:bg-pink-500/20">
          <ArrowLeft />
        </Button>
        <DialogTitle className="leading-snug text-base text-center text-white">
          About Aptos Connect
        </DialogTitle>
      </DialogHeader>

      <div className="flex h-[162px] pb-3 items-end justify-center">
        <screen.Graphic />
      </div>
      <div className="flex flex-col gap-2 text-center pb-4">
        <screen.Title className="text-xl text-white" />
        <screen.Description className="text-sm text-gray-300 [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-pink-400" />
      </div>

      <div className="grid grid-cols-3 items-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.back}
          className="justify-self-start text-white hover:bg-pink-500/20"
        >
          Back
        </Button>
        <div className="flex items-center gap-2 place-self-center">
          {screen.screenIndicators.map((ScreenIndicator, i) => (
            <ScreenIndicator key={i} className="py-4">
              <div className="h-0.5 w-6 transition-colors bg-gray-600 [[data-active]>&]:bg-pink-400" />
            </ScreenIndicator>
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.next}
          className="gap-2 justify-self-end text-white hover:bg-pink-500/20"
        >
          {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}