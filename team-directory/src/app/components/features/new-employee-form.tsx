"use client";
import { useActionStateToast } from "../../../../hooks/use-action-state-toast";
import { createEmployeeFormSchema } from "@/app/models/employees/create";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormEvent,
  startTransition,
  useActionState,
  useCallback,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { Form } from "@/app/components/shared/form";
import { Input } from "@/app/components/shared/input";
import { Card } from "@/app/components/shared/card";
import { Button } from "@/app/components/shared/button";
import { v4 as uuidv4 } from "uuid";
import EmployeeStatusSelect from "@/app/components/features/employee-status-select";
import { createEmployeeAction } from "@/app/lib/utils/actions";

const NewEmployeeForm = () => {
  const [state, formAction, isPending] = useActionState(createEmployeeAction, {
    success: false,
    message: "",
  });
  useActionStateToast(state);

  const form = useForm<z.output<typeof createEmployeeFormSchema>>({
    resolver: zodResolver(createEmployeeFormSchema),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      status: "" as "active" | "inactive",
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
          const uniqueSuffix = uuidv4().slice(0, 6);
          const slug = slugify(`${data.name}-${uniqueSuffix}`, { lower: true });
          const formData = new FormData();

          formData.append("slug", slug);
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
    [form, formAction]
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-lg rounded-xl bg-white border border-gray-200">
        <Card.Header className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Employee
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the details below to create a new employee.
          </p>
        </Card.Header>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
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
                      value={field.value ?? ""}
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
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </Form.Control>
                  <Form.Message className="text-red-500"/>
                </Form.Item>
              )}
            />

            <Form.Field
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.Item className="w-full">
                  <Form.Label>Email</Form.Label>
                  <Form.Control>
                    <Input
                      type="text"
                      placeholder="Enter email"
                      value={field.value ?? ""}
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
                  <Form.Message className="text-red-500"/>
                </Form.Item>
              )}
            />

            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default NewEmployeeForm;
