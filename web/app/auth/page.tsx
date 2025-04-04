"use client";
import AuthCard from "@/components/authCard";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Signin() {
  return (
    <div>
      <WavyBackground>
        <div className="max-w-[1000px] my-0 mx-auto py-0 px-[40px] flex justify-center items-center h-full mt-40">
          <AuthCard createAccount={false} />
        </div>
      </WavyBackground>
    </div>
  );
}
