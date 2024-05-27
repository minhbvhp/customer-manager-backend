import { IsNotEmpty, IsString } from 'class-validator';
import {
  FULLNAME_MUST_NOT_EMPTY,
  TAXCODE_MUST_NOT_EMPTY,
  WARDCODE_MUST_NOT_EMPTY,
} from 'src/utils/messageConstants';

export class CreateCustomerDto {
  taxCode: string;

  urn: string;

  @IsNotEmpty({ message: FULLNAME_MUST_NOT_EMPTY })
  fullName: string;

  street: string;

  @IsNotEmpty({ message: WARDCODE_MUST_NOT_EMPTY })
  wardCode: string;
}
