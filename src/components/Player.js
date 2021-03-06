import React, {  useCallback } from "react";
import useStore from '../store/index'
import {  useCylinder } from "@react-three/cannon";
import Beetle from './Beetle'
import { useFrame } from "react-three-fiber";
import shallow from 'zustand/shallow'
export default React.memo((props) => {
    const isJump = useStore((state) => state.isJump);
    const playerState = useStore((state) => state.playerState);
    const updatePlayerPosition = useStore((state) => state.updatePlayerPosition, shallow);
    const roadSize = useStore((state) => state.playerState);
    const modelWidth = useStore((state) => state.playerState);
    const [ref, api] = useCylinder(() => ({ mass: 1, ...props }));
    useCallback(()=> {
        api.rotation.set(0, 3, 0);
    }, [])
    
    useFrame(()=>{
        const currentPosition = ref.current.position;
        if(!currentPosition) return;
        updatePlayerPosition(currentPosition);
        let {x,y,z} = currentPosition;
        // if(playerState =='left') api.position.set(x + 0.1, y,z)
        const DIRECTION = {
            left: () => {
              if (!(x < -(roadSize / 2 - modelWidth))) x -= 0.1;
            },
            right: () => {
              if (!(x > roadSize / 2 - modelWidth)) x += 0.1;
            },
            forward: () => (z -= 0.1),
            backward: () => (z += 0.1),
          };
          const fn = DIRECTION[playerState];
          if(isJump && y<-2.2)  api.velocity.set(0,5,0)
          if(playerState && fn) {
              fn()
              api.position.set(x,y,z)
            }

    })
  
    return (
      <mesh {...props} castShadow ref={ref} color="red">
        {/* <Model modelPath={modelPath} /> */}
        <Beetle />
      </mesh>
    );
  });