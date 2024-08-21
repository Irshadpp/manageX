import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiOutlineMail } from "react-icons/hi";
import { LuKey } from "react-icons/lu"
import FormInputWithIcon from "@/components/custome/FormInputWithIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email should be atleast 2 charecters",
    })
    .max(20, {
      message: "Email should be less than 20 charecters",
    }),
  password: z
  .string()
  .refine(value => passwordRegex.test(value),{
    message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
  }),
});


const LoginForm = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
        setLoading(true);
        
    }

  return (
    <Form {...form}>
        <form className="space-y-4">
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormInputWithIcon
                field={field}
                icon={<HiOutlineMail/>}
                placeholder="Your Email"
                showTitle={false}
                />
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
                <FormInputWithIcon
                field={field}
                icon={<LuKey/>}
                type="password"
                placeholder="Enter Password"
                showTitle={false}
                />
            )}
            />
            <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Login"}
            </Button>
        </form>
    </Form>
  )
}

export default LoginForm

