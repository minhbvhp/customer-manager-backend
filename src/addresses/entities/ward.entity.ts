import AdministrativeUnit from 'src/addresses/entities/administrativeUnit.entity';
import District from 'src/addresses/entities/district.entity';
import Customer from 'src/customers/entities/customer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

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

  @ManyToOne(() => District, (district) => district.wards)
  district: District;

  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.wards,
  )
  administrativeUnit: AdministrativeUnit;

  @OneToMany(() => Customer, (customer) => customer.ward)
  customers: Customer[];
}

export default Ward;
