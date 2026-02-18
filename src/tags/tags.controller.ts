import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Delete()
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return await this.tagService.delete(id);
  }
}
