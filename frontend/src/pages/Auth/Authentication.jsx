import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AuthContainer, Section } from "./Authentication.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseSpan } from "../../components/Navbar.styled";
import { signinSchema } from "../../Schemas/signinSchema";
import { signupSchema } from "../../Schemas/signupSchema";
import { signin, signup } from "../../services/user.services";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Authentication() {
    const [loginFailure, setLoginFailure] = useState(false);
    const {
        register: registerSignin,
        handleSubmit: handleSubmitSignin,
        setValue: setSigninValue,
        formState: { errors: errorsSignin }
    } = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        setValue: setSignupValue,
        formState: { errors: errorsSignup }
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
           name: "",
           email: "",
           password: "",
           confirmPassword: ""
        }
    });

    async function inHandleSubmit(data) {
        try {
            const res = await signin(data);
            Cookies.set("token", res.data.token, { expires: 1 });
            Cookies.set("userId", res.data.userId, { expires: 1 });
            navigate("/");
        } catch (err) {
            setLoginFailure(true);
        }
    }

    const navigate = useNavigate();

    async function upHandleSubmit(data) {
        try {
            const res = await signup(data);
            Cookies.set("token", res.data.token, { expires: 1 });
            Cookies.set("userId", res.data.userId, { expires: 1 });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <AuthContainer>
            <Section type="signin">
                <h2>Entrar</h2>
                <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
                    {loginFailure && <ResponseSpan>Usuário ou senha incorretos.</ResponseSpan>}
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        register={registerSignin}
                        setValue={setSigninValue}
                    />
                    {errorsSignin.email && <ResponseSpan>{errorsSignin.email.message}</ResponseSpan>}
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        register={registerSignin}
                        setValue={setSigninValue}
                    />
                    {errorsSignin.password && <ResponseSpan>{errorsSignin.password.message}</ResponseSpan>}
                    <Button type="submit" text="Entrar"></Button>
                </form>
            </Section>
            <Section type="signup">
                <h2>Cadastrar</h2>
                <form onSubmit={handleSubmitSignup(upHandleSubmit)}>
                    <Input
                        type="name"
                        placeholder="Nome"
                        name="name"
                        register={registerSignup}
                        setValue={setSignupValue}
                    />
                    {errorsSignup.name && <ResponseSpan>{errorsSignup.name.message}</ResponseSpan>}
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        register={registerSignup}
                        setValue={setSignupValue}
                    />
                    {errorsSignup.email && <ResponseSpan>{errorsSignup.email.message}</ResponseSpan>}
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        register={registerSignup}
                        setValue={setSignupValue}
                    />
                    {errorsSignup.password && <ResponseSpan>{errorsSignup.password.message}</ResponseSpan>}
                    <Input
                        type="password"
                        placeholder="Confirmar senha"
                        name="confirmPassword"
                        register={registerSignup}
                        setValue={setSignupValue}
                    />
                    {errorsSignup.confirmPassword && <ResponseSpan>{errorsSignup.confirmPassword.message}</ResponseSpan>}
                    <Button type="submit" text="Cadastrar"></Button>
                </form>
            </Section>
        </AuthContainer>
    );
}