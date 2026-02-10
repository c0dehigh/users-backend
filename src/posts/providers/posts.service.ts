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
     * inject post reposotory
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

    let metaOptions = createPostdto.metaOptions
      ? this.metaOptionsRepository.create({
          metaValue: createPostdto.metaOptions.metaValue,
        })
      : null;

    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }
    // Second create post - destructure to exclude metaOptions
    const { metaOptions: _, ...postData } = createPostdto;
    const post = this.postRepository.create(postData);

    // Add meta options to the post
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postRepository.save(post);
  }

  findAll(userId: string) {
    console.log(`post service userid : ${userId}`);
    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
      },
      {
        user: user,
        id: 2,
        title: 'Post 2',
        content: 'Content 2',
      },
    ];
  }
}
