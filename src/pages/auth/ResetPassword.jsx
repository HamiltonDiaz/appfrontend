import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../services/AuthService';
import { toast, ToastContainer } from 'react-toastify'

const ResetPassword = () => {

    const { register, handleSubmit, reset } = useForm();
    const { token } = useParams();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            data.success ? toast.success(data.message) : toast.error(data.message)
            setTimeout(() => { navigate('/login') }, 3000)
        },
        onError: (err) => {

            toast.error(err.message);
        }
    });

    const onSubmit = (data) => mutate(data);

    return (
        <div className="background-page">
            <ToastContainer />
            <div className="container-olvido">

                <h2>Recuperación</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input type="email" id="email" placeholder="Ingrese correo electrónico" required  {...register('email')} />
                    <input className="recuperar-passsword" type="password" id="password" placeholder="Contraseña" required  {...register('password')} />
                    <input className="recuperar-passsword" type="password" id="password_confirmation" placeholder="Confirmar contraseña" required  {...register('password_confirmation')} />
                    {/* <input type="hidden" value={token} id="token" {...register("token")} /> */}
                    <input type="submit" value="Recuperar" />
                </form>
            </div>
        </div>
    )
}

export default ResetPassword