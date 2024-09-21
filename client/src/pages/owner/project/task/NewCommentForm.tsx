import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { Comments } from "@/store/types/task";
import { updateTask } from "@/store/taskThunk";

const formSchema = z.object({
  text: z
    .string()
    .min(2, {
      message: "Text must be at least 2 characters.",
    })
    .max(500, { message: "Text should be Less than 500 characters" }),
  user: z.string(),
});

export default function NewCommentForm({
  setIsModalOpen,
  task
}: {
  setIsModalOpen: any;
  task: any;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const {loading, error} = useSelector((state: RootState) => state.task)
  const {user} = useSelector((state: RootState) => state.auth)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      user: user ? user.id : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as Comments;
    if (task) {
      let comments = [...task.comments, val];
      const res = await dispatch(
        updateTask({ comments: comments} , task.id )
      );
      if(res?.success){
        setIsModalOpen(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your comment"
                  {...field}
                  className="my-2 h-52 bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Add new comment"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
