import { localStorageFactory } from "./factory";

const TOKEN_KEY = "point";

/**
 * matchingPointを格納するlocalstorage
 */
export const pointStorage = localStorageFactory<number>({
  key: TOKEN_KEY,
});
