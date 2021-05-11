import create from "zustand";

export default create((set) => ({
  isPlaying: false,
  startGame: () => set((state) => ({ isPlaying: true })),
  isJump: false,
  setJump: (value) =>
    set((state) => {return { isJump: value };

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
  updatePlayerState: (playerState) => set(state=>({playerState})),
  updatePlayerPosition: (direction) =>
    set((state) => {
      let { x, y, z } = state.playerPosition;
      const { roadSize, modelWidth } = state;
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
      const fn = DIRECTION[direction];
      if (fn) fn();
      return { playerPosition: { x, y, z } };
    }),
}));
