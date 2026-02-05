import { Module } from '@nestjs/common';
import { MetaOptinsController } from './meta-optins.controller';

@Module({
  controllers: [MetaOptinsController]
})
export class MetaOptinsModule {}
