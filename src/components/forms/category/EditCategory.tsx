"use client";

import ImageUpload from "@/components/page/profile/ImageUpload";
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
import { revalidate } from "@/helpers/revalidateHelper";
import { editCategoryFormSchema } from "@/schemas/formSchemas/category/editCategory";
import { ICategory } from "@/types/category";
import { myFetch } from "@/utils/myFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const EditCategoryForm = ({ category }: { category: ICategory }) => {
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>(
    category?.subCategory || []
  );
  const [file, setFile] = useState<File | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof editCategoryFormSchema>>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: { ...category },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editCategoryFormSchema>) {
    toast.loading("Updating...", { id: "update-category" });

    const formData = new FormData();
    formData.append("id", category._id.toString());
    if (file) formData.append("image", file);
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value ?? "");
    });
    if (subCategories.length > 0)
      formData.append("subCategory", JSON.stringify(subCategories));

    // perform api call
    try {
      const res = await myFetch("/admin/categories", {
        method: "PATCH",
        body: formData,
      });
      if (res?.success) {
        toast.success("Category updated successfully", {
          id: "update-category",
        });
        revalidate("categories");
        // reload page to close modal
        window.location.reload();
      } else {
        toast.error(res?.message || "Failed to update", {
          id: "update-category",
        });
      }
    } catch (error) {
      toast.error("Failed to update", { id: "update-category" });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-semibold text-center">Edit Category</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <ImageUpload setFile={setFile} user={category} />
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
          {subCategories.length > 0 && (
            <h2 className="font-medium mb-2">Sub-Categories</h2>
          )}
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
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
