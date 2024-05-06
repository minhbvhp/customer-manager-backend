import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class Ward {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  name_en: string;

  @Column()
  full_name: string;

  @Column()
  full_name_en: string;

  @Column()
  code_name: string;
}

export default Ward;
