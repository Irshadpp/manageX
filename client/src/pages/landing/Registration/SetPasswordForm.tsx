import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuKey } from "react-icons/lu"
import FormInputWithIcon from "@/components/custome/FormInputWithIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/services/api/commonRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import useLogout from "@/hooks/useLogout";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const formSchema = z.object({
    password: z
    .string()
    .refine(value => passwordRegex.test(value), {
      message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z
    .string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match",
  path: ["confirmPassword"],
});


const SetPasswordForm = () => {
    const logout = useLogout();
    const {user} = useSelector((state: RootState) => state.auth)
    const userId = user!.id
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });
    
    const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
      try {
        setLoading(true);
        const res = await apiRequest({
          method: "PATCH",
          url: import.meta.env.VITE_USERS_URL,
          route: `/api/v1/auth/set-password`,
          data: {...values},
          headers:{
            "Content-Type": "application/json"
          }
        });

        if(!res.success){
          setError(res?.errors[0]?.message || "set password failed");
          return setLoading(false);
        }
        console.log(res?.message);
        setLoading(false);
        logout();
        navigate("/login");
      } catch (error) {
        setLoading(false)
        console.log(error);
        setError("An error occured during create password");
      }
    }

  return (
    <Form {...form}>
        <form className="space-y-4 w-80" onSubmit={form.handleSubmit(handleSubmit)}>
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
            name="confirmPassword"
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
            <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Creating..." : "Create"}
            </Button>
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </form>
    </Form>
  )
}

export default SetPasswordForm

