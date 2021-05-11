import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import useStore from '../store/index'
function useKeyPress(target) {
    const [keyPressed, setKeyPressed] = useState(false);
  
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => (key === target ? setKeyPressed(true) : null);
    const upHandler = ({ key }) => (key === target ? setKeyPressed(false) : null);
  
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return keyPressed;
}

export default React.memo((props)=> {
    const roadSize = useStore((state) => state.roadSize);
    const modelWidth = useStore((state) => state.modelWidth);
    const setJump = useStore((state) => state.setJump);
    const updatePlayerState = useStore((state) => state.updatePlayerState);
    const jump = useKeyPress(" ");
    const left = useKeyPress("ArrowLeft");
    const right = useKeyPress("ArrowRight");
    const forward = useKeyPress("ArrowUp");
    const backward = useKeyPress("ArrowDown");
   
    setJump(jump);
    updatePlayerState((left && 'left') || (right && 'right') || (forward && 'forward') || (backward && 'backward') || null);
    

    return null;
})