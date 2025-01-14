"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function RegisterForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <div className="bg-white flex flex-col justify-center items-center pt-20 ">
            <h2 className="text-4xl font-pops font-bold "> Register Now</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="mt-10"></div>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignContent: "center",
                                }}
                            >
                                <FormDescription>
                                    Please fill out this form with the required
                                    information
                                </FormDescription>
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl className="">
                                            <Input
                                                placeholder="victor"
                                                type="name"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="victor@gmail.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="********"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <FormMessage />
                                <Button
                                    type="submit"
                                    style={{
                                        display: "flex",
                                        backgroundColor: "#6E4FFE",
                                        justifyContent: "center",
                                        justifyItems: "center",
                                    }}
                                >
                                    Submit
                                </Button>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}

export default RegisterForm;
