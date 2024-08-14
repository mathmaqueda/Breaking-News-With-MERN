import { useNavigate } from "react-router-dom";
import { AddUserContainer, ManageUserFormFooter, LabeledInputs } from "./ManageUser.styled.jsx";
import {
    deleteUser,
    editPassword,
    editUser,
    userLogged
} from "../../services/user.services.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input.jsx";
import Button from "../../components/Button.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { ResponseSpan } from "../../components/Navbar.styled.jsx";
import Cookies from "js-cookie";
import { passwordSchema, userSchema } from "../../Schemas/userSchema.js";
import { UserContext } from "../../Context/UserContext.jsx";

export default function ManageUser() {
    const passwordFormRef = useRef(null);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [editPasswordForm, setEditPasswordForm] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState("");

    const {
        register: registerUser,
        handleSubmit: handleRegisterUser,
        formState: { errors: errorsUser },
        setValue,
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            avatar: "",
            background: "",
        }
    });
    
    const {
        register: registerPassword,
        handleSubmit: handleRegisterPassword,
        formState: { errors: errorsPassword }
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
    });

    async function editUserSubmit(data) {
        console.log("edit user")
        try {
            await editUser(data, Cookies.get('userId'));
            const res = await userLogged();
            setUser(res.data);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUserSubmit() {
        const isConfirmed = window.confirm("Tem certeza de que deseja apagar este usuário?");

        if (isConfirmed) {
            try {
                await deleteUser(Cookies.get("userId"));
                Cookies.remove("userId");
                Cookies.remove("token");
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    }

    function showEditUserPassword() {
        setEditPasswordForm(!editPasswordForm);
        if (!editPasswordForm) {
            setTimeout(() => {
                const elementPosition = passwordFormRef.current?.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - 10; // Ajuste para incluir um pequeno offset se necessário
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }, 0);
        }
    }

    async function editPasswordSubmit(body) {
        try {
            await editPassword(body, Cookies.get("userId"));
            setEditPasswordForm(false);
        } catch (error) {
            setSubmitSuccess(error.response.data.message);
        }
    }

    useEffect(() => {
        async function findUserLogged() {
            try {
                const { data } = await userLogged();
                setValue("name", data.name || "");
                setValue("username", data.username || "");
                setValue("email", data.email || "");
                setValue("avatar", data.avatar || "");
                setValue("background", data.background || "");
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        findUserLogged();
    }, [setValue]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AddUserContainer>
            <h2>Atualizar usuário</h2>
            <form
                onSubmit={handleRegisterUser(editUserSubmit)}
            >
                <LabeledInputs>
                    <h4>Nome</h4>
                    <Input
                        type="text"
                        placeholder="Nome"
                        name="name"
                        register={registerUser}
                    />
                </LabeledInputs>
                {errorsUser.name && (
                    <ResponseSpan>{errorsUser.name.message}</ResponseSpan>
                )}
                <LabeledInputs>
                    <h4>Nome de usuário</h4>
                    <Input
                        type="text"
                        placeholder="Nome de usuário"
                        name="username"
                        register={registerUser}
                    />
                </LabeledInputs>
                {errorsUser.username && (
                    <ResponseSpan>{errorsUser.username.message}</ResponseSpan>
                )}
                <LabeledInputs>
                    <h4>E-mail</h4>
                    <Input
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        register={registerUser}
                    />
                </LabeledInputs>
                {errorsUser.email && (
                    <ResponseSpan>{errorsUser.email.message}</ResponseSpan>
                )}
                <Button
                    type="button"
                    text={editPasswordForm ? "Cancelar" : "Alterar senha"}
                    onClick={showEditUserPassword}
                />
                <LabeledInputs>
                    <h4>Avatar</h4>
                    <Input
                        type="text"
                        placeholder="Avatar do perfil"
                        name="avatar"
                        register={registerUser}
                    />
                </LabeledInputs>
                {errorsUser.avatar && (
                    <ResponseSpan>{errorsUser.avatar.message}</ResponseSpan>
                )}
                <LabeledInputs>
                    <h4>Plano de fundo</h4>
                    <Input
                        type="text"
                        placeholder="Imagem de fundo"
                        name="background"
                        register={registerUser}
                    />
                </LabeledInputs>
                {errorsUser.background && (
                    <ResponseSpan>{errorsUser.background.message}</ResponseSpan>
                )}

                <ManageUserFormFooter>
                    <Button
                        type="button"
                        text="Voltar"
                        onClick={() => navigate("/profile")}
                    />
                    <Button
                        type="submit"
                        text="Atualizar"
                    />
                    <Button
                        color="danger"
                        type="button"
                        text="Apagar perfil"
                        onClick={deleteUserSubmit}
                    />
                </ManageUserFormFooter>

            </form>
            {editPasswordForm && (
                    <form ref={passwordFormRef} onSubmit={handleRegisterPassword(editPasswordSubmit)}>
                        <h2>Atualizar senha</h2>
                        {submitSuccess && (<ResponseSpan>{submitSuccess}</ResponseSpan>)}
                        <LabeledInputs>
                            <Input
                                type="password"
                                placeholder="Senha atual"
                                name="currentPassword"
                                register={registerPassword}
                            />
                        </LabeledInputs>
                        {errorsPassword.currentPassword && (
                            <ResponseSpan>{errorsPassword.currentPassword.message}</ResponseSpan>
                        )}
                        <LabeledInputs>
                            <Input
                                type="password"
                                placeholder="Senha nova"
                                name="newPassword"
                                register={registerPassword}
                            />
                        </LabeledInputs>
                        {errorsPassword.newPassword && (
                            <ResponseSpan>{errorsPassword.newPassword.message}</ResponseSpan>
                        )}
                        <LabeledInputs>
                            <Input
                                type="password"
                                placeholder="Confirmar senha nova"
                                name="confirmNewPassword"
                                register={registerPassword}
                            />
                        </LabeledInputs>
                        {errorsPassword.confirmNewPassword && (
                            <ResponseSpan>{errorsPassword.confirmNewPassword.message}</ResponseSpan>
                        )}
                        {errorsPassword.confirmPassword && <ResponseSpan>{errorsPassword.confirmPassword.message}</ResponseSpan>}
                        <span>
                            <Button
                                type="submit"
                                text={"Confirmar"}
                            />
                        </span>
                    </form>
                )}
        </AddUserContainer>
    );
}
