
import {  usePlane } from "@react-three/cannon";
export default function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -3, 0], ...props }));
    return (
      <group>
        <mesh receiveShadow ref={ref}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color={"grey"} />
        </mesh>
      </group>
    );
  }