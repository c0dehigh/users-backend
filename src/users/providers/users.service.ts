import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import type { ConfigType } from '@nestjs/config';

import profileConfig from '../config/profile.config';
import { error } from 'console';

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

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject Data source
     */

    private readonly dataSource: DataSource,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: null | User = null;

    try {
      // Check is user already exists

      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    // Handle exception

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists.', {
        description: 'Duplicate email error',
      });
    }

    // create a new user

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    return newUser;
  }

  /**
   * the method to find all users
   */
  // public findAll(
  //   getUserParamDto: GetUsersParamDto,
  //   limit: number,
  //   page: number,
  // ) {
  //   console.log(this.profileConfiguration);

  //   return [
  //     {
  //       firstName: 'John',
  //       email: 'john@doe.com',
  //     },
  //     {
  //       firstName: 'Alice',
  //       email: 'alice@doe.com',
  //     },
  //   ];
  // }

  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error:
          'This endpoint has been moved permanently. Please use the new endpoint /api/v2/users to access the user data.',
        fileName: 'users.service.ts',
        lineNumber: 123,
      },

      HttpStatus.MOVED_PERMANENTLY,

      {
        description: 'Endpoint moved permanently',
        cause: new Error(),
      },
    );
  }

  /**
   * the method to find a user by id
   */
  public async findOneById(id: number) {
    let user: null | User = null;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request at the moment. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    /**
     * handle user does not exist
     */

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found.`, {
        description: 'User not found error',
      });
    }

    return user;
  }

  public async createMany(createUserDto: CreateUserDto[]) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();
    // Connect Query Runner to datasource
    await queryRunner.connect();
    // Start Transaction
    await queryRunner.startTransaction();
    try {
      for (let user of createUserDto) {
        let newUser = this.usersRepository.create(user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);

        // If successful comit the transaction

        await queryRunner.commitTransaction();
      }
    } catch (error) {
      // If error rollback the transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // Release connection
      await queryRunner.release();
    }
  }
}
