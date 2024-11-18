import { IntlProvider, FormattedDate } from "react-intl";

const Modal = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null; // No renderizar el modal si está cerrado
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-titulo">
                    <h2 className="h2-modal-user">Tu Información</h2>
                    <button className="btn-close-modal" onClick={onClose}>
                        <img src="./close.svg" alt="" />
                    </button>
                </div>
                <p className="informacion_usuario">Nombre: <span>{user.primer_nombre}</span></p>
                {user.otros_nombres != null && <p className="informacion_usuario">Otros Nombres: <span>{user.otros_nombres}</span></p>}

                <p className="informacion_usuario">Primer Apellido: <span>{user.primer_apellido}</span></p>
                <p className="informacion_usuario">Segundo Apellido: <span>{user.segundo_apellido}</span></p>
                <p className="informacion_usuario">Nombre de Usuario: <span>{user.name}</span></p>
                <p className="informacion_usuario">Telefono: <span>{user.telefono}</span></p>
                <p className="informacion_usuario">Numero de Identificación: <span>{user.numero_identificacion}</span></p>
                <p className="informacion_usuario">Email: <span>{user.email}</span></p>

                <p className="informacion_usuario">Fecha de Registro: <span>
                    <IntlProvider locale="es">
                        <FormattedDate value={user.created_at} year="numeric" month="long" day="numeric" />
                    </IntlProvider>
                </span>
                </p>
                <p className="informacion_usuario">Fecha de Modificación: <span>
                    <IntlProvider locale="es">
                        <FormattedDate value={user.updated_at} year="numeric" month="long" day="numeric" />
                    </IntlProvider>
                </span></p>
            </div>
        </div>
    )
}

export default Modal