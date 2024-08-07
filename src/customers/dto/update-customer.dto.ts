import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  FULLNAME_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';
import { Exclude, Transform } from 'class-transformer';
import { Contact } from 'src/customers/entities/customer.entity';
import { stringCleaner } from 'src/utils/stringCleaner';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return stringCleaner(value);
  })
  taxCode: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return stringCleaner(value);
  })
  urn: string;

  @IsNotEmpty({ message: FULLNAME_MUST_NOT_EMPTY })
  @Transform(({ value }) => {
    return stringCleaner(value);
  })
  fullName: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    return stringCleaner(value);
  })
  street: string;

  @IsOptional()
  contacts: Contact[];

  @IsNotEmpty({ message: WARDCODE_MUST_NOT_EMPTY })
  wardCode: string;

  @Exclude()
  deletedAt: Date;
}
