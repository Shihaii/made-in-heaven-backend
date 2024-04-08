import {
  Body,
  HttpStatus,
  Put,
  Delete,
  Param,
  Get,
  Controller,
  Post,
  Res,
  NotFoundException,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDTO } from './create-character.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('img'))
  async addCharacter(
    @Res() res,
    @Body() CreateCharacterDTO: CreateCharacterDTO,
    @UploadedFile() img: Express.Multer.File,
  ) {
    console.log('img', img);
    console.log('CreateCharacterDTO ', CreateCharacterDTO);
    CreateCharacterDTO.img = img.buffer;
    const character =
      await this.characterService.addCharacter(CreateCharacterDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Character has been created succesfully',
      character,
    });
  }

  @Get('/characters')
  async getAllCharacter(@Res() res) {
    const characters = await this.characterService.getAllCharacters();
    for (let i = 0; i < characters.length; i++) {
      characters[i].img = new Blob([characters[i].img], { type: 'image/png' });
    }
    return res.status(HttpStatus.OK).json(characters);
  }

  @Get('/:characterID')
  async getCharacter(@Res() res, @Param('characterID') characterID) {
    const character = await this.characterService.getCharacter(characterID);
    if (!character) throw new NotFoundException('Character does not exist');
    return res.status(HttpStatus.OK).json(character);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('img'))
  async updateCharacter(
    @Res() res,
    @Query('characterID') characterID,
    @Body() CreateCharacterDTO: CreateCharacterDTO,
    @UploadedFile() img: Express.Multer.File,
  ) {
    console.log('update', CreateCharacterDTO.name);
    console.log('img', img);
    const character1 = await this.characterService.getCharacter(characterID);
    if (img !== undefined) CreateCharacterDTO.img = img.buffer;
    else {
      CreateCharacterDTO.img = character1.img;
    }
    const character = await this.characterService.updateCharacter(
      characterID,
      CreateCharacterDTO,
    );
    if (!character) throw new NotFoundException('Character does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Character has been successfully updated',
      character,
    });
  }

  @Put('/updatewithoutimg')
  async updateCharacterWithoutImg(
    @Res() res,
    @Query('characterID') characterID,
    @Body() CreateCharacterDTO: CreateCharacterDTO,
  ) {
    console.log('updatewithoutimg', CreateCharacterDTO.name);
    //const character1 = await this.characterService.getCharacter(characterID);
    //CreateCharacterDTO.img = character1.img;
    console.log('updatewithoutimg', CreateCharacterDTO);
    const character = await this.characterService.updateCharacter(
      characterID,
      CreateCharacterDTO,
    );
    if (!character) throw new NotFoundException('Character does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Character has been successfully updated',
      character,
    });
  }

  @Delete('/delete')
  async deleteCharacter(@Res() res, @Query('characterID') characterID) {
    const character = await this.characterService.deleteCharacter(characterID);
    if (!character) throw new NotFoundException('Character does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Character has been deleted',
      character,
    });
  }
}
