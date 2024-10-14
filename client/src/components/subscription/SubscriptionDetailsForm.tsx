import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { useContext, useState } from "react";
import FormInputCustom from "../custome/FormInputCustom";
import { CountryList } from "@/components/common/CountryList";
import { StateList } from "@/components/common/StateList";
import { CityList } from "@/components/common/CityList";
// import getStripe from "@/util/getStripe";
// import { loadStripe } from "@stripe/stripe-js";
// import { storeObject } from "@/util/localStorage";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, { message: "Name should be less than 30 characters" }),
  street: z
    .string()
    .min(2, {
      message: "Street must be at least 2 characters.",
    })
    .max(30, { message: "Street should be less than 30 characters" }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters.",
    })
    .max(30, { message: "City should be less than 30 characters" }),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters.",
    })
    .max(30, { message: "State should be less than 30 characters" }),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .max(30, { message: "Country should be less than 30 characters" }),
  zipCode: z
    .string()
    .min(2, {
      message: "zipCode must be at least 2 characters.",
    })
    .max(30, { message: "zipCode should be less than 30 characters" }),
});

interface Props {
  setIsModalOpen: any;
  value: string;
}

const SubscriptionDetailsForm = ({ setIsModalOpen, value }: Props) => {
//   const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Address Listing
  const [countryISO, setCountryISO] = useState("");
  const [stateISO, setStateISO] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      street: "",
      state: "",
      city: "",
      country: "",
      zipCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // try {
    //   setLoading(true);

    //   const address = {
    //     line1: values.street,
    //     city: values.city,
    //     state: values.state,
    //     country: values.country,
    //     postal_code: values.zipCode,
    //   };

    //   if (user) {
    //     const res = await actualCommonRequest({
    //       route: API_ROUTES.SUBSCRIPTION,
    //       method: "POST",
    //       url: "/api/subscription",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       data: { address, name: values.name, price: value, email: user.email },
    //     });
        setLoading(false);

        // if (!res.success) {
        //   setError(res.error);
        // }
        // storeObject("subscription_session", res.session);

    //     const stripe = await loadStripe(
    //       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    //     );

    //     if (stripe) {
    //       const result = await stripe.redirectToCheckout({
    //         sessionId: res.session.id,
    //       });
    //       console.log(
    //         "file: DetailsForm.tsx:114 -> onSubmit -> result",
    //         result
    //       );
    //     }
    //   }
    // } catch (error) {
    //   console.log("file: DetailsForm.tsx:123 -> onSubmit -> error", error);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter your name"
              title="Name"
              showTitle={true}
            />
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter street"
              title="Street"
              showTitle={true}
            />
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <>
              <FormLabel>Country</FormLabel>
              <CountryList field={field} setCountryISO={setCountryISO} />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <>
              <FormLabel>State</FormLabel>
              <StateList
                field={field}
                setStateISO={setStateISO}
                countryISO={countryISO}
              />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <>
              <FormLabel>City</FormLabel>
              <CityList
                field={field}
                stateISO={stateISO}
                countryISO={countryISO}
              />
            </>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter your zipCode"
              title="Zip Code"
              showTitle={true}
            />
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Continue to billing"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default SubscriptionDetailsForm;
