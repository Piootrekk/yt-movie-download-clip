import { videoFormat } from '@distube/ytdl-core';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

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

class FilterVideoRangeDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  start?: string;
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  end?: string;
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

// TODO fix types in ytdl.d.ts
type TFiltersResponse = {
  video: videoFormat[];
  audio: videoFormat[];
  both: videoFormat[];
};

export { FiltersResponseDto, BaseFilterContainerDto, FiltersVideoDto };
export type { TFiltersResponse };
