import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

type UseControllableStateProps<T> =
  | {
      value?: T;
      defaultValue: T;
      onValueChange?: (value: T) => void;
    }
  | {
      value: T;
      defaultValue?: T;
      onValueChange?: (value: T) => void;
    };

type SetStateFn<T> = (prevState: T) => T;

function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, defaultValue, onValueChange } = props;
  const [state, setState] = useState(value ?? defaultValue);
  const currentValue = value ?? state;

  if (currentValue === undefined) {
    throw new Error('You must provide either a value or a default value');
  }

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;

  const handleValueChange: Dispatch<SetStateAction<T>> = useCallback((newValue: SetStateAction<T>) => {
    const updatedValue =
      typeof newValue === 'function' ? (newValue as SetStateFn<T>)(currentValueRef.current) : newValue;

    setState(updatedValue);
    onValueChangeRef.current?.(updatedValue);
  }, []);

  return [currentValue, handleValueChange] as const;
}

export { useControllableState };