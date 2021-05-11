import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import useStore from '../store/index'
import {  useCylinder } from "@react-three/cannon";
import Beetle from './Beetle'
import { useFrame } from "react-three-fiber";
export default React.memo((props) => {
    // This reference will give us direct access to the THREE.Mesh object
    // const mesh = useRef();
    const isJump = useStore((state) => state.isJump);
  console.log(isJump,'isJump');
    const playerPosition = useStore((state) => state.playerPosition);
    const playerState = useStore((state) => state.playerState);
    const roadSize = useStore((state) => state.playerState);
    const modelWidth = useStore((state) => state.playerState);
    console.log(playerState, 'playerState');
    const {x,y,z } = playerPosition
    console.log(x,y,z,'aa');
    const [ref, api] = useCylinder(() => ({ mass: 1, ...props }));
    useCallback(()=> {
        api.rotation.set(0, 3, 0);
    }, [])
    // useCallback(()=> {
    // }, [x])
    console.log(isJump, 'as');
    // useCallback(()=> {
    //     if(isJump) api.velocity.set(0,1,0)
    // }, [isJump])
    
    useFrame(()=>{
        const currentPosition = ref.current.position;
        if(!currentPosition) return;
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
  
    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh {...props} castShadow ref={ref} color="red">
        {/* <Model modelPath={modelPath} /> */}
        <Beetle />
      </mesh>
    );
  });