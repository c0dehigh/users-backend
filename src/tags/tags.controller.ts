import { Body, Controller, Post } from '@nestjs/common';
import { CreateTagDto } from './dtos/creates-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(
    /**
     * Inject tag service
     */
    private readonly tagService: TagsService,
  ) {}

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }
}
