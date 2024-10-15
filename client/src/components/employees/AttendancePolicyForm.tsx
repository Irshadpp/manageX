import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import FormInputCustom from "@/components/custome/FormInputCustom";
import { apiRequest } from "@/services/api/commonRequest";
import { useState } from "react";
import { AttendancePolicyType } from "../../pages/manager/employees/types/attendancePolicy";

const attendancePolicySchema = z.object({
  officeStartTime: z.string().min(5, { message: "Start time is required." }),
  lateThreshold: z.string().min(5, { message: "Late threshold is required." }),
  halfDayThreshold: z
    .string()
    .min(1, { message: "Enter a valid half-day threshold." })
    .transform((val) => parseFloat(val)),
  fullDayThreshold: z
    .string()
    .min(1, { message: "Enter a valid full-day threshold." })
    .transform((val) => parseFloat(val)),
  leavePolicy: z.object({
    sickLeaves: z
      .string()
      .min(0, { message: "Sick leaves must be at least 0." })
      .transform((val) => parseFloat(val)),
    casualLeaves: z
      .string()
      .min(0, { message: "Casual leaves must be at least 0." })
      .transform((val) => parseFloat(val)),
    vacationLeaves: z
      .string()
      .min(0, { message: "Vacation leaves must be at least 0." })
      .transform((val) => parseFloat(val)),
  }),
});


interface EditableAttendancePolicyFormProps {   
  policy: AttendancePolicyType;
}

const AttendancePolicyForm: React.FC<EditableAttendancePolicyFormProps> = ({
  policy,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof attendancePolicySchema>>({
    resolver: zodResolver(attendancePolicySchema),
    defaultValues: {
      officeStartTime: policy?.officeStartTime || "09:00",
      lateThreshold: policy?.lateThreshold || "09:30",
      halfDayThreshold: policy?.halfDayThreshold || 4,
      fullDayThreshold: policy?.fullDayThreshold || 8,
      leavePolicy: {
        sickLeaves: policy?.leavePolicy.sickLeaves || 2,
        casualLeaves: policy?.leavePolicy.casualLeaves || 2,
        vacationLeaves: policy?.leavePolicy.vacationLeaves || 2,
      },
    },
  });

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditable((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof attendancePolicySchema>) => {
    setLoading(true);

    const res = await apiRequest({
      method: "PATCH",
      url: import.meta.env.VITE_EMPLOYEE_URL,
      route: `/api/v1/attendance-policy/${policy.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    });

    if (!res.success) {
      setError(res?.errors[0]?.message || "Policy update failed.");
      return setLoading(false);
    }

    setLoading(false);
    setIsEditable(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-5 pb-5">
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="officeStartTime"
            render={({ field }) => (
              <FormInputCustom
                placeholder="Enter Office Start Time"
                field={field}
                showTitle={true}
                title="Office Start Time"
                disabled={!isEditable}
              />
            )}
          />
          <FormField
            control={form.control}
            name="lateThreshold"
            render={({ field }) => (
              <FormInputCustom
                placeholder="Enter Late Threshold"
                field={field}
                showTitle={true}
                title="Late Threshold"
                disabled={!isEditable}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="halfDayThreshold"
            render={({ field }) => (
              <FormInputCustom
                type="number"
                placeholder="Enter Half-Day Threshold"
                field={field}
                showTitle={true}
                title="Half-Day Threshold"
                disabled={!isEditable}
              />
            )}
          />
          <FormField
            control={form.control}
            name="fullDayThreshold"
            render={({ field }) => (
              <FormInputCustom
                type="number"
                placeholder="Enter Full-Day Threshold"
                field={field}
                showTitle={true}
                title="Full-Day Threshold"
                disabled={!isEditable}
              />
            )}
          />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Leave Policy</h3>
          <div className="grid grid-cols-3 gap-5 mt-2">
            <FormField
              control={form.control}
              name="leavePolicy.sickLeaves"
              render={({ field }) => (
                <FormInputCustom
                  type="number"
                  placeholder="Enter Sick Leaves"
                  field={field}
                  showTitle={true}
                  title="Sick Leaves"
                  disabled={!isEditable}
                />
              )}
            />
            <FormField
              control={form.control}
              name="leavePolicy.casualLeaves"
              render={({ field }) => (
                <FormInputCustom
                  type="number"
                  placeholder="Enter Casual Leaves"
                  field={field}
                  showTitle={true}
                  title="Casual Leaves"
                  disabled={!isEditable}
                />
              )}
            />
            <FormField
              control={form.control}
              name="leavePolicy.vacationLeaves"
              render={({ field }) => (
                <FormInputCustom
                  type="number"
                  placeholder="Enter Vacation Leaves"
                  field={field}
                  showTitle={true}
                  title="Vacation Leaves"
                  disabled={!isEditable}
                />
              )}
            />
          </div>
        </div>

        {isEditable ? (
          <>
            <Button type="submit" className="mt-3">
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={handleEditClick}
              className="mt-3 mx-5 bg-muted"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button type="button" onClick={handleEditClick} className="mt-3">
            Edit Policy
          </Button>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default AttendancePolicyForm;
