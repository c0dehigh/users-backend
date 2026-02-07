import { Module } from '@nestjs/common';
import { MetaOptinsController } from './meta-optins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';

@Module({
  controllers: [MetaOptinsController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptinsModule {}
