import { Button } from "@/components/ui/button";
import { FormField, Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/services/api/commonRequest";
import FormInput from "@/components/custome/FormInput";

const formSchema = z.object({
  orgName:z
  .string()
  .trim()
  .min(2,{
    message: "Organization name required"
  })
  .max(50,{
    message: "Organization name must be maximum 50 charecters"
  }),
  description:z
  .string()
  .trim()
  .min(1,{
    message: "Description required"
  })
  .max(100,{
    message: "First name should be maximum 100 charecters"
  }),
  industry:z
  .string()
  .trim()
  .min(2,{
    message: "Please give a valid industry"
  })
  .max(16,{
    message: "Please give a valid industry"
  }),
  website:z
  .string()
  .trim()
  .min(2,{
    message: "Please give a valid website"
  })
  .max(16,{
    message: "Please give a valid website"
  }),
});

const OrganizationDetails = ({ handleNext }: { handleNext: any }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      orgName: "",
      description: "",
      industry: "",
      website: ""
    }
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) =>{
    try {
      setLoading(true);

    const res = await apiRequest({
      method: "PATCH",
      url: import.meta.env.VITE_USERS_URL,
      route: "/api/v1/organization",
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
      setError("Something went wrong...");
      return setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <h5 className="text-xl font-semibold">Stpe 3: Organization Details</h5>
      <p className="text-[17px] font-semibold">
        Explore the future and functionalities of our app
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
          name="orgName"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Organization Name"
            placeholder="Your organization name"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="description"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Description"
            placeholder="Your last name"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="industry"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Industry"
            placeholder="Industry"
            showTitle={true}
            />
          )}
          />
          <FormField
          name="website"
          control = {form.control}
          render = {({field})=>(
            <FormInput
            field={field}
            title="Website"
            placeholder="Company website"
            showTitle={true}
            />
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

export default OrganizationDetails;
