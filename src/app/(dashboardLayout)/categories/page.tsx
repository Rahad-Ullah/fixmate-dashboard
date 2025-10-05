/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCategoryForm from "@/components/forms/category/AddCategory";
import Modal from "@/components/modals/Modal";
import CategoryCard from "@/components/page/categories/CategoryCard";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { myFetch } from "@/utils/myFetch";
import { Plus } from "lucide-react";

const CategoriesPage = async ({ searchParams }: { searchParams: any }) => {
  const { searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/admin/categories?${queryParams.toString()}`, {
    tags: ["categories"],
  });
  const categories = res?.data?.data;

  return (
    <div className="w-full min-h-full flex flex-col">
      {/* page header */}
      <section className="flex flex-wrap justify-between items-center gap-4 pb-6">
        <PageTitle>Category Management</PageTitle>
        <div>
          <Modal
            dialogTrigger={
              <Button className="bg-gradient-to-r from-primary-foreground to-primary rounded-full">
                <Plus /> Add New Category
              </Button>
            }
            className="max-w-[30vw] p-6 bg-secondary-foreground"
          >
            <AddCategoryForm />
          </Modal>
        </div>
      </section>

      {/* category list */}
      <section className="grid grid-cols-3 gap-4 p-4">
        {categories?.map((category: any) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategoriesPage;
