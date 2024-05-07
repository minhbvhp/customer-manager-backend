import Ward from 'src/addresses/entities/ward.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  taxCode: string;

  @Column({ nullable: true })
  urn: string;

  @Column()
  fullName: string;

  @Column()
  street: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Ward, (ward) => ward.customers, { eager: true })
  ward: Ward;
}

export default Customer;
