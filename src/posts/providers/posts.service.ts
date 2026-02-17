import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from '../../tags/providers/tags.service';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting User Service
     */
    private readonly usersService: UsersService,

    /**
     * inject post repository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /**
     * inject metaOptions repository
     */

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
    /**
     * Inject tags service
     */

    private readonly tagsService: TagsService,
  ) {}

  /**
   * Creating new posts
   */

  public async create(@Body() createPostDto: CreatePostDto) {
    // find author from a database on authorId
    let author = await this.usersService.findOneById(createPostDto.authorId);

    if (author && createPostDto.tags) {
      // find tags
      let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

      const post = this.postRepository.create({
        ...createPostDto,
        author: author,
        tags: tags,
      });

      return await this.postRepository.save(post);
    }
  }

  public async findAll(userId: string) {
    return await this.postRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
