import { create, SetState } from "zustand";
import delay from "delay";

type User = {
  name: string;
  social: string;
  avatar: string;
};

type StoreState = {
  user?: User;
};

const makeActions = (set: SetState<StoreState>) => ({
  async login() {
    const user = await delay(500, {
      value: {
        name: "Piotr Monwid-Olechnowicz",
        social: "https://twitter.com/hasparus",
        avatar: "ˋ( ° ▽、° ) `",
      },
    });

    set({ user });
    return user;
  },
});

interface StoreStateAndActions extends StoreState {
  actions: ReturnType<typeof makeActions>;
}

export const [useStore] = create<StoreStateAndActions>(
  set => ({
    user: undefined,
    actions: makeActions(set),
  })
);
