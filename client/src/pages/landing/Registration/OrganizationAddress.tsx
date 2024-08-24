import { Button } from "@/components/ui/button";
import { FormField, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/services/api/commonRequest";
import FormInput from "@/components/custome/FormInput";
import { deleteObject } from "@/utils/local-storage";

const formSchema = z.object({
  street:z
  .string()
  .min(2,{
    message: "Street must be atleast two charecters"
  })
  .max(50,{
    message: "Street name must be maximum 50 charecters"
  }),
  country:z
  .string()
  .min(2,{
    message: "country required"
  })
  .max(100,{
    message: "country name should be maximum 50 charecters"
  }),
  state:z
  .string()
  .min(2,{
    message: "Please give a valid state"
  })
  .max(16,{
    message: "Please give a valid state"
  }),
  city:z
  .string()
  .min(2,{
    message: "Please give a valid city"
  })
  .max(16,{
    message: "Please give a valid city"
  }),
  zipcode:z
  .string()
  .min(2,{
    message: "Please give a valid zipcode"
  })
  .max(16,{
    message: "Please give a valid zipcode"
  }),
});

const OrganizationAddress = ({ handleNext }: { handleNext: any }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      street: "",
      country: "",
      state: "",
      city: "",
      zipcode: ""
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      setLoading(true);

    const res = await apiRequest({
      method: "PATCH",
      url: import.meta.env.VITE_USERS_URL,
      route: "/api/v1/organization?address=true",
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
    deleteObject("userData");
    } catch (error) {
      setError("Something went wrong...");
      return setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <h5 className="text-xl font-semibold">Stpe 4: Organization Address</h5>
      <p className="text-[17px] font-semibold">
        Explore the future and functionalities of our app
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
          name="street"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Street Name"
            placeholder="Your Street name"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="country"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Country"
            placeholder="country"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="state"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="State"
            placeholder="state"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="city"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="City"
            placeholder="city"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="zipcode"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Zipcode"
            placeholder="zipcode"
            showTitle={true}
            />
          )}
          />
          <Button type="submit" className="w-full mt-5">
            {loading ? "Updating..." : "Update Address"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </Form>
        </div>
  );
};

export default OrganizationAddress;
