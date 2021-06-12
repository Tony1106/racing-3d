import { useGLTF } from '@react-three/drei'
import beetlePath from '../assets/Beetle.glb'

export default function Beetle(props) {
    const { nodes, materials } = useGLTF(beetlePath)
    return (
      <group {...props} dispose={null} rotateY={3}>
        <mesh castShadow material={materials['Black paint']} geometry={nodes.chassis_1.geometry} />
        <mesh castShadow material={materials.Rubber} geometry={nodes.chassis_2.geometry} />
        <mesh castShadow material={materials.Paint} geometry={nodes.chassis_3.geometry} />
        <mesh castShadow material={materials.Underbody} geometry={nodes.chassis_4.geometry} />
        <mesh castShadow material={materials.Chrom} geometry={nodes.chassis_5.geometry} />
        <mesh castShadow material={materials['Interior (dark)']} geometry={nodes.chassis_6.geometry} />
        <mesh castShadow material={materials['Interior (light)']} geometry={nodes.chassis_7.geometry} />
        <mesh castShadow material={materials.Reflector} geometry={nodes.chassis_8.geometry} />
        <mesh material={materials.Glass} geometry={nodes.chassis_9.geometry} />
        <mesh castShadow material={materials.Steel} geometry={nodes.chassis_10.geometry} />
        <mesh castShadow material={materials['Black plastic']} geometry={nodes.chassis_11.geometry} />
        <mesh material={materials.Headlight} geometry={nodes.chassis_12.geometry} />
        <mesh castShadow material={materials['Reverse lights']} geometry={nodes.chassis_13.geometry} />
        <mesh castShadow material={materials['Orange plastic']} geometry={nodes.chassis_14.geometry} />
        <mesh castShadow material={materials['Tail lights']} geometry={nodes.chassis_15.geometry} />
        <mesh castShadow material={materials['License Plate']} geometry={nodes.chassis_16.geometry} />
      </group>
    )
  }