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

const filters = {
  mimeType: 'video/mp4; codecs="avc1.42001E, mp4a.40.2"',
  qualityLabel: '360p',
  bitrate: 202883,
  audioBitrate: 96,
  itag: 18,
  url: 'https://rr4---sn-u2oxu-ajwz.googlevideo.com/videoplayback?expire=1748115327&ei=H8sxaMGVE8ym6dsPp_LLuAY&ip=83.4.62.62&id=o-ALWr4TcWsaQaArBWGl5mBI5Nuw-M0x7_OB76VHHnop4C&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1748093727%2C&mh=tm&mm=31%2C29&mn=sn-u2oxu-ajwz%2Csn-u2oxu-f5fek&ms=au%2Crdu&mv=m&mvi=4&pl=24&rms=au%2Cau&initcwndbps=1235000&bui=AecWEAZ5Z99xBHA6_eH75BTqwS6dn81Fakk0UDhAEdf4rcZlDz3IAXjHR1-QwZu4Gl3RJ0qRItushBIX&spc=wk1kZn3E11fArJxSCU0L-gdb6TLBzzp3P0jcJSyjZSBv_4aO35K8vLQn5TOpTeS8oG6m_jxWWQ&vprv=1&svpuc=1&mime=video%2Fmp4&ns=IAM4vLZWTXvTj65r88YWMlwQ&rqh=1&gir=yes&clen=17092074&ratebypass=yes&dur=674.028&lmt=1744413109990720&mt=1748093351&fvip=3&c=WEB_EMBEDDED_PLAYER&sefc=1&txp=5538534&n=lzOAhYE8OXBdyQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgDMn9AzGoteUmyEuHKbwAxzMYDuhlGro4jYnSNxqsokgCIDQEz8tLe2_MZe69xc9vMa2Xj11DiKjPzWdT1TOaOfnr&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACuhMU0wRAIgEAM8I7BBIR7m8elnBxAqjO_YjgylQ2VtXuF8tqogF6kCIArvbE3i5_48fqudcOpr7DCVf7TJlC1PZeBDUk_KUkVy',
  width: 640,
  height: 360,
  lastModified: '1744413109990720',
  contentLength: '17092074',
  quality: 'medium',
  fps: 30,
  projectionType: 'RECTANGULAR',
  averageBitrate: 202864,
  audioQuality: 'AUDIO_QUALITY_LOW',
  approxDurationMs: '674028',
  audioSampleRate: '44100',
  audioChannels: 2,
  qualityOrdinal: 'QUALITY_ORDINAL_360P',
  hasVideo: true,
  hasAudio: true,
  container: 'mp4',
  codecs: 'avc1.42001E, mp4a.40.2',
  videoCodec: 'avc1.42001E',
  audioCodec: 'mp4a.40.2',
  isLive: false,
  isHLS: false,
  isDashMPD: false,
};

const ytSteamAllMock = {
  url: 'https://www.youtube.com/watch?v=_l5Q5kKHtR8',
  chunkSize: 1024,
  filters: filters,
};

const ytStreamTrimmedMock = {
  url: 'https://www.youtube.com/watch?v=_l5Q5kKHtR8',
  chunkSize: 1024,
  filters: filters,
  start: '00:00:10.000',
  duration: 10,
};

const ytStreamMergedMock = {
  url: 'https://www.youtube.com/watch?v=_l5Q5kKHtR8',
  chunkSize: 1024,
  videoFilters: {
    mimeType: 'video/mp4; codecs="avc1.640028"',
    qualityLabel: '1080p',
    bitrate: 1289899,
    audioBitrate: null,
    itag: 137,
    url: 'https://rr4---sn-u2oxu-ajwz.googlevideo.com/videoplayback?expire=1748115327&ei=H8sxaMGVE8ym6dsPp_LLuAY&ip=83.4.62.62&id=o-ALWr4TcWsaQaArBWGl5mBI5Nuw-M0x7_OB76VHHnop4C&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1748093727%2C&mh=tm&mm=31%2C29&mn=sn-u2oxu-ajwz%2Csn-u2oxu-f5fek&ms=au%2Crdu&mv=m&mvi=4&pl=24&rms=au%2Cau&initcwndbps=1235000&bui=AecWEAanlOmp2LsNj0fgFG3gYVDyYk80HgP_TSO1Qmegjfp-Frz5YdSp6fuaneaybUr8dZqhPFEIENV6&spc=wk1kZn3H11fArJxSCU0L-gdb6TLBzzp3P0jcJSyjZSBv_4aO35K8vLQn5TOpd-TEpnylnjw&vprv=1&svpuc=1&mime=video%2Fmp4&ns=2vogIpOkerJHik48vnnsJB0Q&rqh=1&gir=yes&clen=15755427&dur=673.966&lmt=1744413884296112&mt=1748093351&fvip=3&keepalive=yes&c=WEB_EMBEDDED_PLAYER&sefc=1&txp=5535534&n=y3UNXPDE24m24g&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAM6eQ7Zsyz5uTz7e8uyB-HcpT2Pc83Jzsiwea91B-v7xAiBJx6O5mFrqNDhJjl6hGwzusXG2Q51e70BdDLwHGEt1mg%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACuhMU0wRAIgEAM8I7BBIR7m8elnBxAqjO_YjgylQ2VtXuF8tqogF6kCIArvbE3i5_48fqudcOpr7DCVf7TJlC1PZeBDUk_KUkVy',
    width: 1920,
    height: 1080,
    initRange: {
      start: '0',
      end: '741',
    },
    indexRange: {
      start: '742',
      end: '2129',
    },
    lastModified: '1744413884296112',
    contentLength: '15755427',
    quality: 'hd1080',
    fps: 30,
    projectionType: 'RECTANGULAR',
    averageBitrate: 187017,
    approxDurationMs: '673966',
    qualityOrdinal: 'QUALITY_ORDINAL_1080P',
    hasVideo: true,
    hasAudio: false,
    container: 'mp4',
    codecs: 'avc1.640028',
    videoCodec: 'avc1.640028',
    audioCodec: null,
    isLive: false,
    isHLS: false,
    isDashMPD: false,
  },
  audioFilters: {
    mimeType: 'audio/mp4; codecs="mp4a.40.2"',
    qualityLabel: null,
    bitrate: 130992,
    audioBitrate: 128,
    itag: 140,
    url: 'https://rr4---sn-u2oxu-ajwz.googlevideo.com/videoplayback?expire=1748115327&ei=H8sxaMGVE8ym6dsPp_LLuAY&ip=83.4.62.62&id=o-ALWr4TcWsaQaArBWGl5mBI5Nuw-M0x7_OB76VHHnop4C&itag=140&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1748093727%2C&mh=tm&mm=31%2C29&mn=sn-u2oxu-ajwz%2Csn-u2oxu-f5fek&ms=au%2Crdu&mv=m&mvi=4&pl=24&rms=au%2Cau&initcwndbps=1235000&bui=AecWEAanlOmp2LsNj0fgFG3gYVDyYk80HgP_TSO1Qmegjfp-Frz5YdSp6fuaneaybUr8dZqhPFEIENV6&spc=wk1kZn3H11fArJxSCU0L-gdb6TLBzzp3P0jcJSyjZSBv_4aO35K8vLQn5TOpd-TEpnylnjw&vprv=1&svpuc=1&xtags=acont%3Doriginal%3Alang%3Den-US&mime=audio%2Fmp4&ns=2vogIpOkerJHik48vnnsJB0Q&rqh=1&gir=yes&clen=10909556&dur=674.028&lmt=1744171071477872&mt=1748093351&fvip=3&keepalive=yes&c=WEB_EMBEDDED_PLAYER&sefc=1&txp=6308224&n=y3UNXPDE24m24g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgb2ve4BQfIRqy2OBkn__bkvCKn0aCrKD6tL2HEvev1moCIA3kxx_s5QoW53OT2-9lMLiBBTX24Ne4IYDxm7Tx585j&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=ACuhMU0wRAIgEAM8I7BBIR7m8elnBxAqjO_YjgylQ2VtXuF8tqogF6kCIArvbE3i5_48fqudcOpr7DCVf7TJlC1PZeBDUk_KUkVy',
    initRange: {
      start: '0',
      end: '722',
    },
    indexRange: {
      start: '723',
      end: '1570',
    },
    lastModified: '1744171071477872',
    contentLength: '10909556',
    quality: 'tiny',
    xtags: 'ChEKBWFjb250EghvcmlnaW5hbAoNCgRsYW5nEgVlbi1VUw',
    projectionType: 'RECTANGULAR',
    audioTrack: {
      displayName: 'English (United States) original',
      id: 'en-US.4',
      audioIsDefault: true,
    },
    averageBitrate: 129484,
    highReplication: true,
    audioQuality: 'AUDIO_QUALITY_MEDIUM',
    approxDurationMs: '674028',
    audioSampleRate: '44100',
    audioChannels: 2,
    loudnessDb: -0.77999973,
    qualityOrdinal: 'QUALITY_ORDINAL_UNKNOWN',
    hasVideo: false,
    hasAudio: true,
    container: 'mp4',
    codecs: 'mp4a.40.2',
    videoCodec: null,
    audioCodec: 'mp4a.40.2',
    isLive: false,
    isHLS: false,
    isDashMPD: false,
  },
  start: '00:00:10.000',
  duration: 10,
};

export {
  FILTERS_TIMEOUT,
  STREAM_TIMEOUT,
  ytMoviesInfoMocks,
  ytSteamAllMock,
  ytStreamTrimmedMock,
  ytStreamMergedMock,
};
