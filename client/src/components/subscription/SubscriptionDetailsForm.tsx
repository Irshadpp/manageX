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
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { apiRequest } from "@/services/api/commonRequest";
import { storeObject } from "@/utils/local-storage";
import useStripe from "@/hooks/useStripe";
// import getStripe from "@/util/getStripe";
// import { loadStripe } from "@stripe/stripe-js";

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
  zipcode: z
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {user} = useSelector((state: RootState) => state.auth);
  const stripe = useStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

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
      zipcode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const address = {
        line1: values.street,
        city: values.city,
        state: values.state,
        country: values.country,
        postal_code: values.zipcode,
      };

      if (user) {
        console.log(user, "........................")
        const response = await apiRequest({
            url: import.meta.env.VITE_BACKEND_URL,
          method: "POST",
          route: "/api/v1/subscription",
          headers: {
            "Content-Type": "application/json",
          },
          data: { address, name: values.name, price: value, email: user.email },
        });
        setLoading(false);

        if (!response.success) {
          setError(response.error);
        }
        storeObject("subscription_sessionId", response.data.sessionId);
        console.log(response.data.sessionId, "-----------------------")
        console.log('Stripe instance:', stripe);
        if (stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
          });
          console.log(
            "DetailsForm onSubmit result",
            result
          );
        }
      }
    } catch (error) {
      console.log("DetailsForm error", error);
    }
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
          name="zipcode"
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
