import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeaveDatePicker } from "@/components/custome/LeaveDatePicker";
import { useState } from "react";
import { apiRequest } from "@/services/api/commonRequest";

const formSchema = z.object({
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  reason: z.string().min(1, "Please provide a reason for leave."),
  leaveType: z.enum(["casual", "sick", "vecation"], {
    required_error: "Leave type is required.",
  }),
}).superRefine(({ startDate, endDate }, ctx) => {
  if (endDate < startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date cannot be before start date.",
      path: ["endDate"],
    });
  }
});

interface PropsTypes {
  setModalOpen: (open: boolean) => void;
  setLeaveData: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function LeaveForm({ setModalOpen, setLeaveData }: PropsTypes) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      reason: "",
      leaveType: "casual",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    try {
        const formattedValues = {
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
          };
      
          const response: any = await apiRequest({
            method: "POST",
            url: import.meta.env.VITE_BACKEND_URL,
            route: `/api/v1/leave`,
            data: formattedValues,
            headers: {
              "Content-type": "application/json"
            }
          });
      if (response.errors && response.errors.length > 0) {
        const errorMessage = response.errors[0].message;
        setError(errorMessage);
      } else {
        setLeaveData(prev => [...prev, response.data]); 
        setModalOpen(false);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block">Start Date</FormLabel>
                <FormControl>
                  <LeaveDatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Pick start date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block">End Date</FormLabel>
                <FormControl>
                  <LeaveDatePicker
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Pick end date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="leaveType"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="block">Leave Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    // className="w-full"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="sick">Sick</SelectItem>
                      <SelectItem value="vecation">Vecation</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-3">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Reason</FormLabel>
                <Textarea
                  {...field}
                  placeholder="Enter the reason for leave"
                  className="bg-background w-full"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Apply Leave"}
        </Button>
      </form>
    </Form>
  );
}
