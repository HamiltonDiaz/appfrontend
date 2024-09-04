import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { recuperacionUsuario } from '../../services/AuthService.js'


const RecuperacionPage = () => {
    const { handleSubmit, register } = useForm();
    const onSubmit = (data) => {
        recuperacionUsuario(data)

    }
    console.log("ruta" + process.env.BACKEND_API_URL);


    return (
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
    )
}

export default RecuperacionPage