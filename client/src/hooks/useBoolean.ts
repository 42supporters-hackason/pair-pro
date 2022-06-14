import { useCallback, useState } from "react";

type InitialState = boolean | (() => boolean);

/**
 * Boolean管理用の便利Hooks
 *
 * @param initialState 初期値
 */
export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, { on, off, toggle }] as const;
}
