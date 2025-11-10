import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting User Service
     */
    private readonly usersService: UsersService,
  ) {}

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
