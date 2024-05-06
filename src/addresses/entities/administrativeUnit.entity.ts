import District from 'src/addresses/entities/district.entity';
import Province from 'src/addresses/entities/province.entity';
import Ward from 'src/addresses/entities/ward.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @OneToMany(() => Province, (province) => province.administrativeUnit)
  provinces: Province[];

  @OneToMany(() => District, (district) => district.administrativeUnit)
  districts: District[];

  @OneToMany(() => Ward, (ward) => ward.administrativeUnit)
  wards: Ward[];
}

export default AdministrativeUnit;
