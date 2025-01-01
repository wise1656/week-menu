export type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>)
) => void;

export type GetState<T> = () => T;
