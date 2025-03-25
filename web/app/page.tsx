"use client";
import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push("/doctor/upload");
        }}
      >
        Upload Record
      </Button>
      <Button
        onClick={() => {
          router.push("/auth");
        }}
      >
        Signup/Signin
      </Button>
      <ModeToggle />
    </div>
  );
}
