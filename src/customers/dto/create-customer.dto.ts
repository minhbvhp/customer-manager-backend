import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Contact } from 'src/customers/entities/customer.entity';
import {
  FULLNAME_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';
import { stringCleaner } from 'src/utils/stringCleaner';

export class CreateCustomerDto {
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
}
