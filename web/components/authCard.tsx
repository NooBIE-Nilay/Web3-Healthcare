"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SigninSchema, SignupSchema } from "@/lib/types";
const HTTP_URL = "http://localhost";
export default function AuthCard({
  createAccount,
}: {
  createAccount: boolean;
}) {
  const router = useRouter();
  //TODO: Change Cards to include Forms and use react useForms Hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignin() {
    const parsedData = SigninSchema.safeParse({ email, password });
    if (!parsedData || parsedData.error) {
      alert(parsedData.error.message);
      console.log(parsedData.error);
      return;
    }
    setEmail("");
    setPassword("");
    try {
      const res = await axios.get(HTTP_URL + "/signin", {
        headers: {
          ...parsedData.data,
        },
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        router.push("/");
      } else {
        console.log(res.data);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) alert(e.response.data.message);
      } else {
        console.log("Error", e);
      }
    }
  }

  async function handleSignup() {
    const parsedData = SignupSchema.safeParse({ name, email, password });
    if (!parsedData || parsedData.error) {
      alert(parsedData.error.message);
      console.log(parsedData.error);
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
    try {
      const res = await axios.post(HTTP_URL + "/signup", {
        ...parsedData.data,
      });
      console.log(res.request);
      if (res.status === 400 || res.status !== 201) {
        alert(res.data.message);
        console.log(res.data);
        return;
      }
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response) alert(e.response.data.message);
      }
    }
  }

  return (
    <Tabs
      defaultValue={createAccount ? "signup" : "signin"}
      className="w-[400px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Existing Account</TabsTrigger>
        <TabsTrigger value="signup">Create New Account</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to Your Existing Account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Create New Account</CardTitle>
            <CardDescription>
              Fill out the form to create a new Account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Name</Label>
              <Input
                id="current"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Email</Label>
              <Input
                id="current"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                id="new"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignup}>Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
