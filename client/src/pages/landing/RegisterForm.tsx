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
import { apiRequest } from "@/services/api/commonRequest";
import { useNavigate } from "react-router-dom";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username should be at least 2 characters",
    })
    .max(30, {
      message: "Username should be less than 20 characters",
    }),
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email should be at least 2 characters",
    })
    .max(50, {
      message: "Email should be less than 20 characters",
    }),
  password: z
    .string()
    .refine(value => passwordRegex.test(value), {
      message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z
    .string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPasword"],
});



const RegisterForm = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
      try {
        setLoading(true);
        const res = await apiRequest({
          method: "POST",
          url: import.meta.env.VITE_USERS_URL,
          route: "/api/v1/users/signup",
          data: {...values},
          headers: {
            "Content-Type": "application/json"
          }
        })
        
        if(!res.success){
          setError(res?.errors[0]?.message || "Something went");
          return setLoading(false)
        }

        console.log(res)
        navigate("/verify-email");
        setLoading(false)
      } catch (error) {
        setError("Something went wrong")
        return setLoading(false)
      }
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            name= "confirmPassword"
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
            {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
    </Form>
  )
}

export default RegisterForm

