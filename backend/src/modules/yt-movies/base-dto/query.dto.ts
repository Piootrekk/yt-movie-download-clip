import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClientEnum } from 'src/core/download-manager/types/ytdl-core.enum';

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

type TBaseQueryDto = InstanceType<typeof BaseQueryDto>;

export { BaseQueryDto };
export type { TBaseQueryDto };
