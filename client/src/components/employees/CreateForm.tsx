import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInputCustom from "@/components/custome/FormInputCustom";
import HiringDatePicker from "@/components/custome/HiringDatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/common/ImageUpload";
import { useEffect, useState } from "react";
import { uploadImage } from "@/utils/uploadImage";
import { apiRequest } from "@/services/api/commonRequest";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const employeeSchema = z.object({
  fName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Please give a valid role." }),
  phone: z
    .string()
    .min(8, { message: "Phone Number must be at least 10 numbers." }),
  email: z.string().email().min(2, { message: "Please give a valid email" }),
  username: z.string().min(2, { message: "Please give a valid username." }),
  employeeType: z
    .string()
    .min(2, { message: "Please give valid employee type." }),
  salary: z.string(),
  hiringDate: z.date().refine((date) => date <= new Date(), {
    message: "Hiring date cannot be in the future.",
  }),
  profileURL: z.string().optional(),
  gender: z.string().min(2, { message: "Please give valid gender." }),
  street: z
    .string()
    .min(2, { message: "Street must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  zipcode: z.string(),
});

const CreateForm = () => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [IslimitExceed, setIsLimitExceed] = useState(false);
  const navigate = useNavigate();

  const employeeResource = async () => {
    const res = await apiRequest({
      method: "GET",
      url: import.meta.env.VITE_BACKEND_URL,
      route: "/api/v1/employee/subscription-limit",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.success) {
      setIsLimitExceed(false);
    } else {
      setIsLimitExceed(true);
    }
  };
  useEffect(() => {
    employeeResource();
  }, []);

  const handleSubscriptionClick = () => {
    Swal.fire({
      title: "Subscription Required",
      text: "To create an employee, you need to subscribe. Redirecting you to the subscription page...",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Subscribe Now",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate("/owner/billing");
      }
    });
  
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fName: "",
      lName: "",
      role: "",
      phone: "",
      username: "",
      email: "",
      employeeType: "",
      gender: "",
      salary: "",
      hiringDate: new Date(),
      city: "",
      country: "",
      state: "",
      street: "",
      zipcode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof employeeSchema>) => {
    setLoading(true);
    const profileImageURL = selectedFile && (await uploadImage(selectedFile));
    if (profileImageURL) {
      values.profileURL = profileImageURL;
    }
    const res = await apiRequest({
      method: "POST",
      url: import.meta.env.VITE_BACKEND_URL,
      route: "/api/v1/employee",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...values },
    });

    if (!res.success) {
      setError(res?.errors[0]?.message || "Employee creation failed");
      return setLoading(false);
    }

    setLoading(false);
    navigate("/owner/employees/list");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-5">
        <div className="md:grid grid-cols-4 gap-10">
          <div>
            <ImageUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
            <FormField
              control={form.control}
              name="hiringDate"
              render={({ field }) => (
                <HiringDatePicker title="Hiring Date" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormInputCustom
                  type="number"
                  placeholder="Enter Salary"
                  field={field}
                  showTitle={true}
                  title="Salary"
                />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select Employee Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full time">Full Time</SelectItem>
                      <SelectItem value="part time">Part Time</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="fName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter First Name"
                    field={field}
                    showTitle={true}
                    title="First Name"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="lName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter Last Name"
                    field={field}
                    showTitle={true}
                    title="Last Name"
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Phone Number"
                  field={field}
                  showTitle={true}
                  title="Phone Number"
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Email"
                  field={field}
                  showTitle={true}
                  title="Email"
                />
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Username"
                  field={field}
                  showTitle={true}
                  title="Username"
                />
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization street"
                  title="Street"
                  showTitle={true}
                />
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization city"
                    title="City"
                    showTitle={true}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization state"
                    title="State"
                    showTitle={true}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization country"
                    title="Country"
                    showTitle={true}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization zipcode"
                  title="Zip Code"
                  showTitle={true}
                />
              )}
            />
            {/* <Button type="submit" className="mt-3">
              {loading ? "Creating..." : "Create Employee"}
            </Button> */}
            <Button
            className="mt-5"
              type={IslimitExceed ? "button" : "submit"}
              onClick={IslimitExceed ? handleSubscriptionClick : undefined}
            >
              {loading
                ? "Creating..."
                : IslimitExceed
                ? "Subscribe to Create Employee"
                : "Create Employee"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
