import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

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
  ) {}

  /**
   * Creating new posts
   */

  public async create(@Body() createPostdto: CreatePostDto) {
    // first create metaOptions

    const post = this.postRepository.create(createPostdto);

    return await this.postRepository.save(post);
  }

  public async findAll(userId: string) {
    const user = this.usersService.findOneById(userId);

    let posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }
}
