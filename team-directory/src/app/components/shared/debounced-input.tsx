"use client";

import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { Input } from "./input";

/** Debounced input – fires `onChange` **after** the user stops typing */
export default function DebouncedInput<T extends string | number>({
  value: externalValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: T;
  onChange: (value: T) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  // 1) Local state for the typing value
  const [internal, setInternal] = useState<T>(externalValue);

  // 2) Keep local state in sync if parent changes it from the outside
  useEffect(() => {
    setInternal(externalValue);
  }, [externalValue]);

  // 3) Debounce logic
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // clear previous timer
    if (timer.current) clearTimeout(timer.current);

    // start new timer
    timer.current = setTimeout(() => {
      if (internal !== externalValue) {
        onChange(internal); // 🔔 notify parent once
      }
    }, debounce);

    // cleanup on unmount / re-run
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // ⬇ we **do not** include `onChange` or `externalValue`
    // so the effect is only driven by what the user types (`internal`)
  }, [internal, debounce, onChange, externalValue]);

  return (
    <Input
      {...props}
      value={internal as unknown as string}
      onChange={(e) => setInternal(e.target.value as unknown as T)}
    />
  );
}
