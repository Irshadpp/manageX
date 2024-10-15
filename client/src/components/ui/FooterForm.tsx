import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "/logo.png";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1, "Message is required"),
});

export function FooterForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = () => {
    toast({
      title: "Thanks for sending a message",
      description: "Our team will get back to you as soon as possible",
      variant: "default",
    });
    form.reset();
  };

  return (
    <div className="p-5 lg:p-16 bg-backgroundAccent rounded-xl flex flex-col gap-4">
      <img
        alt="manageX"
        src={Logo}
        width={40}
        height={40}
        className="mx-auto"
      />

      <h3 className="text-center">Get Started</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-3">
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="What you want to say?"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
