"use client";
import { useActionStateToast } from "../../../../hooks/use-action-state-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../shared/form";
import { Input } from "../shared/input";
import { Card } from "../shared/card";
import { Button } from "../shared/button";
import { Dialog } from "../shared/dialog";
import { useExitConfirmation } from "../../../../hooks/use-exit-confirmation";
import { createProductFormSchema } from "@/app/models/products/create";
import { createProductAction } from "@/app/lib/utils/actions";

const NewProductDialog = () => {
  const [state, formAction, isPending] = useActionState(createProductAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);

  const form = useForm<z.output<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: undefined,
      stock: undefined,
      // createdAt: "",
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
    [form, formAction]
  );
  const [open, setOpen] = useState(false);
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
        <Dialog.Trigger asChild>
          <Button variant={"text"} className="p-0 text-blue-400">
            Add Product
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />

        <Dialog.Content
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:w-full sm:max-w-screen sm:border-0 sm:rounded-none sm:shadow-none"
        >
          <Dialog.Header>
            <Dialog.Title>Add Product</Dialog.Title>
            <Dialog.Description>Adding a product</Dialog.Description>
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
                              placeholder="Enter product name"
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
                          <Form.Label>Sku</Form.Label>
                          <Form.Control>
                            <Input
                              type="text"
                              placeholder="Enter product sku"
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
                          <Form.Label>Price</Form.Label>
                          <Form.Control>
                            <Input
                              type="number"
                              placeholder="Enter product price"
                              value={
                                field.value !== undefined
                                  ? field.value.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : undefined
                                );
                              }}
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
                              value={
                                field.value !== undefined
                                  ? field.value.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                field.onChange(
                                  e.target.value
                                    ? parseFloat(e.target.value)
                                    : undefined
                                );
                              }}
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
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Add Product
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

export default NewProductDialog;
