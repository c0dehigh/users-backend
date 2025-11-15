import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'this is title for blog post',
    example: 'this is title',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    enum: postType,
    description: "possible values , 'post' , 'page' , 'story', 'series'  ",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'this is slug for blog post',
    example: 'this-is-slug',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;
  @ApiProperty({
    enum: postStatus,
    description:
      "possible values , 'draft' , 'scheduled' , 'review', 'published'  ",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;
  @ApiPropertyOptional({
    description: 'this is content for blog post',
    example: 'this is content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Feature image for your blog post',
    example: 'http://localhost.com/img/image1.png',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;
  @ApiPropertyOptional({
    description: 'Timestamp of when the post will be published',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Tags for your blog post',
    example: ['nestjs', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];
  @ApiPropertyOptional({
    description: 'Meta options for your blog post',
    example: [{ key: 'testKey', value: 20 }],
    type: 'array',
    readOnly: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'this is key for meta option',
          example: 'testKey',
        },
        value: {
          type: 'any',
          description: 'this is value for meta option',
          example: 20,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions: CreatePostMetaOptionsDto[];
}
