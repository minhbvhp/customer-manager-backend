import Province from 'src/addresses/entities/province.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => Province, (province) => province.administrativeRegion)
  provinces: Province[];
}

export default AdministrativeRegion;
