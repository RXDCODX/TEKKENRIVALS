import { useContext } from "react";
import { AudioContext } from "../contexts/AudioContextDefinition";

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
