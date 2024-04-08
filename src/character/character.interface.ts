import {Document} from 'mongoose';

export interface Character extends Document{
    readonly name: String,
     img: Buffer | Blob,
    readonly description: String,
    readonly ability: String,
    readonly host: String,
    readonly show: Boolean,
}