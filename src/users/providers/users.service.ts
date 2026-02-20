import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

/**
 * Class that handles the business logic for the users
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Injecting Config Service
     *
     */
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check is user already exists

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle exception
    // create a new user

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * the method to find all users
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const enviroment = this.configService.get<string>('S3_BUCKET');
    console.log(enviroment);

    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }

  /**
   * the method to find a user by id
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
