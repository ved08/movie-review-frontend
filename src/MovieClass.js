import * as borsh from "@coral-xyz/borsh"
import { Buffer } from "buffer"
window.Buffer = window.Buffer || require("buffer").Buffer;

export class Movie {
    constructor(title, rating, description) {
        this.title = title
        this.rating = rating
        this.description = description
    }
    borshInstructionSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('description')
    ])
    serialize() {
        const buffer = Buffer.alloc(1000)
        this.borshInstructionSchema.encode({...this, variant: 0}, buffer)
        return buffer.slice(0, this.borshInstructionSchema.getSpan(buffer))
    }

}