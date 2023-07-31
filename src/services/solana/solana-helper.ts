import { Keypair, Transaction, SystemProgram, Connection, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";

import {
    ACCOUNT_SIZE,
    createInitializeAccountInstruction,
    getMinimumBalanceForRentExemptAccount,
    TOKEN_PROGRAM_ID,
    getOrCreateAssociatedTokenAccount,
    transferChecked,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress
} from "@solana/spl-token";



class SolanaHelper {

    /**
     * Solana Connection Environment
     */
    private connection = new Connection(process.env.SOLANA_CONNECTION_ENVIRONMENT!);

    /**
     * Fee Payer Account Credentials
     */
    private feePayer = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.SOLANA_FEE_PAYER_PRIVATE_KEY!))
    );

    /**
     * Game Wallet Account Credentials
     */
    private gameWallet = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.SOLANA_TIC_TAC_TOE_GAME_PRIVATE_KEY!))
    );

    /**
     * Token Mint Account
     */
    private tokenMintAddress = new PublicKey(process.env.SOLANA_TOKEN_MINT_ADDRESS!)

    /**
     * Function to create token account for new users
     * @returns Keypair of the created account
     */
    createTokenAccount = async (): Promise<Keypair> => {

        const tokenAccount = Keypair.generate();

        let tx = new Transaction();
        tx.add(
            // create account
            SystemProgram.createAccount({
                fromPubkey: this.feePayer.publicKey,
                newAccountPubkey: tokenAccount.publicKey,
                space: ACCOUNT_SIZE,
                lamports: await getMinimumBalanceForRentExemptAccount(this.connection),
                programId: TOKEN_PROGRAM_ID,
            }),
            // init token account
            createInitializeAccountInstruction(tokenAccount.publicKey, this.tokenMintAddress, tokenAccount.publicKey)
        );

        try {
            const associatedToken = await getAssociatedTokenAddress(
                this.tokenMintAddress,
                tokenAccount.publicKey,
            );
            console.log(associatedToken)

            const transaction = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    this.feePayer.publicKey,
                    associatedToken,
                    tokenAccount.publicKey,
                    this.tokenMintAddress
                )
            );

            await sendAndConfirmTransaction(this.connection, transaction, [this.feePayer]);
        } catch (error: unknown) {
            console.error(error)
            // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
            // instruction error if the associated account exists already.
        }

        return tokenAccount
    }

    /**
     * Function for airdropping tokens
     */
    transferToken = async (secretKey: string, amount: number, toGameWallet: boolean = true): Promise<void> => {
        const tokenAccount = Keypair.fromSecretKey(this.stringToUint8Array(secretKey))
        const splTokenAccountPublicKey = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.feePayer,
            this.tokenMintAddress,
            tokenAccount.publicKey,
        )

        const gameTokenAccountPublicKey = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.feePayer,
            this.tokenMintAddress,
            this.gameWallet.publicKey
        )

        const sourceTokenAccount = toGameWallet ? splTokenAccountPublicKey : gameTokenAccountPublicKey
        const destinationTokenAccount = toGameWallet ? gameTokenAccountPublicKey : splTokenAccountPublicKey
        const ownerAccount = toGameWallet ? tokenAccount : this.gameWallet

        if (sourceTokenAccount.amount < amount) {
            throw new Error("Insufficient account balance.")
        }

        await transferChecked(
            this.connection, // connection
            this.feePayer, // payer
            sourceTokenAccount.address, // from (should be a token account)
            this.tokenMintAddress, // mint
            destinationTokenAccount.address, // to (should be a token account)
            ownerAccount, // from's owner
            amount * 1e10, // amount, if your deciamls is 8, send 10^8 for 1 token
            10 // decimals
        )
    }

    getBalance = async (secretKey: string): Promise<bigint> => {
        const tokenAccount = Keypair.fromSecretKey(this.stringToUint8Array(secretKey))

        const splTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.feePayer,
            this.tokenMintAddress,
            tokenAccount.publicKey,
        )
        return splTokenAccount.amount / BigInt(1e10)
    }

    stringToUint8Array = (str: string): Uint8Array => {
        const arr = str.split(",")
        const numArr = arr.map(item => parseInt(item))
        return Uint8Array.from(numArr);
    }
}

const solanaHelper = new SolanaHelper();
export default solanaHelper;
