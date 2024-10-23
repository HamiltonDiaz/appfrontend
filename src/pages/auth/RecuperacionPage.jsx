import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { forgot } from '../../services/AuthService.js'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from "react"


const RecuperacionPage = () => {
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useMutation({
        mutationFn: forgot,
        onSuccess: (data) => {
            setIsLoading(false);
            toast.success(data.message);
        },
        onError: (err) => {
            setIsLoading(false);
            toast.error(err.message);
        }
    });

    const onSubmit = (data) => {
        setIsLoading(true);
        mutate(data)
    };

    useEffect(() => {
        if (isLoading) {
            toast('Procesando...')
        }
    }, [isLoading])


    return (
        <>
            <ToastContainer />
            <div className="background-page">
                <div className="container-olvido">

                    <h2>Recuperación</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email" className="email-recuperar">Email</label>
                        <input type="email" id="email" placeholder="Ingrese correo electrónico" required  {...register('email')} />
                        <input type="submit" value="Recuperar" />
                    </form>
                    <Link className="login" to="/login">Ir a Login</Link>
                </div>
            </div>
        </>
    )
}

export default RecuperacionPage