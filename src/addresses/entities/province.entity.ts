import AdministrativeRegion from 'src/addresses/entities/administrativeRegion.entity';
import AdministrativeUnit from 'src/addresses/entities/administrativeUnit.entity';
import District from 'src/addresses/entities/district.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
class Province {
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

  @ManyToOne(
    () => AdministrativeRegion,
    (administrativeRegion) => administrativeRegion.provinces,
  )
  administrativeRegion: AdministrativeRegion;

  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.provinces,
  )
  administrativeUnit: AdministrativeUnit;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];
}

export default Province;
