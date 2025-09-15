import { ExitConfirmation } from "@/app/components/shared/exit-confirmation";
import { useState, useCallback } from "react";

export function useExitConfirmation(props: {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
} = {}) {
  const {
    title = 'Are you sure you want to leave?',
    subtitle = 'You have unsaved changes. Do you really want to leave?',
    primaryButtonText = 'Yes, leave',
    secondaryButtonText = 'No, stay',
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>();

  const confirmExit = useCallback(() => {
    setIsOpen(false);
    resolvePromise?.(true);
  }, [resolvePromise]);

  const cancelExit = useCallback(() => {
    setIsOpen(false);
    resolvePromise?.(false);
  }, [resolvePromise]);

  const askForExit = useCallback(() => {
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  return {
    isOpen,
    askForExit,
    confirmExit,
    cancelExit,
    ExitConfirmationModal: isOpen
      ? <ExitConfirmation
          onConfirm={confirmExit}
          onCancel={cancelExit}
          title={title}
          subtitle={subtitle}
          primaryButtonText={primaryButtonText}
          secondaryButtonText={secondaryButtonText}
        /> 
      : null,
  };
}