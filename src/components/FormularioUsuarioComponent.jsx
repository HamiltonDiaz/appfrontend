import React from 'react'

const FormularioUsuarioComponent = () => {
    return (
      
        <div className="row g-2 mb-3">
        <div className="col">
            <input type="text" className="form-control" id="primerNombre" placeholder="Primer Nombre" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="otroNombre" placeholder="Otro Nombre" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="primerApellido" placeholder="Primer Apellido" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="segundoApellido" placeholder="Segundo Apellido" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="numeroIdentificacion"
                placeholder="Número de Identificación" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="nombreUsuario" placeholder="Nombre de Usuario" />
        </div>
        <div className="col">
            <input type="email" className="form-control" id="email" placeholder="Email" />
        </div>
        <div className="col">
            <input type="text" className="form-control" id="telefono" placeholder="Teléfono" />
        </div>
        <div className="col">
            <button className="btn btn-success btn-custom" id="registrarBtn">Registrar</button>
            <button className="btn btn-danger btn-custom" id="eliminarBtn">Eliminar</button>
        </div>
    </div>
)
}

export default FormularioUsuarioComponent
