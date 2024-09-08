import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUsuario } from '../../services/AuthService.js'
import { toast, ToastContainer } from 'react-toastify'

const LoginPage = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: loginUsuario,
        onError: (err) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            navigate('/');
        },
    });
    const onSubmit = (data) => mutate(data);
    return (
        <>  <ToastContainer />
            <div className="background-page">
                <div className="login-container">
                    <div className="register-box">
                        <h2>Bienvenido</h2>
                        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="name">Usuario</label>
                            <input type="text" id="name" placeholder="Nombre de usuario" {...register('name')} />

                            <label htmlFor="password">Contraseña</label>
                            <input type="password" id="password" placeholder="Contraseña" {...register('password')} />
                            <input type="submit" value="Acceso" />
                        </form>
                        <div className="links">
                            <NavLink to="/registro">Registrarse</NavLink> | <NavLink to="/recuperacion">Recuperar contraseña</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage