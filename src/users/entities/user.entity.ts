import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}

export default User;
