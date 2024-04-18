import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { Movie } from "../MovieClass"
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"

const MOVIE_REVIEW_PROGRAM_ID = "6KJWuoNvVapUodYfimsQxFwvdE5xSYZu2dfqnyFmycaA"
const Form = () => {
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState("")

    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    const handleSubmit = () => {
        const movie = new Movie(title, rating, message)
        console.log(publicKey)
        handleSubmitTransation(movie)
    }
    const handleSubmitTransation = async movie => {
        if(!publicKey) {
            alert("Please connect your wallet")
            return;
        }
        const buffer = movie.serialize()
        const transaction = new Transaction()
        const [pda] = PublicKey.findProgramAddressSync(
            [publicKey.toBuffer(), Buffer.from(movie.title)],
            new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        )
        console.log("PDA: ", pda.toBase58())
        const intstruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                }
            ],
            data: buffer,
            programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
        })
        transaction.add(intstruction)
        try {
            const tx = await sendTransaction(transaction, connection)
            console.log(tx)
        } catch(e) {
            console.log(e)
        }

    }

    return(
        <div>
            <input type="text" onChange={e => setTitle(e.target.value)}/>
            <input type="number" onChange={e => setRating(e.target.value)}/>
            <input type="text" onChange={e => setMessage(e.target.value)}/>
            <button onClick={handleSubmit}>Add movie</button>
        </div>
    )
}

export default Form