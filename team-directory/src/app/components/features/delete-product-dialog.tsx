"use client";

import { Dialog } from "../shared/dialog";
import { Button } from "../shared/button";
import { startTransition, useActionState, useCallback } from "react";
import { useActionStateToast } from "../../../../hooks/use-action-state-toast";
import { useControllableState } from "../../../../hooks/use-controllable-state";
import { Product } from "@/app/models/products/read";
import { deleteProductAction } from "@/app/lib/utils/actions";

const DeleteProductDialog = ({
  product,
  isOpen = false,
  onOpenChange
}: {
  product: Product;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const [open, setOpen] = useControllableState({
    value: isOpen,
    defaultValue: false,
    onValueChange: onOpenChange,
  });
  const [state, formAction, isPending] = useActionState(deleteProductAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);

  const handleDelete = useCallback(() => {
    const formData = new FormData();
    formData.append("id", String(product.id) ?? "");
    startTransition(() => formAction(formData));
  }, [formAction, product.id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Overlay />

      <Dialog.Content onInteractOutside={(e) => e.preventDefault()}>
        <Dialog.Header>
          <Dialog.Title>Delete Product</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete {product.name}?
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

export default DeleteProductDialog;