"use client";

import { Dialog } from "../shared/dialog";
import { Button } from "../shared/button";
import { startTransition, useActionState, useCallback } from "react";
import { useActionStateToast } from "../../../../hooks/use-action-state-toast";
import { useControllableState } from "../../../../hooks/use-controllable-state";
import { Employee } from "@/app/models/employees/read";
import { deleteEmployeeAction } from "@/app/lib/utils/actions";

const DeleteEmployeeDialog = ({
  employee,
  isOpen = false,
  onOpenChange
}: {
  employee: Employee;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const [open, setOpen] = useControllableState({
    value: isOpen,
    defaultValue: false,
    onValueChange: onOpenChange,
  });
  const [state, formAction, isPending] = useActionState(deleteEmployeeAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);

  const handleDelete = useCallback(() => {
    const formData = new FormData();
    formData.append("id", String(employee.id) ?? "");
    startTransition(() => formAction(formData));
  }, [formAction, employee.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Overlay />

      <Dialog.Content onInteractOutside={(e) => e.preventDefault()}>
        <Dialog.Header>
          <Dialog.Title>Delete Employee</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete {employee.name}?
          </Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Button
            variant={"filled"}
            color="danger"
            className="text-white bg-red-500 hover:bg-red-600"
            isLoading={isPending}
            onClick={handleDelete}
            disabled={isPending}
          >
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

export default DeleteEmployeeDialog;