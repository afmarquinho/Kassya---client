import BackButton from "@/src/components/backButton";
import UserForm from "@/src/components/users/userForm";

const newUserPage = () => {
  return (
    <>
      <div className={`flex justify-end gap-5`}>
        <BackButton />
      </div>
      <div className="overflow-auto my-5 bg-white pt-8 px-5 pb-5 dark:bg-slate-900">
        <UserForm />
      </div>
    </>
  );
};
export default newUserPage;
