import React, { useRef, useState, useEffect, useMemo } from "react";
//R3F
import { Canvas, useFrame, useThree, useLoader } from "react-three-fiber";
// Deai - R3F
import "./style.css";
import "antd/dist/antd.css";
import { Slider, Switch } from "antd";
import { Mesh } from "three";
import { a } from "@react-spring/three";
import { Physics, useBox, usePlane, useRaycastVehicle, useCylinder } from "@react-three/cannon";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import modelPath from "./assets/greymon.obj";
import Beetle from "./components/Beetle";
import useStore from './store/index'
import Controller from './components/Controller'
import Player from './components/Player'
import Plane from './components/Plane'
import GameTimer from './components/GameTimer'
import "./App.css";
import {NUMBER_OF_BARRIER,MIN_VIEW_SIZE ,MAX_VIEW_SIZE } from './constants'


//Components

// Styles
// import "./App.scss";
// React Spring
const CamaraPosition = (props) => {
  const updatePosition = (position) => (value) => {
    let cameraPosition = props.cameraPosition;
    cameraPosition[position] = value;

    props.setCameraPosition(cameraPosition);
  };
  return (
    <>
      <Slider defaultValue={0} onChange={updatePosition(0)} />
      <Slider defaultValue={0} onChange={updatePosition(1)} />
      <Slider defaultValue={10} onChange={updatePosition(2)} />{" "}
    </>
  );
};
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
      const y = 0;
      const z = -index * 10
      barrires.push({position: {x,y,z}})
    }
  }
  console.log(barrires,'barrires');
  setBarriers(barrires)
  return null;
}
const App = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 4, 10]);
  const ref = useRef();
  const onUpdateCameraPosition = (value) => {
    setCameraPosition(value);
  };
  const handleKeyPress = (event) => {
    const keyCode = event.which;
    console.log(keyCode, "keyCode");
  };
  const isPlaying = useStore((state) => state.isPlaying);
  const startGame = useStore((state) => state.startGame);
  return (
    <>
      {/* Our Scene & Camera is already built into our canvas */}
      {/* <PerspectiveCameraProps cameraPosition={cameraPosition} setCameraPosition={onUpdateCameraPosition} /> */}
      <div className={"wrapper"}>
        {!isPlaying ? (
          <button className="startGame" onClick={startGame}>
            {" "}
            Start The Game
          </button>
        ) : null}
        <Canvas colorManagement shadowMap camera={{ position: cameraPosition }} className={!isPlaying && "mask"}>
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
            <CollisionDetect/>
            <GameInit/>
            <Controller/>
            <GameTimer/>
          </Physics>
        </Canvas>
      </div>
    </>
  );
};
function CollisionDetect(){
  return null
}
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

const Model = ({ modelPath, material }) => {
  const [obj, setObj] = useState();
  console.log(obj, "obj");
  useMemo(() => new OBJLoader().load(modelPath, setObj), [modelPath]);
  if (obj) {
    obj.castShadow = true;
    obj.traverse((children) => {
      if (children instanceof Mesh) {
        children.castShadow = true;
        children.material.color.set("red");
      }
    });
  }
  return obj ? <primitive object={obj} /> : null;
};


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
  // This reference will give us direct access to the THREE.Mesh object
  // const mesh = useRef();
 


  // const [ref, api] = useBox(() => ({ mass: 1 }));
  // api.position.set(props.position[0], props.position[1], props.position[2])
  return  (
    <mesh {...props} castShadow  args={[1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || "orange"} />
    </mesh>
  ) 
}

export default App;

