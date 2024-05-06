import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class AdministrativeRegion {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_en: string;

  @Column()
  code_name: string;

  @Column()
  code_name_en: string;
}

export default AdministrativeRegion;
