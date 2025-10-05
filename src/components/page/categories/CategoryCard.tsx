import EditCategoryForm from "@/components/forms/category/EditCategory";
import DeleteModal from "@/components/modals/DeleteModal";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types/category";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const handleDelete = async () => {
    "use server";
  };

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex justify-between items-center bg-[#E6EEFB] rounded-md p-2 px-3">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="flex gap-1">
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"}>
                <Pencil />
              </Button>
            }
            className="max-w-[30vw] p-6 bg-secondary-foreground"
          >
            <EditCategoryForm />
          </Modal>
          <DeleteModal
            triggerBtn={
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-red-500 hover:text-red-500 hover:bg-red-500/10"
              >
                <Trash2 />
              </Button>
            }
            title="Delete Category"
            description="Are you sure to delete this category?"
            action={handleDelete}
            itemId="123"
          />
        </div>
      </div>
      <ul className="list-disc list-inside grid gap-4 py-4 pl-6">
        {category?.subCategory &&
          category.subCategory.map((subCategory, idx: number) => (
            <li key={idx}>{subCategory}</li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
