import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  FULLNAME_MUST_NOT_EMPTY,
  TAXCODE_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';
import { Exclude } from 'class-transformer';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  taxCode: string;

  urn: string;

  @IsNotEmpty({ message: FULLNAME_MUST_NOT_EMPTY })
  fullName: string;

  street: string;

  @IsNotEmpty({ message: WARDCODE_MUST_NOT_EMPTY })
  wardCode: string;

  @Exclude()
  deletedAt: Date;
}
