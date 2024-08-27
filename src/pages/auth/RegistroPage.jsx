import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom"
import { createUser } from "../../services/AuthService"
const RegistroPage = () => {


    const { handleSubmit, register, reset } = useForm();

    const onSubmit = (data) => {
        createUser(data);
        reset();
    }

    return (
        <>
            <div className="background-page">
                <div className="register-container">
                    <div className="register-box">
                        <h2>Registro</h2>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="form-row">
                                <label htmlFor="tipoDocumento" />
                                <label htmlFor="identificacion" />
                            </div>
                            <div className="form-row">
                                <select id="tipoDocumento" required {...register('tipoDocumento')}>
                                    <option value="CC">Cédula de Ciudadanía</option>
                                    <option value="TI">Tarjeta de Identidad</option>
                                    <option value="CE">Cédula de Extranjería</option>
                                </select>
                                <input
                                    type="text"
                                    id="identificacion"
                                    placeholder="Número de identificación"
                                    {...register('identificacion')} />
                            </div>

                            <div className="form-row">
                                <label htmlFor="primerNombre"></label>
                                <label htmlFor="otrosNombres"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    id="primerNombre"
                                    placeholder="Primer Nombre" required
                                    {...register('primerNombre')} />

                                <input
                                    type="text"
                                    id="otrosNombres"
                                    placeholder="Otros Nombres"
                                    {...register('otrosNombre')} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="primerApellido"></label>
                                <label htmlFor="segundoApellido"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="text"
                                    id="primerApellido"
                                    placeholder="Primer Apellido"
                                    {...register('primerApellido')} />

                                <input
                                    type="text"
                                    id="segundoApellido"
                                    placeholder="Segundo Apellido" required
                                    {...register('segundoApellido')} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="nombreUsuario"></label>
                                <label htmlFor="correoElectronico"></label>
                            </div>
                            <div className="form-row1">
                                <input
                                    type="text"
                                    id="nombreUsuario"
                                    placeholder="Nombre de Usuario"
                                    {...register('nombreUsuario')} />

                            </div>
                            <div className="form-row2">
                                <input
                                    type="email"
                                    id="correoElectronico"
                                    placeholder="Correo electrónico" required
                                    {...register('correoElectronico')} />
                            </div>

                            <div className="form-row">
                                <label htmlFor="telefonoMovil"></label>
                                <label htmlFor="contrasena"></label>
                            </div>
                            <div className="form-row">
                                <input
                                    type="tel"
                                    id="telefonoMovil"
                                    placeholder="Teléfono móvil" required
                                    {...register('telefonoMovil')} />
                                <input
                                    type="password"
                                    id="contrasena"
                                    placeholder="Contraseña" required
                                    {...register('contrasena')} />
                            </div>
                            <button type="submit" >Registrarse</button>
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