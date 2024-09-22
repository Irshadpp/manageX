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
import React, { useState } from "react";
import { uploadImage } from "@/utils/uploadImage";
import { apiRequest } from "@/services/api/commonRequest";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/store/types/employee";

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
  email: z
    .string()
    .email()
    .min(2, { message: "Please give a valid email" }),
  username: z
    .string()
    .min(2, { message: "Please give a valid username." }),
  employeeType: z
    .string()
    .min(2, { message: "Please give valid employee type." }),
  salary: z.number(),
  hiringDate: z
    .date()
    .refine((date) => date <= new Date(), {
      message: "Hiring date cannot be in the future.",
    }),
  profileURL: z.string().optional(),
  gender: z
    .string()
    .min(2, { message: "Please give valid gender." }),
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

interface EditableEmployeeFormProps {
    employee: Employee; 
  }

const EditForm: React.FC<EditableEmployeeFormProps> = ({employee}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [error, setError] = useState("");
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); 
    setIsEditable((prev) => !prev); 
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fName: employee?.fName || "",
      lName: employee?.lName || "",
      role: employee?.role || "",
      phone: `${employee?.phone}` || "",
      username: employee?.username || "",
      email: employee?.email || "",
      employeeType: employee?.employeeType || "",
      gender: employee?.gender || "",
      salary: employee?.salary || 0,
      hiringDate: employee?.hiringDate ? new Date(employee.hiringDate) : new Date(),
        city: employee?.address?.city || "",
        country: employee?.address?.country || "",
        state: employee?.address?.state || "",
        street: employee?.address?.street || "",
        zipcode: employee?.address?.zipcode || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof employeeSchema>) => {
    setLoading(true);
    const profileImageURL = selectedFile && (await uploadImage(selectedFile));
    if (profileImageURL) {
      values.profileURL = profileImageURL;
    }
    const res = await apiRequest({
      method: "PATCH",
      url: import.meta.env.VITE_EMPLOYEE_URL,
      route: `/api/v1/employee/${employee.id}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {...values}
    });

    if(!res.success){
      setError(res?.errors[0]?.message || "Employee updation failed");
      return setLoading(false);
    }

    setLoading(false);
    setIsEditable(false); 
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-5 pb-5"
      >
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
                  disabled={!isEditable}
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
                    disabled={!isEditable}
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
                    disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                  disabled={!isEditable}
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
                    disabled={!isEditable}
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
                    disabled={!isEditable}
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
                    disabled={!isEditable}
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
                  disabled={!isEditable}
                />
              )}
            />
           {isEditable ? (
        <>
          <Button type="submit" className="mt-3">
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={handleEditClick}
            className="mt-3 mx-5 bg-muted"
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          type="button"
          onClick={handleEditClick}
          className="mt-3"
        >
          Edit Details
        </Button>
      )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
