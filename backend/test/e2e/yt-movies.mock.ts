const FILTERS_TIMEOUT = 15000;
const STREAM_TIMEOUT = 30000;

const url = 'https://www.youtube.com/watch?v=_l5Q5kKHtR8';
const invalidUrl = 'https://hltv.org';
const formatsResponse = ['video', 'audio', 'both'];
const clientsCase1 = ['TV', 'IOS', 'ANDROID'];
const filtersCase1 = ['itag', 'audioCodec', 'videoCodec', 'container'];
const ytMoviesInfoMocks = {
  url,
  invalidUrl,
  formatsResponse,
  clientsCase1,
  filtersCase1,
};

const ytSteamAllMock = {
  url: 'https://www.youtube.com/watch?v=_l5Q5kKHtR8',
  chunkSize: 1024,
};

const ytStreamTrimmedMock = {
  url: 'https://www.youtube.com/watch?v=_l5Q5kKHtR8',
  chunkSize: 1024,
  start: '00:00:10.000',
  duration: 10,
};

const selectedItagMergeMock = {
  videoItag: 137,
  audioItag: 140,
};

export {
  FILTERS_TIMEOUT,
  STREAM_TIMEOUT,
  ytMoviesInfoMocks,
  ytSteamAllMock,
  ytStreamTrimmedMock,
  selectedItagMergeMock,
};
