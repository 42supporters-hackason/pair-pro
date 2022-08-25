import { localStorageFactory } from "./factory";

const TOKEN_KEY = "sessionTimestamp";

/**
 * 最後にAPIサーバにアクセスした時刻を格納するlocalstorage
 */
export const sessionTimestampStorage = localStorageFactory<Date>({
  key: TOKEN_KEY,
  serializer: (value) => value.toJSON(),
  parser: (value) => new Date(value),
});
