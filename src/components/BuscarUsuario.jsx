import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { findUser, listUsers } from "../services/UserService";
import { toast } from "react-toastify";
import { listProyect, listProyectById } from "../services/ProyectService";

const BuscarUsuario = ({ setState, buscar }) => {
    const { handleSubmit, reset, register } = useForm();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: buscar == 'Usuario' ? findUser : listProyectById,
        onError: (err) => {
            toast(err.message);

        },
        onSuccess: (data) => {
            if (!data.success) {
                toast.error(data.message);
            } else {

                toast.success(data.message);
                console.log(data);
                if (buscar == 'Usuario') {
                    setState([data.data]);
                } else {
                    setState([data.data.proyecto]);
                }
                if (buscar == 'Usuario') {
                    queryClient.invalidateQueries("users");
                }
                reset();
            }
        }
    });

    const listarAllMutate = useMutation({
        mutationFn: buscar == 'Usuario' ? listUsers : listProyect,
        onError: (err) => {
            toast(err.message);

        },
        onSuccess: (data) => {
            setState(data.data);
        }

    })
    const onSumitb = (data) => {
        if (data.id == "") {
            toast.info("Ingrese un valor valido");
            return;
        }
        mutate(data.id)
    };

    const listarAll = () => {
        if (buscar == 'Usuario') {
            listarAllMutate.mutate('users/list-all')
        } else {
            listarAllMutate.mutate()
        }
    }

    return (
        <div className="input-container">
            <form onSubmit={handleSubmit(onSumitb)}>
                <input
                    type="text"
                    placeholder={`Ingresa el Identificador del ${buscar}`}
                    className="custom-input"
                    {...register('id')}
                />
                <button className="custom-button">
                    Buscar
                </button>
            </form>
            <button className="custom-button" onClick={listarAll}>Listar todo los {buscar}</button>
        </div>
    )
}

export default BuscarUsuario