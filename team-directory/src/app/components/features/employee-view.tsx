'use client';
import { Card } from "../shared/card";
import { Badge } from "../shared/badge";
import { Employee } from "@/app/models/employees/read";
import { Button } from "../shared/button";
import Link from "next/link";
import EditEmployeeForm from "./edit-employee-dialog";
import { useState } from "react";
import DeleteEmployeeDialog from "./delete-employee-dialog";

const EmployeeView = ({ employee }: { employee: Employee }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8">
      <Card className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 p-6 sm:p-8 text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg border-4 border-white">
            <img
              src={`https://ui-avatars.com/api/?name=${employee.name}&background=ffffff&color=4f46e5&size=128`}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{employee.name}</h1>
          <p className="mt-1 text-indigo-100 text-sm sm:text-base">{employee.title}</p>
        </div>

        {/* Card Content */}
        <Card.Content className="p-4 sm:p-8 space-y-6">
          {/* Email */}
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase">Email</h2>
            <p className="mt-1 text-gray-800 text-sm sm:text-base break-all">{employee.email}</p>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase">Status</h2>
            <Badge
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                employee.status === "active"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {employee.status}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <EditEmployeeForm isOpen={isEditOpen} onOpenChange={setIsEditOpen} employee={employee} />
            <DeleteEmployeeDialog employee={employee} isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
            <Button className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition h-10" onClick={() => setIsEditOpen(true)}>
              Edit Employee
            </Button>
            <Link
              href="/employees"
              className="w-full sm:w-auto px-6 py-2 bg-gray-100 text-gray-700 rounded-full shadow-lg hover:bg-gray-200 transition text-center"
            >
              Back to List
            </Link>
            <Button className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition h-10" onClick={() => setIsDeleteOpen(true)}>
              Delete Employee
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EmployeeView;
