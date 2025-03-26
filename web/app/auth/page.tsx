import AuthCard from "@/components/authCard";

export default function Signin() {
  return (
    <div className="max-w-[1000px] my-0 mx-auto py-0 px-[40px] flex justify-center items-center h-full mt-40">
      <AuthCard createAccount={false} />
    </div>
  );
}
