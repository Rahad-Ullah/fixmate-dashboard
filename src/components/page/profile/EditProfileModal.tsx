"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { editProfileFormSchema } from "@/schemas/formSchemas/profile/editProfile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userGenders } from "@/constants/user";

const EditProfileModal = ({ user }) => {
  const [file, setFile] = useState<File | string | null>(user.image);

  // 2. Define your form.
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: user,
  });

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
    toast.loading("Updating...", {
      id: "update-profile",
    });
    console.log(values, file);

    try {
      // perform the API call to update the user profile

      toast.error("Failed to update profile", {
        id: "update-profile",
      });
    } catch (error) {
      toast.error("Failed to update", {
        id: "update-profile",
      });
      console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-primary text-base">
          <Pencil /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[40vw] max-h-[95vh] overflow-y-scroll no-scrollbar grid gap-6 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-primary font-medium text-xl">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Upload Profile Image</Label>
          <ImageUpload setFile={setFile} user={user} />
        </div>
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 lg:space-y-0 lg:grid gap-6"
            >
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="me@example.com"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234567890"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userGenders?.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit button */}
              <DialogFooter className="col-span-2">
                <Button
                  type="submit"
                  className="md:px-16 bg-gradient-to-r from-primary-foreground to-primary rounded-md"
                >
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
