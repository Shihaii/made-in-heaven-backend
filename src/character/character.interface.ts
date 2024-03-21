import {Document} from 'mongoose';

export interface Character extends Document{
    readonly name: String,
    readonly img: String,
    readonly description: String,
    readonly ability: String,
    readonly host: String,
    readonly show: Boolean,
}