import PersonalInfoChangingForm from "./_components/PersonalInfoChangingForm";
import PasswordChangingForm from "./_components/PasswordChangingForm";

const Settings = () => {
  return (
    <div className="flex flex-col gap-5 pt-8">
      <h1 className="font-dm text-3xl ">Settings</h1>
      <div className="bg-white p-4 rounded-sm w-[700px] border-gray-200 border">
        <p className="font-dm text-xl ">Personal info</p>
        <PersonalInfoChangingForm />
      </div>
      <div className="bg-white p-4 rounded-sm w-[700px] border-gray-200 border">
        <p className="font-dm text-xl ">Change password</p>
        <PasswordChangingForm />
      </div>
    </div>
  );
};

export default Settings;
