import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

enum ClientEnum {
  WEB_EMBEDDED = 'WEB_EMBEDDED',
  TV = 'TV',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
}

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

class MovieDownloadQueryDto extends MovieQueryCustomClientsDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Type(() => Number)
  itag: number;
}

class MovieDownloadStampDto extends MovieDownloadQueryDto {
  @ApiProperty({
    type: String,
    description: 'Time format must be HH:MM:SS.mmm',
    default: '00:00:00.000',
  })
  @Matches(/^([0-9]{2}):([0-5][0-9]):([0-5][0-9])\.(\d{3})$/, {
    message: 'Time format must be HH:MM:SS.mmm',
  })
  start: string;

  @ApiProperty({
    type: Number,
    description: 'Duration should be provided in seconds',
  })
  @IsNumber()
  @Min(0.001)
  @Type(() => Number)
  duration: number;
}

class MovieDownloadBothStreamDto extends MovieQueryCustomClientsDto {
  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Type(() => Number)
  videoItag: number;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @Type(() => Number)
  audioItag: number;
}

export {
  MovieQueryDto,
  MovieQueryCustomClientsDto,
  MovieDownloadQueryDto,
  ClientEnum,
  MovieDownloadStampDto,
  MovieDownloadBothStreamDto,
};
