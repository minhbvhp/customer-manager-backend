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

  @Column()
  taxCode: string;

  @Column({ nullable: true })
  urn: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  street: string;

  @Column()
  wardCode: string;

  @ManyToOne(() => Ward, (ward) => ward.customers)
  ward: Ward;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Customer;
