import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { useRef } from "react";

export function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0.2, 2.6];
      if (isMobile) targetPosition = [-0.15, 0.7, 5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}
