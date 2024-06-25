import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  FULLNAME_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';
import { Exclude } from 'class-transformer';
import { Contact } from 'src/customers/entities/customer.entity';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional()
  @IsString()
  taxCode: string;

  @IsOptional()
  @IsString()
  urn: string;

  @IsNotEmpty({ message: FULLNAME_MUST_NOT_EMPTY })
  fullName: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  contacts: Contact[];

  @IsNotEmpty({ message: WARDCODE_MUST_NOT_EMPTY })
  wardCode: string;

  @Exclude()
  deletedAt: Date;
}
