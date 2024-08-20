import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaUser } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi";
import { LuKey } from "react-icons/lu"
import FormInputWithIcon from "@/components/custome/FormInputWithIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username should be atleast 2 charecters",
    })
    .max(20, {
      message: "Username should be less than 20 charecters",
    }),
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
  confirmPasword: z
  .string()
})
.refine((data) => data.password !== data.confirmPasword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
});


const RegisterForm = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPasword: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
        setLoading(true);
        
    }

  return (
    <Form {...form}>
        <form className="space-y-4">
            <FormField
            name="username"
            control={form.control}
            render={({field})=>(
                <FormInputWithIcon
                field={field}
                icon={<FaUser/>}
                placeholder="Your Username"
                showTitle={false}
                />
            )}
            />
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
            <FormField
            control={form.control}
            name= "confirmPasword"
            render={({field})=>(
                <FormInputWithIcon
                field={field}
                icon={<LuKey/>}
                placeholder="Confirm your pasword"
                type="password"
                showTitle={false}
                />
            )}
            />
            <Button type="submit" className="w-full">
                {loading ? "Loading..." : "Signup"}
            </Button>
        </form>
    </Form>
  )
}

export default RegisterForm

