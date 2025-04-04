"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { user_features, hospital_features } from "./data";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <WavyBackground>
        <section className="md:mt-[25%] mt-[50%]  pb-20 px-4 ">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 ">
              <AuroraText>Secure Healthcare Records on Blockchain</AuroraText>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform healthcare record management with MedLink&apos;s secure,
              patient-centric blockchain solution.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => router.push("/auth")}>
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/learn-more")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Features*/}
        <section className="mt-32 mb-32 px-4 backdrop-blur-xl bg-gray-900/10 dark:bg-gray-900/90 rounded-3xl pb-8 pt-4">
          <h1 className="font-semibold text-2xl md:text-4xl mt-8 ml-4">
            <BoxReveal boxColor="#d946ef">
              <span>Why Chose MedLink?</span>
            </BoxReveal>
          </h1>
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={user_features} />
          </div>
        </section>

        {/* Heathcare Providers*/}
        <section className="mt-32 mb-32 px-4 backdrop-blur-xl bg-gray-900/10 dark:bg-gray-900/90 rounded-3xl pb-8 pt-4">
          <h1 className="font-semibold text-2xl md:text-4xl mt-8 ml-4">
            <BoxReveal boxColor="#d946ef">
              <span>Benefit For Healthcare Providers</span>
            </BoxReveal>
          </h1>
          <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={hospital_features} />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 rounded-t-2xl">
          <div className="container mx-auto px-4 pt-12">
            <div className="flex justify-around  gap-8">
              <div>
                <h3 className="font-semibold mb-1">Company</h3>
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-[2px] w-28 ml-[-4px] mb-1"></div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Legal</h3>
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-[2px] w-28 ml-[-4px] mb-1"></div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} MedLink. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </WavyBackground>
    </div>
  );
}
