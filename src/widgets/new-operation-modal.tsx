import AddOperationForm from "~/features/add-operation-form";

export default async function NewOperationModal() {
  return <AddOperationForm redirect="/dashboard" />;
}
