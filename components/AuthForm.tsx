"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { Form } from "./ui/form";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const AuthForSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(8) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
  });

const AuthForm = ({ type }: { type: FormType }) => {

  const router =useRouter();
  const formSchema = AuthForSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success('Account create successfully!!, Please Sign In..');
        router.push('/sign-in');
        console.log("sign-up", values);
      } else {
        toast.success('Sign In Successfull completed');
        router.push('/');
        console.log("sign-in", values);
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an ${error}`);
    }
    console.log(values);
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="lg:min-w-[566px] card-border">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-6 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="">Prep Talk</h2>
        </div>
        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField name="name" control={form.control} label="Name" placeholder="enter your name" type="text" />
            )}
            <FormField name="email" control={form.control} label="Email" placeholder="enter your eamil" type="email" />
            <FormField
              name="password"
              control={form.control}
              label="Password"
              placeholder="enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="justify-center flex gap-2">
          {isSignIn ? "Not account yet" : "Have an account already"}
          <Link
            className="font-bold text-user-primary ml-1 hover:underline"
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            shallow
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
