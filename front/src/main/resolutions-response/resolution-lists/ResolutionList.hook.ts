import { useReducer } from "react";
import {
  TAudioResolution,
  TVideoResolution,
  TBothResolution,
} from "../videoInfo.api";
import {
  resolutionReducer,
  initialResolutionState,
} from "./ResolutionList.reducer";

const useResolutionSelector = (
  audio: TAudioResolution[],
  video: TVideoResolution[],
  both: TBothResolution[]
) => {
  const [state, dispatch] = useReducer(
    resolutionReducer,
    initialResolutionState
  );

  const handleSelectedAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const found = audio.find((a) => a.url === e.target.value);
    dispatch({ type: "SELECT_AUDIO", payload: found });
  };

  const handleSelectedVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const found = video.find((v) => v.url === e.target.value);
    dispatch({ type: "SELECT_VIDEO", payload: found });
  };

  const handleSelectedBoth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const found = both.find((b) => b.url === e.target.value);
    dispatch({ type: "SELECT_BOTH", payload: found });
  };

  return {
    ...state,
    handleSelectedAudio,
    handleSelectedVideo,
    handleSelectedBoth,
  };
};

export { useResolutionSelector };
