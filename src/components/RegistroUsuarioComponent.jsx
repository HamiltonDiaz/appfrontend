import React from 'react'

const RegistroUsuarioComponent = ({ user }) => {
    const { numero_identificacion,
        name,
        otros_nombres,
        primer_apellido,
        primer_nombre,
        segundo_apellido,
        telefono,
        email } = { ...user }

    return (
        <tr>
            <td>{numero_identificacion}</td>
            <td>{primer_nombre}</td>
            <td>{otros_nombres}</td>
            <td>{primer_apellido}</td>
            <td>{segundo_apellido}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{telefono}</td>
            <td>
                <button className="action-btn edit-btn"><i className="bi bi-pencil-square"></i></button>
                <button className="action-btn delete-btn"><i className="bi bi-trash"></i></button>
            </td>
        </tr>
    )
}

export default RegistroUsuarioComponent