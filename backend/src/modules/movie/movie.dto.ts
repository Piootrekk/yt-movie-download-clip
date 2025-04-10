import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
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

class MovieStampDto {
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

class MovieDownloadStampDto extends IntersectionType(
  MovieDownloadQueryDto,
  MovieStampDto,
) {}

class MovieDownloadMergeStreamsDto extends MovieQueryCustomClientsDto {
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

class MovieDownloadStampMergeStreamsDto extends IntersectionType(
  MovieDownloadMergeStreamsDto,
  MovieStampDto,
) {}

class MovieErrorDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  message: string;
}

class FfmpegInfoResposeDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  version: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  path: string;
}

class ValidationResponseDto {
  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isValid: boolean;
}
class FilterVideoRangeDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  start: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  end: string;
}

class FiltersAudioTrackDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  displayName: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;
  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  audioIsDefault: boolean;
}

class DownloadVideoYtDlpDto extends MovieQueryCustomClientsDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  itag: string;
}

class BaseFilterContainerDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  mimeType: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  qualityLabel: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  bitrate: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  audioBitrate: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  itag: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  url: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  lastModified: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  contentLength: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  quality: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  fps: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  projectionType: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  averageBitrate: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  audioQuality: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  approxDurationMs: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  audioSampleRate: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  audioChannels: number;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  hasVideo: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  hasAudio: boolean;

  @ApiProperty({
    type: String,
  })
  @IsString()
  container: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  codecs: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  videoCodec: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  audioCodec: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isLive: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isHLS: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @IsBoolean()
  isDashMPD: boolean;
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  xtags?: string;
  @ApiProperty({
    type: FiltersAudioTrackDto,
    required: false,
  })
  @IsObject()
  @IsOptional()
  @Type(() => FiltersAudioTrackDto)
  audioTrack?: FiltersAudioTrackDto;
}

class FiltersVideoDto extends OmitType(BaseFilterContainerDto, [
  'audioChannels',
  'audioQuality',
  'xtags',
  'audioTrack',
]) {
  @ApiProperty({
    type: FilterVideoRangeDto,
  })
  @IsObject()
  @Type(() => FilterVideoRangeDto)
  initRange: FilterVideoRangeDto;
  @ApiProperty({
    type: FilterVideoRangeDto,
  })
  @IsObject()
  @Type(() => FilterVideoRangeDto)
  indexRange: BaseFilterContainerDto;
}

class FiltersResponseDto {
  @ApiProperty({
    type: BaseFilterContainerDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => BaseFilterContainerDto)
  audio: BaseFilterContainerDto[];

  @ApiProperty({
    type: FiltersVideoDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => FiltersVideoDto)
  video: FiltersVideoDto[];

  @ApiProperty({
    type: BaseFilterContainerDto,
    isArray: true,
  })
  @IsArray()
  @Type(() => BaseFilterContainerDto)
  both: BaseFilterContainerDto[];
}

class ItagsResponseDto {
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  audioItags: number[];
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  videoItags: number[];
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  bothGroupItags: number[];
}

class FiltersResponseV2Dto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  format_id: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  ext: string;
}

export {
  MovieQueryDto,
  MovieQueryCustomClientsDto,
  MovieDownloadQueryDto,
  ClientEnum,
  MovieDownloadStampDto,
  MovieDownloadMergeStreamsDto,
  MovieDownloadStampMergeStreamsDto,
  MovieErrorDto,
  FfmpegInfoResposeDto,
  ValidationResponseDto,
  FiltersResponseDto,
  DownloadVideoYtDlpDto,
  ItagsResponseDto,
  FiltersResponseV2Dto,
};
