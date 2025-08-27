import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
class AdministrativeRegion {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'code_name' })
  codeName: string;

  @Column({ name: 'code_name_en' })
  codeNameEn: string;
}

export default AdministrativeRegion;
