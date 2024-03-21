import { Body,HttpStatus, Put, Delete, Param, Get, Controller, Post, Res, NotFoundException, Query } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDTO } from './create-character.dto';

@Controller('character')
export class CharacterController {
    constructor(private characterService: CharacterService){}

    @Post('/create')
    async addCharacter(@Res() res, @Body() CreateCharacterDTO: CreateCharacterDTO){
        const character = await this.characterService.addCharacter(CreateCharacterDTO);
        return res.status(HttpStatus.OK).json({
            message:"Character has been created succesfully",
            character
        })
    }

    @Get('/characters')
    async getAllCharacter(@Res() res){
        const characters = await this.characterService.getAllCharacters();
        return res.status(HttpStatus.OK).json(characters)
    }

    @Get('/:characterID')
    async getCharacter(@Res() res, @Param('characterID') characterID) {
        const character = await this.characterService.getCharacter(characterID);
        if(!character) throw new NotFoundException('Character does not exist');
        return res.status(HttpStatus.OK).json(character);
    }

    @Put('/update')
    async updateStudent(@Res() res, @Query('characterID') characterID, @Body() CreateCharacterDTO: CreateCharacterDTO) {
        const character = await this.characterService.updateCharacter(characterID, CreateCharacterDTO);
        if(!character) throw new NotFoundException('Character does not exist');
        return res.status(HttpStatus.OK).json({
            message:'Character has been successfully updated',
            character
        });
    }

    @Delete('/delete')
    async deleteCharacter(@Res() res, @Query('characterID') characterID){
        const character = await this.characterService.deleteCharacter(characterID);
        if(!character) throw new NotFoundException('Character does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Character has been deleted',
            character
        })
    }
}
