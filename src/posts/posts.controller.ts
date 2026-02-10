import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post-dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(
    /**
     * Injecting Posts Service
     */

    private readonly postsService: PostsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
  })
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
  })
  @Patch()
  updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(`update post dto : ${patchPostDto}`);
  }
}
