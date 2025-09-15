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
import { Employee } from "@/app/models/employees/read";
import { editEmployeeAction } from "@/app/lib/utils/actions";
import { editEmployeeFormSchema } from "@/app/models/employees/edit";
import EmployeeStatusSelect from "./employee-status-select";

const EditEmployeeForm = ({
  employee,
  isOpen = false,
  onOpenChange,
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

  const [state, formAction, isPending] = useActionState(editEmployeeAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);
  const form = useForm<z.output<typeof editEmployeeFormSchema>>({
    resolver: zodResolver(editEmployeeFormSchema),
    defaultValues: {
      name: employee.name,
      title: employee.title,
      email: employee.email,
      status: employee.status,
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
          formData.append("id", String(employee.id));
          formData.append("slug", employee.slug);
          formData.append("name", data.name);
          formData.append("title", data.title);
          formData.append("email", data.email);
          formData.append("status", data.status);

          startTransition(() => formAction(formData));
        })();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [
      form,
      formAction,
      employee.id,
      employee.slug
    ]
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
            <Dialog.Title>Edit Employee</Dialog.Title>
            <Dialog.Description>
              Edit the details of the employee.
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
                      name="title"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>Title</Form.Label>
                          <Form.Control>
                            <Input
                              type="text"
                              placeholder="Enter title"
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
                      name="email"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>{"email"}</Form.Label>
                          <Form.Control>
                            <Input
                              type="text"
                              placeholder={"Enter email"}
                              value={
                                field.value !== undefined
                                  ? field.value.toString()
                                  : ""
                              }
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </Form.Control>
                          <Form.Message className="text-red-500"/>
                        </Form.Item>
                      )}
                    />

                    <Form.Field
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <Form.Item className="w-full">
                          <Form.Label>Status</Form.Label>
                          <Form.Control>
                            <EmployeeStatusSelect
                              value={field.value}
                              onChange={field.onChange}
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
                  <Button type="submit" disabled={isPending || !isDirty} className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
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
export default EditEmployeeForm;
