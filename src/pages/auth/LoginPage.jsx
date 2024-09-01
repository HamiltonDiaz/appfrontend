import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUsuario } from '../../services/AuthService.js'

const LoginPage = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const usuario = await loginUsuario(data)
        localStorage.setItem('toke', JSON.stringify(usuario.token));
        navigate('/');
    }

    return (
        <>
            <div className="background-page">
                <div className="login-container">
                    <div className="register-box">
                        <h2>Bienvenido</h2>
                        <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="username">Usuario</label>
                            <input type="text" id="username" placeholder="Nombre de usuario" {...register('username')} />

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