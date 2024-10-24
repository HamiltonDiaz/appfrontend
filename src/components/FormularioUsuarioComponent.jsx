import React, { useState, useEffect } from 'react'
import RegistroUsuarioComponent from './RegistroUsuarioComponent';

const FormularioUsuarioComponent = ({ userData, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        primer_nombre: '',
        otros_nombres: '',
        primer_apellido: '',
        segundo_apellido: '',
        telefono: '',
        numero_identificacion: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData.id || '',
                name: userData.name || '',
                email: userData.email || '',
                password: userData.password || '',
                password_confirmation: userData.password_confirmation || '',
                primer_nombre: userData.primer_nombre || '',
                otros_nombres: userData.otros_nombres || '',
                primer_apellido: userData.primer_apellido || '',
                segundo_apellido: userData.segundo_apellido || '',
                telefono: userData.telefono || '',
                numero_identificacion: userData.numero_identificacion || ''
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="div">
                <div className="mb-3">
                    <label htmlFor="idNumber" className="form-label">Número de identificación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idNumber"
                        name="numero_identificacion"
                        value={formData.numero_identificacion}
                        onChange={handleChange}
                        placeholder="Ingrese número de identificación"
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName" className="form-label">Primer Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="primer_nombre"
                            value={formData.primer_nombre}
                            onChange={handleChange}
                            placeholder="Primer Nombre"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="otherNames" className="form-label">Otros Nombres</label>
                        <input
                            type="text"
                            className="form-control"
                            id="otherNames"
                            name="otros_nombres"
                            value={formData.otros_nombres}
                            onChange={handleChange}
                            placeholder="Otros Nombres"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName" className="form-label">Primer Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="primer_apellido"
                            value={formData.primer_apellido}
                            onChange={handleChange}
                            placeholder="Primer Apellido"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="secondLastName" className="form-label">Segundo Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="secondLastName"
                            name="segundo_apellido"
                            value={formData.segundo_apellido}
                            onChange={handleChange}
                            placeholder="Segundo Apellido"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre de Usuario"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono móvil</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono móvil"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password_confirmation" className="form-label">Confirmar Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirme su contraseña"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </div>
        </form>

    )
}
export default FormularioUsuarioComponent
