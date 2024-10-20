import { Button } from "@/components/ui/button";
import { FormField, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { z } from "zod";
import { IoPhonePortraitOutline } from "react-icons/io5";
import DatePicker from "@/components/custome/DatePicker";
import FormInputWithIcon from "@/components/custome/FormInputWithIcon";
import { apiRequest } from "@/services/api/commonRequest";

const formSchema = z.object({
  fName:z
  .string()
  .trim()
  .min(2,{
    message: "First name required"
  })
  .max(50,{
    message: "First name should be maximum 50 charecters"
  }),
  lName:z
  .string()
  .trim()
  .min(2,{
    message: "Last name required"
  })
  .max(50,{
    message: "First name should be maximum 50 charecters"
  }),
  phone:z
  .string()
  .trim()
  .min(10,{
    message: "Please give valid phone number"
  })
  .max(16,{
    message: "Please give a valid phone number"
  }),
  dob:z.date(),
});

const UserDetails = ({ handleNext }: { handleNext: any }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      fName: "",
      lName: "",
      phone: "",
      dob: undefined
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      setLoading(true);

    const res = await apiRequest({
      method: "PATCH",
      url: import.meta.env.VITE_BACKEND_URL,
      route: "/api/v1/users",
      headers:{
        "Content-Type": "application/json"
      },
      data: {...values},
    });

    if(!res.success){
      setError(res?.errors[0]?.message || "Something went wrong!");
      return setLoading(false);
    }

    handleNext();
    setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Something went wrong...");
      return setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <h5 className="text-xl font-semibold">Stpe 2: User Registration</h5>
      <p className="text-[17px] font-semibold">
        Enjoy using our App! You'r all setup
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
          name="fName"
          control = {form.control}
          render = {({field})=>(
            <FormInputWithIcon
            field={field}
            icon={<FaUser/>}
            title="First Name"
            placeholder="Your first name"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="lName"
          control = {form.control}
          render = {({field})=>(
            <FormInputWithIcon
            field={field}
            icon={<FaUser/>}
            title="Last Name"
            placeholder="Your last name"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="phone"
          control = {form.control}
          render = {({field})=>(
            <FormInputWithIcon
            field={field}
            icon={<IoPhonePortraitOutline/>}
            title="Phone"
            placeholder="Your phone number"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="dob"
          control = {form.control}
          render = {({field})=>(
            <DatePicker title="Date Of Birth" field={field}/>
          )}
          />
          <Button type="submit" className="w-full mt-5">
            {loading ? "Updating..." : "Update Details"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
        </div>
  );
};

export default UserDetails;
