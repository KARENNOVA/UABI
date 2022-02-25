
import { Table } from '../../../utils/ui';

const Master_formatsList = () => {

    let documents = [
        {
            id: '1',
            module: 'Inspección',
            name: "Informe de Inspección",
            filename: "InformeDeInspeccion"
        },
        {
            id: '2',
            module: 'Disposición',
            name: "Estudio Previo para arrendamiento de Bien Inmueble",
            filename: "EstudioPrevioArrendamiento"
        },
        {
            id: '3',
            module: 'Disposición',
            name: "Estudio Previo para comodato de Bien Inmueble",
            filename: "EstudioPrevioComodato"
        },
        {
            id: '4',
            module: 'Disposición',
            name: "Estudio Previo para Administración del Espacio Público de Bien Inmueble",
            filename: "EstudioPrevioUsoPublico"
        },
        {
            id: '5',
            module: 'Disposición',
            name: "Contrato de Arrendamiento Bien Inmueble",
            filename: "ContratodeArrendamiento"
        },
        {
            id: '6',
            module: 'Disposición',
            name: "Contrato de Comodato Bien Inmueble",
            filename: "ContratodeComodato"
        },

    ]
    const table_columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            responsive: ['md'],
            align: 'center' as 'center',
        },
        {
            title: 'Módulo',
            dataIndex: 'module',
            responsive: ['md'],
            align: 'left' as 'left',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'left' as 'left',
        },
        {
            title: 'Descargar',
            dataIndex: 'filename',
            align: 'center' as 'center',
            render: (filename) => {
                return (

                    <a href={`/${filename}.docx`} target="_blank" download={`${filename}.docx`} ><i className="fa fa-file-text" aria-hidden="true"/></a>
                    // <i className="fa fa-file-text" aria-hidden="true" onClick={() => document_link(id)}/>
                    // <Link
                    //     to={""/*document_link(id)*/}
                    //     name=""
                    //     avatar={false}
                    //     icon={<i className="fa fa-file-text" aria-hidden="true" />}
                    // />
                );
            },

        },
    ];
return (
    <Table
        columns={table_columns}
        items={documents}
        with_pagination
    // count={}
    // change_page={}
    // loading={}
    />
)
}

export default Master_formatsList
