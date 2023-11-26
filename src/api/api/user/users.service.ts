import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';


@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;


  public getUserById(user_id: number): Promise<User> {
    return this.repository.findOneBy({user_id});
  }

  public getUserByUsername(username: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { username },
    });
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    const salt = await bcrypt.genSalt();

    user.username = body.username;
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, salt);

    return this.repository.save(user);
  }
}
