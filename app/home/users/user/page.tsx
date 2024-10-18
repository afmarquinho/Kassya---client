import BackButton from "@/src/components/backButton";
import UserView from "@/src/components/users/userView";

const UserDetails = () => {
  return (
    <>
      <div className={`flex justify-end gap-5 mb-5`}>
        <BackButton />
      </div>
      <UserView />
    </>
  );
};
export default UserDetails;
