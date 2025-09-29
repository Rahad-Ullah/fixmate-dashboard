"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategoryFormSchema } from "@/schemas/formSchemas/category/addCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddCategoryForm = () => {
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    // defaultValues: { ...product },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof addCategoryFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-center">Add Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h2 className="font-medium mb-2">Sub-Categories</h2>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {subCategories.map((subCategory, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <span>{subCategory}</span>
                <XCircleIcon
                  onClick={() =>
                    setSubCategories(
                      subCategories.filter((_, i) => i !== index)
                    )
                  }
                  className="size-5 text-red-500 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex gap-2 items-center">
          <FormItem className="w-full !mt-0">
            <FormLabel>Category Name</FormLabel>
            <FormControl className="mt-0">
              <div className="flex gap-2">
                <Input
                  onChange={(e) => setSubCategoryInput(e.target.value)}
                  placeholder="Enter sub-category name"
                  className="h-10"
                />
                <Button
                  onClick={() =>
                    setSubCategories([...subCategories, subCategoryInput])
                  }
                  type="button"
                  variant={"outline"}
                >
                  <Plus />
                </Button>
              </div>
            </FormControl>
          </FormItem>
        </div>
        <div className="flex justify-center gap-2">
          <Button type="submit" className="rounded-md px-10">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCategoryForm;
