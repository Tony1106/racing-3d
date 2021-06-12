import create from "zustand";
export default create((set) => ({
  isPlaying: false,
  startGame: () => set((state) => ({ isPlaying: true })),
  isJump: false,
  setJump: (value) =>
    set((state) => {
      return { isJump: value };
    }),
  roadSize: 20,
  modelWidth: 2,
  modelHeight: 4,
  numberOfbarrier: 10,
  speed: 0.5,
  setFinish: () => set((state) => ({ isPlaying: false })),
  playerPosition: { x: 0, y: 0, z: 0 },
  barriers: [],
  setBarriers: (barriers) => set((state) => ({ barriers })),
  playerState: null,
  updatePlayerState: (playerState) => set((state) => ({ playerState })),
  updatePlayerPosition: ({x,y,z}) =>
    set((state) => {
      const currentPosition = state.playerPosition;
      const _x = currentPosition.x;
      const _y = currentPosition.y;
      const _z = currentPosition.z;
      const SHOULD_UPDATE_RANGE = 0.001
      if(x - _x <SHOULD_UPDATE_RANGE && y - _y < SHOULD_UPDATE_RANGE && z -_z < SHOULD_UPDATE_RANGE) {
        // console.log('not update');
        return {playerPosition: {currentPosition}};
      }
      return {
      playerPosition: {
        x: x,
        y: y,
        z: z,
      },
    }}),
}));
