import EditCategoryForm from "@/components/forms/category/EditCategory";
import DeleteModal from "@/components/modals/DeleteModal";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { IMAGE_URL } from "@/config/env-config";
import { ICategory } from "@/types/category";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const handleDelete = async () => {
    "use server";
  };

  return (
    <div className="flex flex-col gap-3 bg-white p-3 rounded-md">
      <div className="flex justify-between items-center bg-[#E6EEFB] rounded-md p-2 px-3">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <div className="flex gap-1">
          <Modal
            dialogTrigger={
              <Button variant={"ghost"} size={"icon"}>
                <Pencil />
              </Button>
            }
            className="max-w-[30vw] max-h-[90vh] overflow-y-scroll no-scrollbar p-6 bg-secondary-foreground"
          >
            <EditCategoryForm category={category} />
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
      <section className="flex gap-2">
        <figure>
          <Image
            src={`${IMAGE_URL}${category.image}`}
            alt={category.name}
            width={300}
            height={200}
            className="rounded-md w-44 object-cover"
          />
        </figure>
        <ul className="list-disc list-inside grid gap-2 pt-4 pl-6 flex-1 h-fit">
          {category?.subCategory &&
            category.subCategory.map((subCategory, idx: number) => (
              <li key={idx}>{subCategory}</li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default CategoryCard;
