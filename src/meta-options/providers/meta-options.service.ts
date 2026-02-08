import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/meta-options.dto';

@Injectable()
export class MetaOptionsService {
  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {}
}
