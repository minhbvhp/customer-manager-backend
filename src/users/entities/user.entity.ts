import Role from 'src/roles/roles.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryColumn({
    type: 'varchar',
  })
  id: string = crypto.randomUUID();

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}

export default User;
