interface LocalStorageFactoryProps<T> {
  /**
   * 保存するkey名
   */
  key: string;
  /**
   * parser
   */
  parser?: (value: string) => T;
  /**
   * シリアライザ
   */
  serializer?: (value: T) => string;
}

/**
 * LocalStorageのファクトリ
 */
export const localStorageFactory = <T>({
  key,
  parser = JSON.parse,
  serializer = JSON.stringify,
}: LocalStorageFactoryProps<T>) =>
  ({
    load: () => {
      const item = window.localStorage.getItem(key);
      return item !== null ? parser(item) : item;
    },

    save: (value: T) => {
      const item = serializer(value);
      window.localStorage.setItem(key, item);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  } as const);
