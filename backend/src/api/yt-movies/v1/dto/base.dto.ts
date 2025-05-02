import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClientEnum } from 'src/modules/movie/movie.dto';

const transformToArray = ({
  value,
}: {
  value: string | string[] | undefined;
}): string[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
};

class BaseQueryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;

  @ApiProperty({ enum: ClientEnum, isArray: true, required: false })
  @IsArray()
  @ArrayUnique()
  @IsEnum(ClientEnum, { each: true })
  @IsOptional()
  @Transform(transformToArray)
  clients?: ClientEnum[];
}

export { BaseQueryDto };
