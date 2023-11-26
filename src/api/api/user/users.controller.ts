import { Body,Query, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import {} from "pg";

@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get('/:user_id')
  public getUserById(@Param('user_id', ParseIntPipe) user_id: number): Promise<User> {
    return this.service.getUserById(user_id);
  }
  @Get()
  public getUserByUserName(@Query() queryParams: any): Promise<User>  {
    return this.service.getUserByUsername(queryParams.username);
  }
  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
