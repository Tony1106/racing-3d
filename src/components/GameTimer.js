
import {STEP_PER_FRAME} from '../constants'
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
import shallow from 'zustand/shallow'

import useStore from '../store/index'
export default function GameTimer(){
    const barriers = useStore((state) => state.barriers);
    const setBarriers = useStore((state) => state.setBarriers);

    // TODO collition detect
    useFrame(()=>{
      setBarriers(barriers.map(barrier=> {
        barrier.position.z = barrier.position.z+STEP_PER_FRAME;
        return barrier;
      }))
    })
    return null;
  }