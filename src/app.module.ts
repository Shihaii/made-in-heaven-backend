import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterService } from './character/character.service';
import { CharacterController } from './character/character.controller';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.yj5q47h.mongodb.net/Made-in-Heaven?retryWrites=true&w=majority&appName=Cluster0'),
    CharacterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
