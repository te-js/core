import { Store } from "../core/store";

interface IStore {
  value: number;
  toggle: boolean;
  pr?: string;
}

const store = new Store<IStore>({ value: 0, toggle: false });

export default store;
