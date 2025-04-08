"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { userSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { toast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/admin/actions/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUserForm = (user: User) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      password: user.password || "",
      role: user.role || "USER",
      profilePicture: user.profilePicture || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    if (!user.id) return;

    const typedValues = { ...values, role: values.role as "USER" | "ADMIN" };
    const result = await updateUser(user.id, typedValues);

    if (result.success) {
      toast({
        title: "Success",
        description: "User updated successfully.",
      });

      router.push("/admin/users");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter full name"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter email address"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter password"
                  {...field}
                  type="password"
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                User Role
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="book-form_input">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="book-form_input">
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Profile Picture
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a profile picture"
                  folder="users/profiles"
                  variant="light"
                  onFileChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          Create User
        </Button>
      </form>
    </Form>
  );
};
export default EditUserForm;
