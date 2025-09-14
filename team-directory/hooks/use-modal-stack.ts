import { useEffect, useState } from "react";

const modalStack: number[] = [];
let nextZIndex = 50;

export function useModalStack() {
  const [zIndex, setZIndex] = useState<number | null>(null);

  useEffect(() => {
    const newZIndex = modalStack.length > 0 ? Math.max(...modalStack) + 10 : nextZIndex;
    setZIndex(newZIndex);
    modalStack.push(newZIndex);
    nextZIndex = newZIndex + 10;

    return () => {
      modalStack.splice(modalStack.indexOf(newZIndex), 1);
      if (modalStack.length === 0) {
        nextZIndex = 50;
      }
    };
  }, []);

  return { zIndex };
}

export function getTopModalZIndex(): number {
  return modalStack.length > 0 ? Math.max(...modalStack) : 50;
}

export function isModalStackEmpty(): boolean {
  return modalStack.length === 0;
}