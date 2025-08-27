import AdministrativeUnit from 'src/addresses/entities/administrativeUnit.entity';
import Customer from 'src/customers/entities/customer.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import Province from './province.entity';

@Entity()
class Ward {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ name: 'name_en' })
  nameEn: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'full_name_en' })
  fullNameEn: string;

  @Column({ name: 'code_name' })
  codeName: string;

  @ManyToOne(() => Province, (province) => province.wards)
  @JoinColumn({ name: 'province_code' })
  province: Province;

  @ManyToOne(
    () => AdministrativeUnit,
    (administrativeUnit) => administrativeUnit.wards,
  )
  @JoinColumn({ name: 'administrative_unit_id' })
  administrativeUnit: AdministrativeUnit;

  @OneToMany(() => Customer, (customer) => customer.ward)
  customers: Customer[];
}

export default Ward;
