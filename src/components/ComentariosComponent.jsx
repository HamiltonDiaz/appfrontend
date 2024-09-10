import React from 'react'

const ComentariosComponent = () => {
    return (
        <>
            {/* Comentarios y Gráficas  */}
            <div className="row">
                <div className="col-md-8 comments">
                    <h4><i className="bi bi-chat-left-text"></i> COMENTARIOS</h4>
                    {/* Contenido de comentarios  */}
                </div>
                <div className="col-md-4 chart">
                    <h4><i className="bi bi-bar-chart"></i> Gráfica</h4>
                    {/* Gráfica insertada  */}
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </>
    )
}

export default ComentariosComponent