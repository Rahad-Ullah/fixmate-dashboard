import AddCategoryForm from "@/components/forms/category/AddCategory";
import EditCategoryForm from "@/components/forms/category/EditCategory";
import DeleteModal from "@/components/modals/DeleteModal";
import Modal from "@/components/modals/Modal";
import PageTitle from "@/components/shared/PageTitle";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";

const CategoriesPage = async () => {
  // Build query parameters for the backend request
  // const queryParams = new URLSearchParams({
  //   ...(role && { role }),
  //   ...(searchTerm && { searchTerm }),
  //   ...(page && { page }),
  // });

  // Fetch data from the backend when backend is ready
  // const res = await myFetch(`/user/users?${queryParams.toString()}`, {
  //   tags: ["users"],
  // });

  const handleDelete = async () => {
    "use server";
  };

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
      <section className="grid grid-cols-4 gap-4 p-4">
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between items-center bg-[#E6EEFB] rounded-md p-2 px-3">
            <h2 className="text-xl font-semibold">Electrician</h2>
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
            <li>Wiring & Installation</li>
            <li>Repairs & Maintenance</li>
            <li>Appliance Services</li>
            <li>Upgrades & Safety</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between items-center bg-[#E6EEFB] rounded-md p-2 px-3">
            <h2 className="text-xl font-semibold">Electrician</h2>
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
            <li>Wiring & Installation</li>
            <li>Repairs & Maintenance</li>
            <li>Appliance Services</li>
            <li>Upgrades & Safety</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between items-center bg-[#E6EEFB] rounded-md p-2 px-3">
            <h2 className="text-xl font-semibold">Electrician</h2>
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
            <li>Wiring & Installation</li>
            <li>Repairs & Maintenance</li>
            <li>Appliance Services</li>
            <li>Upgrades & Safety</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
