import React from 'react'
import { IntlProvider, FormattedDate } from "react-intl";

const Historial = ({ historico }) => {
    return (
        <section className="project-form">
            <div className="accordion accordion-flush" id="accordionFlushExample2">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne2"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne2"
                        >
                            Historial
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne2"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample2"
                    >
                        <div className="accordion-body">
                            <div
                                className="btn-group mt-3"
                                role="group"
                                aria-label="Basic example"
                                style={{ flexWrap: "wrap" }}
                            >
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Cambio</th>
                                        </tr>
                                    </thead>
                                    <tbody id="userTableBody">
                                        {historico.map((cambios, index) => <tr key={index}>
                                            <td>
                                                <IntlProvider locale="es">
                                                    <FormattedDate value={cambios.fecha} year="numeric" month="long" day="numeric" />
                                                </IntlProvider>
                                            </td>
                                            <td>{cambios.descripcion}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Historial