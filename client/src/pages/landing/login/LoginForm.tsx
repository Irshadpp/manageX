import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HiOutlineMail } from "react-icons/hi";
import { LuKey } from "react-icons/lu"
import FormInputWithIcon from "@/components/custome/FormInputWithIcon";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/services/api/commonRequest";
import { storeObject } from "@/utils/local-storage";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, {
      message: "Email should be atleast 2 charecters",
    })
    .max(50, {
      message: "Email should be less than 20 charecters",
    }),
  password: z
  .string()
});


const LoginForm = () => {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
      try {
        setLoading(true);
        const res = await apiRequest({
          method: "POST",
          url: import.meta.env.VITE_USERS_URL,
          route: "/api/v1/auth/login",
          data: {...values},
          headers:{
            "Content-Type": "application/json"
          }
        });

        if(!res.success){
          setError(res?.errors[0]?.message || "Login failed Please try again later");
          return setLoading(false);
        }
        const userData = {
          user: {...res.user},
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        }

        storeObject("userData", userData);
        dispatch(setCredentials(userData));

        switch(userData.user.role){
          case 'owner':
            navigate("/owner");
            break;
          case 'manager': 
            navigate("/manager");
            break;
          case 'employee':
            navigate("/employee");
            break;
          case 'admin':
            navigate("/admin");
        }
        setLoading(false);

      } catch (error) {
        setLoading(false)
        console.log(error);
        setError("An error occured during login");
      }
    }

  return (
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
                <FormInputWithIcon
                field={field}
                icon={<HiOutlineMail/>}
                type="email"
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
            {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </form>
    </Form>
  )
}

export default LoginForm

