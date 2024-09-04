import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom"
import { createUser } from "../../services/AuthService"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const RegistroPage = () => {


    const { handleSubmit, register, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await createUser(data);
            toast(res.message);
            reset();
        } catch (error) {

        }


    }

    return (
        <>
            <div className="background-page">
                <ToastContainer />
                <div className="register-container">
                    <div className="register-box">
                        <h2>Registro</h2>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="form-row">
                                <label htmlFor="id_tipos_identificacion" />
                                <label htmlFor="numero_identificacion" />
                            </div>
                            <div className="form-row">
                                <select id="id_tipos_identificacion" required {...register('id_tipos_identificacion')}>
                                    <option value="1">Cédula de Ciudadanía</option>
                                    <option value="2">Tarjeta de Identidad</option>
                                    <option value="3">Cédula de Extranjería</option>
                                </select>
                                <input
                                    type="text"
                                    id="numero_identificacion"
                                    placeholder="Número de identificación"
                                    {...register('numero_identificacion')} />
                            </div>

                            <div className="form-row">
                                <label htmlFor="primerNombre"></label>
                                <label htmlFor="otrosNombres"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    id="primer_nombre"
                                    placeholder="Primer Nombre" required
                                    {...register('primer_nombre')} />

                                <input
                                    type="text"
                                    id="otros_nombres"
                                    placeholder="Otros Nombres"
                                    {...register('otros_nombres')} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="primerApellido"></label>
                                <label htmlFor="segundoApellido"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder="Primer Apellido"
                                    id="primer_apellido"
                                    {...register('primer_apellido')} />

                                <input
                                    type="text"
                                    id="segundo_apellido"
                                    placeholder="Segundo Apellido" required
                                    {...register('segundo_apellido')} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="name"></label>
                                <label htmlFor="correoElectronico"></label>
                            </div>
                            <div className="form-row1">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nombre de Usuario"
                                    {...register('name')} />

                            </div>
                            <div className="form-row2">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Correo electrónico" required
                                    {...register('email')} />
                            </div>

                            <div className="form-row">
                                <label htmlFor="telefono"></label>
                                <label htmlFor="contrasena"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="tel"
                                    id="telefono"
                                    placeholder="Teléfono móvil" required
                                    {...register('telefono')} />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Contraseña" required
                                    {...register('password')} />
                            </div>
                            <input type="submit" value="Registrarse" />
                        </form>
                        <div className="links">
                            <NavLink to="/login">Ir a Login</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistroPage