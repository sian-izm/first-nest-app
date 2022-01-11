import { IsString, IsInt, IsIn } from 'class-validator'

export class CreateCatDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
