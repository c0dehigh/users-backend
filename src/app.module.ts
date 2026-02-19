import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptinsModule } from './meta-options/meta-optins.module';
import { MetaOptionsService } from './meta-options/providers/meta-options.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // entities: [User],
      autoLoadEntities: true,
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
