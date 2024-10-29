import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { terminateEmployee } from "@/store/employeeThunks";

const formSchema = z.object({
  terminationReason: z.string().optional(),
});

interface PropsTypes {
  setIsModalOpen: any;
  id: string;
}

export default function TerminationForm({ setIsModalOpen, id }: PropsTypes) {
  const { toast } = useToast();
  const {error, loading} = useSelector((state: RootState) => state.employee);
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terminationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(terminateEmployee(values, id));
      setIsModalOpen(false);
      toast({
        title: "Employee Terminated",
        description: "An email is sent to employee with the termination reason",
        variant: "default",
      });
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="terminationReason"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter reason for termination..."
                  className="bg-background h-56"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Loading..." : "Terminate"}    
        </Button>
      </form>
    </Form>
  );
}
