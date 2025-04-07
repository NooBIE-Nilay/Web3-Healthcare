"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { WavyBackground } from "@/components/ui/wavy-background";
import { doctor_options } from "../data";

const Page = () => {
  return (
    <div>
      <WavyBackground>
        <div className="mt-[100px] max-w-[1000px] ">
          <section className="backdrop-blur-xl bg-gray-900/10 dark:bg-gray-900/90 rounded-3xl px-10 py-10">
            <h1 className="p-4 text-3xl">Welcome {`{Doctor Name}`}</h1>
            <HoverEffect items={doctor_options} />
          </section>
        </div>
      </WavyBackground>
    </div>
  );
};
export default Page;
