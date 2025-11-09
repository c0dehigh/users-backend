import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    /**
     * Injecting Posts Service
     */

    private readonly postsService: PostsService,
  ) {}

  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    this.postsService.findAll(userId);
  }
}
