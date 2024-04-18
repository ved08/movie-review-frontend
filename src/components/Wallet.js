import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import {
    ConnectionProvider,
    WalletProvider
} from "@solana/wallet-adapter-react"
import { clusterApiUrl } from "@solana/web3.js"
import { useMemo } from "react"
import "@solana/wallet-adapter-react-ui/styles.css"

const WalletContextProvider = ({children}) => {
    const wallets = useMemo(() => [], [])

    return(
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export{ WalletContextProvider}