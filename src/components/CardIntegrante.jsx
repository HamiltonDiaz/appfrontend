import React from 'react'

const CardIntegrante = ({ integrante }) => {
    return (
        <div className="user-card">
            <div className="profile-image">
                <img src="../user.svg" alt="User Profile" />
            </div>
            <h2 className="user-name">{integrante.nombre}</h2>
            <p className="user-title">Datos</p>
            <p className="user-description">Telefono: {integrante.telefono}</p>
            <p className="user-description">Identificación: {integrante.numero_identificacion}</p>

        </div>
    )
}

export default CardIntegrante