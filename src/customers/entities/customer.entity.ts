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

  @Column({ nullable: true })
  street: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Ward, (ward) => ward.customers)
  ward: Ward;
}

export default Customer;
