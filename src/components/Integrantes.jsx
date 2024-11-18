import React from 'react'
import CardIntegrante from './CardIntegrante'

const Integrantes = ({ integrantes }) => {
    return (
        <section className="project-form">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                        >
                            Integrantes
                        </button>
                    </h2>
                    <div
                        id="flush-collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className="accordion-body">
                            <div
                                className="btn-group mt-3"
                                role="group"
                                aria-label="Basic example"
                                style={{ flexWrap: "wrap" }}
                            >
                                <div className='seccion-integrantes'>
                                    {integrantes.length > 0 ?
                                        integrantes.map((integrante, index) => <CardIntegrante integrante={integrante} key={index}></CardIntegrante>)
                                        : <p>No hay integrantes en este proyecto</p>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Integrantes