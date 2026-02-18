import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dtos/creates-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject tag repository
     * */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);
    return { deleted: true, id };
  }
}
