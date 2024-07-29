import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { AuthContainer, Section } from "./Authentication.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSpan } from "../../components/Navbar.styled";
import { signinSchema } from "../../Schemas/signinSchema";
import { signupSchema } from "../../Schemas/signupSchema";
import { signin, signup } from "../../services/user.services";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function Authentication() {
    const {
        register: registerSignin,
        handleSubmit: handleSubmitSignin,
        formState: { errors: errorsSignin }
    } = useForm({
        resolver: zodResolver(signinSchema)
    });

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup }
    } = useForm({
        resolver: zodResolver(signupSchema)
    });

    async function inHandleSubmit(data) {
        try {
            const res = await signin(data);
            Cookies.set("token", res.data.token, { expires: 1 });
            Cookies.set("userId", res.data.userId, { expires: 1 });
            navigate("/");
        } catch (err) {
            console.log(err);
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
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        register={registerSignin}
                    />
                    {errorsSignin.email && <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>}
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        register={registerSignin}
                    />
                    {errorsSignin.password && <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>}
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
                    />
                    {errorsSignup.name && <ErrorSpan>{errorsSignup.name.message}</ErrorSpan>}
                    <Input
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        register={registerSignup}
                    />
                    {errorsSignup.email && <ErrorSpan>{errorsSignup.email.message}</ErrorSpan>}
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        register={registerSignup}
                    />
                    {errorsSignup.password && <ErrorSpan>{errorsSignup.password.message}</ErrorSpan>}
                    <Input
                        type="password"
                        placeholder="Confirmar senha"
                        name="confirmPassword"
                        register={registerSignup}
                    />
                    {errorsSignup.confirmPassword && <ErrorSpan>{errorsSignup.confirmPassword.message}</ErrorSpan>}
                    <Button type="submit" text="Cadastrar"></Button>
                </form>
            </Section>
        </AuthContainer>
    );
}