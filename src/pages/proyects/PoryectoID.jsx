import { useParams } from "react-router-dom"
import { listProyectById } from "../../services/ProyectService";
import { useQuery } from "@tanstack/react-query";
import { IntlProvider, FormattedDate } from "react-intl";
import "./ProyectoID.css";
import Historial from "../../components/Historial";
import Integrantes from "../../components/Integrantes";
import AgregarIntegrante from "../../components/AgregarIntegrante";

const PoryectoID = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["proyectID"],
        queryFn: () => listProyectById(id),
    });

    if (isLoading) return <p>Cargando...</p>;
    const proyecto = data.data.proyecto;
    const historico = data.data.historico;
    const integrantes = data.data.integrantes;
    console.log(integrantes);



    return (
        <main className="content">
            <div>
                <h1 className="uppercase">{proyecto.titulo}</h1>

                <p className="label-proyect">Descripción del proyecto: <span>{proyecto.descripcion}</span></p>

                <p className="label-proyect">Fecha de Inicio: <span><IntlProvider locale="es">
                    <FormattedDate value={proyecto.fechainicio} year="numeric" month="long" day="numeric" />
                </IntlProvider></span></p>

                <p className="label-proyect">Fecha de Finalización: <span><IntlProvider locale="es">
                    <FormattedDate value={proyecto.fechafin} year="numeric" month="long" day="numeric" />
                </IntlProvider></span></p>


                <p className="label-proyect">Fecha de Creación:  <span><IntlProvider locale="es">
                    <FormattedDate value={proyecto.created_ap} year="numeric" month="long" day="numeric" />
                </IntlProvider></span></p>


                <p className="label-proyect">Fecha de la ultima actualización: <span><IntlProvider locale="es">
                    <FormattedDate value={proyecto.updated_at} year="numeric" month="long" day="numeric" />
                </IntlProvider></span> </p>
                <div className="palabras-clave">
                    <p className="label-proyect">Palabras Clave:</p>
                    {proyecto.palabras_claves.map((palabra, index) => <span className="clave" key={index}>{palabra}</span>)}
                </div>
                <AgregarIntegrante id_proyecto={id} />
                <Integrantes integrantes={integrantes} />
                <Historial historico={historico}></Historial>
            </div>
        </main>
    )
}

export default PoryectoID