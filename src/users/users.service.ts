import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}
  async findByEmail(email: string) {
    return await this.db.user.findFirst({
      where: {
        email,
      },
    });
  }
  async create(email: string, hash: string, salt: string) {
    return await this.db.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });
  }
}
