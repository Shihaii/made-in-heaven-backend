import {Module} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {CharacterSchema} from './character.schema'

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Character', schema: CharacterSchema}])
    ],
  providers: [CharacterService],
  controllers: [CharacterController]
})
export class CharacterModule {}