import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class AdministrativeUnit {
  @PrimaryColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  full_name_en: string;

  @Column()
  short_name: string;

  @Column()
  short_name_en: string;

  @Column()
  code_name: string;

  @Column()
  code_name_en: string;
}

export default AdministrativeUnit;
