import React from "react";
import { Canvas} from "react-three-fiber";
import "./style.css";
import { Physics,  usePlane } from "@react-three/cannon";
import useStore from './store/index'
import Controller from './components/Controller'
import Player from './components/Player'
import Plane from './components/Plane'
import GameTimer from './components/GameTimer'
import "./App.css";
import {NUMBER_OF_BARRIER,MIN_VIEW_SIZE ,MAX_VIEW_SIZE } from './constants'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function GameInit(){
  const isPlaying = useStore(state=> state.isPlaying);
  const setBarriers = useStore(state=> state.setBarriers);
  const barrires = []
  if(isPlaying){
    for (let index = 0; index < NUMBER_OF_BARRIER; index++) {
      const x = getRandomArbitrary(-5,5);
      const y = -2.49;
      const z = -index * 10
      barrires.push({position: {x,y,z}})
    }
  }
  setBarriers(barrires)
  return null;
}
const App = () => {
  const isPlaying = useStore((state) => state.isPlaying);
  const startGame = useStore((state) => state.startGame);
  return (
    <>
      <div className={"wrapper"}>
        {!isPlaying ? (
          <button className="startGame" onClick={startGame}>
            {" "}
            Start The Game
          </button>
        ) : null}
        <Canvas colorManagement shadowMap camera={{ position: [0, 4, 10] }} className={!isPlaying && "mask"}>
          <Physics gravity={[0, -10, 0]}>
            {/* This light makes things look pretty */}
            <ambientLight intensity={0.3} />
            {/* <pointLight position={[10, 10, 10]} /> */}
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={1.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <Road />
            {isPlaying && <Barrier />}
            {/* <Box positionZ={-5}></Box> */}
            <Player />
            <Plane />
            {isPlaying ? <GameInit/> : null}
            <Controller/>
            <GameTimer/>
          </Physics>
        </Canvas>
      </div>
    </>
  );
};
function Road(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -2.99, 0], ...props }));
  const roadSize = useStore((state) => state.roadSize);
  return (
    <group>
      <mesh receiveShadow ref={ref}>
        <planeBufferGeometry attach="geometry" args={[roadSize, 100]} />
        <meshStandardMaterial attach="material" color={"red"} />
      </mesh>
    </group>
  );
}




function Barrier(props) {
  const barriers = useStore((state) => state.barriers);
  return barriers.map((barrier) => {
    if (barrier.position.z > MIN_VIEW_SIZE || barrier.position.z <MAX_VIEW_SIZE) return null;
    const {x,y,z } = barrier.position;
    return (
      <Box position={[x,y,z]}/>
    );
  });
}
function Box(props) {
  return  (
    <mesh {...props} castShadow  args={[1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || "orange"} />
    </mesh>
  ) 
}

export default App;

