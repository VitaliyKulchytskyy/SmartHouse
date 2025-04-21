import { z } from "zod";
import { TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../components/Background";
import CenteredDiv from "../components/CenteredDiv";
import Button from "../ui/Button";
import TextFieldVisibility from "../ui/TextFieldVisibility";
import toast, { Toaster } from "react-hot-toast";
import toasterParams from "../configs/toaster.json" with { type: "json" };
import errorMessageWrapper from "../utils/errorMessageWrapper";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    login: z.string().min(4, "Enter your account name"),
    password: z.string().min(8, "Enter your password"),
});

export default function Welcome() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    let navigateTo = useNavigate();

    const onSubmit = (formResp) => {
        axios
            .post(
                "http://127.0.0.1:3001/user/signin",
                {
                    login: formResp["login"],
                    password: formResp["password"],
                },
                // { withCredentials: true },
            )
            .then((resp) => {
                Cookies.set("token", resp.data.token);
                navigateTo("/");
            })
            .catch((err) => {
                toast.error(errorMessageWrapper(err), toasterParams);
            });
    };

    return (
        <Background>
            <CenteredDiv>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    method="post"
                    className="flex flex-col justify-between items-center 
                            sm:h-auto h-3/4 sm:w-[600px] w-full sm:p-10 bg-white sm:rounded-4xl rounded-none shadow-2xl"
                >
                    <div className="p-10">
                        <h1 className="font-light text-4xl">Welcome!</h1>
                    </div>
                    <div className="flex flex-col w-full sm:px-0 px-4 h-[250px] justify-around">
                        <TextField
                            {...register("login")}
                            label="Login"
                            fullWidth
                            margin="normal"
                            error={!!errors.login}
                            required={true}
                            helperText={errors.login?.message}
                        />
                        <TextFieldVisibility
                            validation={register("password")}
                            label="Password"
                            error={!!errors.password}
                            required={true}
                            helperText={errors.password?.message}
                        />
                    </div>
                    <div className="w-full flex flex-col items-center pt-5">
                        <Button text="Sign in" type="submit" />
                        <div className="items-center sm:pt-3 p-3">
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="underline text-violet-600"
                                >
                                    Sign up!
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
                <Toaster position="bottom-right" />
            </CenteredDiv>
        </Background>
    );
}
