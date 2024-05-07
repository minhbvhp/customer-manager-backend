import AdministrativeUnit from 'src/addresses/entities/administrativeUnit.entity';
import Province from 'src/addresses/entities/province.entity';
import Ward from 'src/addresses/entities/ward.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
class District {
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

  @ManyToOne(() => Province, (province) => province.districts)
  province: Province;

  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.districts,
  )
  administrativeUnit: AdministrativeUnit;

  @OneToMany(() => Ward, (ward) => ward.district, { eager: true })
  wards: Ward[];
}

export default District;
