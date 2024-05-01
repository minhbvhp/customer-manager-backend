import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Role from 'src/roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  // controllers: [UsersController],
  // providers: [UsersService],
})
export class RolesModule {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const adminRoles = {
      role: 'admin',
      description: 'Administrator',
    };

    const userRoles = {
      role: 'user',
      description: 'Normal user',
    };

    await this.roleRepository.save([adminRoles, userRoles]);
  }
}
