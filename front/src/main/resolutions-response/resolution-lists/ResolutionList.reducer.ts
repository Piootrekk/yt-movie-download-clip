import {
  TAudioResolution,
  TVideoResolution,
  TBothResolution,
} from "../videoInfo.api";

type TResolutionState = {
  selectedAudio?: TAudioResolution;
  selectedVideo?: TVideoResolution;
  selectedBoth?: TBothResolution;
};

type TResolutionAction =
  | { type: "SELECT_AUDIO"; payload?: TAudioResolution }
  | { type: "SELECT_VIDEO"; payload?: TVideoResolution }
  | { type: "SELECT_BOTH"; payload?: TBothResolution };

const initialResolutionState: TResolutionState = {
  selectedAudio: undefined,
  selectedVideo: undefined,
  selectedBoth: undefined,
};

const resolutionReducer = (
  state: TResolutionState,
  action: TResolutionAction
): TResolutionState => {
  switch (action.type) {
    case "SELECT_AUDIO":
      return {
        selectedAudio:
          state.selectedAudio?.url === action.payload?.url
            ? undefined
            : action.payload,
        selectedVideo: state.selectedBoth ? undefined : state.selectedVideo,
        selectedBoth: undefined,
      };
    case "SELECT_VIDEO":
      return {
        selectedVideo:
          state.selectedVideo?.url === action.payload?.url
            ? undefined
            : action.payload,
        selectedAudio: state.selectedBoth ? undefined : state.selectedAudio,
        selectedBoth: undefined,
      };
    case "SELECT_BOTH":
      return {
        selectedAudio: undefined,
        selectedVideo: undefined,
        selectedBoth:
          state.selectedBoth?.url === action.payload?.url
            ? undefined
            : action.payload,
      };
    default:
      return state;
  }
};

export { resolutionReducer, initialResolutionState };
