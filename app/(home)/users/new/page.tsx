import BackButton from "@/src/components/BackButton";
import UserForm from "@/src/components/users/userForm";

const NewUserPage = () => {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <div className="overflow-auto my-5 bg-white p-6 dark:bg-slate-900">
        <UserForm />
      </div>
    </>
  );
};
export default NewUserPage;
