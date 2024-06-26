import { useState, useCallback, useEffect, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { api } from "../../data/services/api";
import { getUserData } from "../../data/services/userService";

interface UserDataTypes {
    role: string;
}

export function useCreatePost() {
    const [userData, setUserData] = useState<UserDataTypes | null>(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [companyContent, setCompanyContent] = useState("");
    const [categories, setCategories] = useState<string>("");
    const [programmingLanguages, setProgrammingLanguages] = useState<string>("");
    const [deadline, setDeadline] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [userToken, setUserToken] = useState<string>("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const userToken = localStorage.getItem("userToken");

        api.defaults.headers.common["id"] = userId;
        api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

        setUserId(userId ?? "");
        setUserToken(userToken ?? "")

        return () => {
            delete api.defaults.headers.common["id"];
            delete api.defaults.headers.common["Authorization"];
        };
    }, []);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const user = await getUserData();
            setUserData(user);
        } catch (error) {
            console.error("Erro ao obter dados do usuário:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "subtitle":
                setSubtitle(value);
                break;
            case "isPaid":
                if (type === "checkbox") {
                    setIsPaid((e.target as HTMLInputElement).checked);
                } else {
                    setIsPaid(value === "true");
                }
                break;
            case "price":
                setPrice(value);
                break;
            case "content":
                setContent(value);
                break;
            case "companyContent":
                setCompanyContent(value);
                break;
            case "categories":
                setCategories(value);
                break;
            case "programmingLanguages":
                setProgrammingLanguages(value);
                break;
            case "deadline":
                setDeadline(value);
                break;
            default:
                break;
        }
    };



    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            setFiles(filesArray);
        }
    };

    const handleBothActions = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setUploading(true);

        try {
            const confirmed = await confirmSubmission();

            if (confirmed) {
                const postId = await handleFormSubmit(e);

                if (postId) {
                    await handleUpload(postId);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Seu post foi realizado com sucesso!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            setError("Erro ao enviar os arquivos ou o formulário. Por favor, tente novamente.");
            console.error("Erro ao enviar os arquivos ou o formulário:", error);
        } finally {
            setUploading(false);
        }
    };

    const handleFormSubmit = async (event: FormEvent): Promise<string | null> => {
        event.preventDefault();
        if (userData?.role === "user") {
            Swal.fire({
                icon: "error",
                title: "Acesso Negado",
                text: "Usuários comuns não têm permissão para criar posts.",
            });
            return null;
        }

        setLoading(true);
        try {
            const response = await api.post("/posts", {
                id: userId,
                token: "Bearer " + userToken,
                title,
                subtitle,
                content,
                isPaid,
                price,
                companyContent,
                categories,
                programmingLanguages,
                deadline,
            });

            const postId = response.data.postId;

            setLoading(false);
            console.log(postId)
            return postId;
        } catch (error) {
            console.error("Erro ao enviar o formulário:", error);
            setLoading(false);
            return null;
        }
    };

    const handleUpload = async (postId: string) => {
        try {
            setUploading(true);
            const formData = new FormData();
            files.forEach((file) => {
                formData.append(`files`, file);
            });

            const response = await api.post(`/upload-files/${userId}/${postId}`, formData);
            setSuccessMessage("Arquivos enviados com sucesso.");
            console.log("Arquivos enviados com sucesso:", response.data);
        } catch (error) {
            setError("Erro ao enviar os arquivos. Por favor, tente novamente.");
            console.error("Erro ao enviar os arquivos:", error);
        } finally {
            setUploading(false);
        }
    };

    const confirmSubmission = async () => {
        const result = await Swal.fire({
            title: "Você tem certeza?",
            text: "Deseja realmente fazer o post?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar",
        });
        return result.isConfirmed;
    };

    return {
        loading,
        handleBothActions,
        title,
        handleInputChange,
        subtitle,
        isPaid,
        price,
        content,
        handleFileChange,
        companyContent,
        categories,
        programmingLanguages,
        deadline,
        uploading,
        error,
        successMessage
    }
}