const url = 'https://www.youtube.com/watch?v=_l5Q5kKHtR8';
const invalidUrl = 'https://hltv.org';
const formatsResponse = ['video', 'audio', 'both'];
const clientsCase1 = ['TV', 'IOS', 'ANDROID'];
const filtersCase1 = ['itag', 'audioCodec', 'videoCodec', 'container'];
const filtersCase2 = ['mimeType', 'url'];
const ytMoviesMocks = {
  url,
  invalidUrl,
  formatsResponse,
  clientsCase1,
  filtersCase1,
  filtersCase2,
};

export { ytMoviesMocks };
