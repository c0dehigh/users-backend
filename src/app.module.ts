import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptinsModule } from './meta-optins/meta-optins.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User],
      synchronize: true,
      port: 5432,
      username: 'postgres',
      password: '1234',
      host: 'localhost',
      database: 'nestjs-blog',
    }),
    TagsModule,
    MetaOptinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
