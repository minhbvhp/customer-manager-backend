import Ward from 'src/addresses/entities/ward.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type Contact = {
  name: string;
  phone: string;
};

@Entity()
class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tax_code', nullable: true })
  taxCode: string;

  @Column({ nullable: true })
  urn: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ nullable: true })
  street: string;

  @Column({ type: 'jsonb', nullable: true })
  contacts: Contact[];

  @Column({ name: 'ward_code' })
  wardCode: string;

  @ManyToOne(() => Ward, (ward) => ward.customers)
  @JoinColumn({ name: 'ward_code' })
  ward: Ward;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Customer;
