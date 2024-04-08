import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './character.interface';
import { CreateCharacterDTO } from './create-character.dto';

@Injectable()
export class CharacterService {
    constructor(@InjectModel('Character') private readonly characterModel: Model<Character>) { }

    async getAllCharacters(): Promise<Character[]> {
        const characters = await this.characterModel.find().exec();
        return characters;
    }
    async getCharacter(characterID): Promise<Character> {
        const character = await this.characterModel.findById(characterID).exec();
        return character;
    }
    async addCharacter(CreateCharacterDTO: CreateCharacterDTO): Promise<Character>{
        const newCharacter = await new this.characterModel(CreateCharacterDTO);
        newCharacter.img
        return newCharacter.save();
    }
    async updateCharacter(characterID, CreateCharacterDTO: CreateCharacterDTO): Promise<Character> {
        const updateCharacter = await this.characterModel.findByIdAndUpdate(characterID, CreateCharacterDTO, {new: true});
        return updateCharacter;
    }
    async deleteCharacter(characterID): Promise<any> {
        const deletedCharacter = await this.characterModel.findByIdAndDelete(characterID);
        return deletedCharacter;
    }
}
