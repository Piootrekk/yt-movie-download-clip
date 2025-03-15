import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

enum ClientEnum {
  WEB_EMBEDDED = 'WEB_EMBEDDED',
  TV = 'TV',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
}

const transformToArray = (value: unknown): unknown[] => {
  if (Array.isArray(value)) {
    return value;
  }
  return value ? [value] : [];
};

class MovieQueryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;
}

class MovieQueryCustomClientsDto extends MovieQueryDto {
  @ApiProperty({ enum: ClientEnum, isArray: true, required: false })
  @IsArray()
  @ArrayUnique()
  @IsEnum(ClientEnum, { each: true })
  @IsOptional()
  @Transform(transformToArray)
  clients?: ClientEnum[];
}

class MovieDownloadQueryDto extends MovieQueryDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  itag: number;
}

class MovieDownloadQueryCustomClientDto extends MovieQueryCustomClientsDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  itag: number;
}

export {
  MovieQueryDto,
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieDownloadQueryCustomClientDto,
  ClientEnum,
};
