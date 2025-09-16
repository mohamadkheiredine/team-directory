"use client";
import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../shared/form";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Card } from "../shared/card";
import { useActionStateToast } from "../../../../hooks/use-action-state-toast";
import { useExitConfirmation } from "../../../../hooks/use-exit-confirmation";
import { Dialog } from "../shared/dialog";
import { useControllableState } from "../../../../hooks/use-controllable-state";
import { Product } from "@/app/models/products/read";
import { editProductAction } from "@/app/lib/utils/actions";
import { editProductFormSchema } from "@/app/models/products/edit";

const EditProductDialog = ({
  product,
  isOpen = false,
  onOpenChange,
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

  const [state, formAction, isPending] = useActionState(editProductAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);
  const form = useForm<z.output<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      ...(state?.fields ?? {}),
    },
  });
  const isDirty = useMemo(() => {
    const isFormDirty = form.formState.isDirty;
    return isFormDirty;
  }, [form.formState.isDirty]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        form.handleSubmit(async (data) => {
          const formData = new FormData();
          formData.append("id", String(product.id));
          formData.append("name", data.name);
          formData.append("sku", data.sku);
          formData.append("price", String(data.price));
          formData.append("stock", String(data.stock));

          startTransition(() => formAction(formData));
        })();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [form, formAction, product.id]
  );
  const { askForExit, ExitConfirmationModal } = useExitConfirmation();
  const handleOpenChange = async (nextOpen: boolean) => {
    if (!nextOpen && isDirty) {
      // Prevent closing if dirty
      const shouldExit = await askForExit();
      if (!shouldExit) return;
    }
    setOpen(nextOpen);
    form.reset();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <div className=""></div>
        <Dialog.Overlay />
        <Dialog.Content
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:w-full sm:max-w-screen sm:border-0 sm:rounded-none sm:shadow-none"
        >
          <Dialog.Header>
            <Dialog.Title>Edit Product</Dialog.Title>
            <Dialog.Description>
              Edit the details of the product.
            </Dialog.Description>
          </Dialog.Header>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full justify-center"
            >
              <Dialog.Body>
                <Card.Content className="py-6 min-h-[50vh] flex flex-col justify-center gap-4 @container">
                  <div className="flex flex-col gap-5">
                    <Form.Field
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>Name</Form.Label>
                          <Form.Control>
                            <Input
                              type="text"
                              placeholder="Enter name"
                              value={
                                field.value !== undefined
                                  ? field.value.toString()
                                  : ""
                              }
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </Form.Control>
                          <Form.Message className="text-red-500" />
                        </Form.Item>
                      )}
                    />
                    <Form.Field
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>SKU</Form.Label>
                          <Form.Control>
                            <Input
                              type="text"
                              placeholder="Enter SKU"
                              value={
                                field.value !== undefined
                                  ? field.value.toString()
                                  : ""
                              }
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </Form.Control>
                          <Form.Message className="text-red-500" />
                        </Form.Item>
                      )}
                    />

                    <Form.Field
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>Price in decimal (.00)</Form.Label>
                          <Form.Control>
                            <Input
                              type="number"
                              placeholder="Enter product price"
                              value={field.value ?? ""} // always a number
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </Form.Control>
                          <Form.Message className="text-red-500" />
                        </Form.Item>
                      )}
                    />

                    <Form.Field
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>Stock</Form.Label>
                          <Form.Control>
                            <Input
                              type="number"
                              placeholder="Enter product stock"
                              value={field.value ?? ""} // always a number
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </Form.Control>
                          <Form.Message className="text-red-500" />
                        </Form.Item>
                      )}
                    />
                  </div>
                </Card.Content>
              </Dialog.Body>
              <Dialog.Footer>
                <Card.Footer className="py-6 flex justify-end">
                  <Button
                    type="submit"
                    disabled={isPending || !isDirty}
                    className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Edit
                  </Button>
                </Card.Footer>
              </Dialog.Footer>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog>
      {ExitConfirmationModal}
    </>
  );
};
export default EditProductDialog;
