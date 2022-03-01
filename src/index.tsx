import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './config/store';
import './utils/assets/styles/index.scss';
import TemplateProvider from './utils/components/template/template_context';
import ConfigProvider from 'antd/lib/config-provider';
import esES from 'antd/lib/locale/es_ES';
import _config from '@arcgis/core/config';

if (process.env.REACT_APP_ARGIS_KEY) {
    _config.apiKey = process.env.REACT_APP_ARGIS_KEY;
}

declare global {
    interface Window {
        __sabi: {
            cancel_mapper?: Object;
            number_formatter: Intl.NumberFormat;
            is_in_refresh: boolean;
            retry_pending: Array<any>;
            date_format: string;
        };
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

export enum Role {
    ADMINISTRATOR = 'Administrador',
    SUPERVISOR = 'Supervisor',
    ACQUISITION = 'Adquisiciónes',
    SABI = 'SABI',
    INSURABILITY = 'Asegurabilidad',
    INSPECTION = 'Inspeccion',
    PROVISION = 'Disposicion',
    SUPERVISION = 'Supervision',
    MAINTENANCE = 'Mantenimiento',
    BILLING = 'Facturacion',
}

export enum Permit {
    CREATE_USER = 'crear_Usuarios',
    DETAIL_USER = 'detalles_Usuarios',
    UPDATE_USER = 'actualizar_Usuarios',
    DELETE_USER = 'inactivar_Usuarios',
    CREATE_ROLE = 'crear_Roles',
    DETAIL_ROLE = 'detalles_Roles',
    UPDATE_ROLE = 'actualizar_Roles',
    DELETE_ROLE = 'inactivar_Roles',
    LIST_ROLE = 'listar_Roles',
    LIST_PERMIT = 'listar_Permisos',
    LIST_USER = 'listar_Usuarios',
    CREATE_POLICY = 'crear_Polizas',
    DETAIL_POLICY = 'detalles_Polizas',
    UPDATE_POLICY = 'actualizar_Polizas',
    DELETE_POLICY = 'inactivar_Polizas',
    LIST_POLICY = 'listar_Polizas',
    CREATE_INSURANCE_BROKER = 'crear_CorredorSeguros',
    DETAIL_INSURANCE_BROKER = 'detalles_CorredorSeguros',
    UPDATE_INSURANCE_BROKER = 'actualizar_CorredorSeguros',
    DELETE_INSURANCE_BROKER = 'inactivar_CorredorSeguros',
    LIST_INSURANCE_BROKER = 'listar_CorredorSeguros',
    CREATE_INSURANCE_COMPANY = 'crear_CompañiaAseguradora',
    DETAIL_INSURANCE_COMPANY = 'detalles_CompañiaAseguradora',
    UPDATE_INSURANCE_COMPANY = 'actualizar_CompañiaAseguradora',
    DELETE_INSURANCE_COMPANY = 'inactivar_CompañiaAseguradora',
    LIST_INSURANCE_COMPANY = 'listar_CompañiaAseguradora',
    CREATE_PROJECT = 'crear_Proyectos',
    DETAIL_PROJECT = 'detalles_Proyectos',
    UPDATE_PROJECT = 'actualizar_Proyectos',
    DELETE_PROJECT = 'inactivar_Proyectos',
    END_PROJECT = 'finalizar_Proyectos',
    LIST_PROJECT = 'listar_Proyectos',
    CREATE_REALESTATE = 'crear_BienesInmuebles',
    DETAIL_REALESTATE = 'detalles_BienesInmuebles',
    UPDATE_REALESTATE = 'actualizar_BienesInmuebles',
    DELETE_REALESTATE = 'inactivar_BienesInmuebles',
    LIST_REALESTATE = 'listar_BienesInmuebles',
    ASSIGN_ROLEPERMIT = 'asignar_RolesPermisos',
    DETAIL_REGISTROSAUDITORIA = 'detalles_RegistrosAuditoria',
    LIST_CONTRACTS = 'listar_Contratos',
    CREATE_CONTRACT = 'crear_Contratos',
    DETAIL_CONTRACT = 'detalles_Contratos',
    UPDATE_CONTRACT = 'actualizar_Contratos',
    DELETE_CONTRACT = 'inactivar_Contratos',
    ACTIVATE_CONTRACT = 'activar_Contratos',
    CREATE_PRECONTRACT = 'crear_EtapaPrecontractual',
    DETAIL_PRECONTRACT = 'visualizar_EtapaPrecontractual',
    UPDATE_PRECONTRACT = 'actualizar_EtapaPrecontractual',
    LIST_DISPOSITION = 'listar_Disposicion',
    CREATE_DISPOSITION = 'crear_Disposicion',
    DETAIL_DISPOSITION = 'detalles_Disposicion',
    UPDATE_DISPOSITION = 'actualizar_Disposicion',
    DELETE_DISPOSITION = 'inactivar_Disposicion',
    ACTIVATE_DISPOSITION = 'activar_Disposicion',
    LIST_INSPECTION = 'listar_Inspecciones',
    DETAIL_INSPECTION = 'detalles_Inspeccion',
    UPDATE_INSPECTION = 'actualizar_Inspeccion',
    CREATE_INSPECTION = 'actualizar_Inspeccion',

    LIST_ELECTRONIC_FILE = 'listar_Expediente_Electronico',
    UPLOAD_ELECTRONIC_FILE = 'adjuntar_Expediente_Electronico',
    DETAIL_ELECTRONIC_FILE = 'detalles_Expediente_Electronico',
    DOWNLOAD_ELECTRONIC_FILE = 'descargar_Expediente_Electronico',
    DELETE_ELECTRONIC_FILE = 'inactivar_Expediente_Electronico',
    LIST_FORMAT_MASTER = 'listar_Master_formatos',
    UPLOAD_FORMAT_MASTER = 'adjuntar_Master_formatos',
    DETAIL_FORMAT_MASTER = 'detalles_Master_formatos',
    DOWNLOAD_FORMAT_MASTER = 'descargar_Master_formatos',
    DELETE_FORMAT_MASTER = 'inactivar_Master_formatos',

}

const permisos = [
    {  name: "Crear Usuarios", permit_name: "crear_Usuarios"},
    {  name: "Detalles Usuarios", permit_name: "detalles_Usuarios"},
    {  name: "Actualizar Usuarios", permit_name: "actualizar_Usuarios"},
    {  name: "Inactivar Usuarios", permit_name: "inactivar_Usuarios"},
    {  name: "Listar Usuarios", permit_name: "listar_Usuarios"},
    {  name: "Crear Pólizas", permit_name: "crear_Polizas"},
    {  name: "Detalles Pólizas", permit_name: "detalles_Polizas"},
    {  name: "Actualizar Pólizas", permit_name: "actualizar_Polizas"},
    {  name: "Inactivar Pólizas", permit_name: "inactivar_Polizas"},
    { name: "Listar Pólizas", permit_name: "listar_Polizas"},
    { name: "Crear Corredor de Seguros", permit_name: "crear_CorredorSeguros"},
    { name: "Detalles Corredor de Seguros", permit_name: "detalles_CorredorSeguros"},
    { name: "Actualizar Corredor de Seguros", permit_name: "actualizar_CorredorSeguros"},
    { name: "Inactivar Corredor de Seguros", permit_name: "inactivar_CorredorSeguros"},
    { name: "Listar Corredor de Seguros", permit_name: "listar_CorredorSeguros"},
    { name: "Crear Compañía Aseguradora", permit_name: "crear_CompañiaAseguradora"},
    { name: "Detalles Compañía Aseguradora", permit_name: "detalles_CompañiaAseguradora"},
    { name: "Actualizar Compañía Aseguradora", permit_name: "actualizar_CompañiaAseguradora"},
    { name: "Inactivar Compañía Aseguradora", permit_name: "inactivar_CompañiaAseguradora"},
    { name: "listar_Compañía Aseguradora", permit_name: "listar_CompañiaAseguradora"},
    { name: "Crear Proyectos", permit_name: "crear_Proyectos"},
    { name: "Detalles Proyectos", permit_name: "detalles_Proyectos"},
    { name: "Actualizar Proyectos", permit_name: "actualizar_Proyectos"},
    { name: "Inactivar Proyectos", permit_name: "inactivar_Proyectos"},
    { name: "Finalizar Proyectos", permit_name: "finalizar_Proyectos"},
    { name: "Listar Proyectos", permit_name: "listar_Proyectos"},
    { name: "Crear Bienes Inmuebles", permit_name: "crear_BienesInmuebles"},
    { name: "Detalles Bienes Inmuebles", permit_name: "detalles_BienesInmuebles"},
    { name: "Actualizar Bienes Inmuebles", permit_name: "actualizar_BienesInmuebles"},
    { name: "Inactivar Bienes Inmuebles", permit_name: "inactivar_BienesInmuebles"},
    { name: "Listar Bienes Inmuebles", permit_name: "listar_BienesInmuebles"},
    { name: "Asignar Roles y Permisos", permit_name: "asignar_RolesPermisos"},
    { name: "Detalles Registros Auditoría", permit_name: "detalles_RegistrosAuditoria"},
    { name: "Crear Roles", permit_name: "crear_Roles"},
    { name: "Detalles Roles", permit_name: "detalles_Roles"},
    { name: "Actualizar Roles", permit_name: "actualizar_Roles"},
    { name: "Inactivar Roles", permit_name: "inactivar_Roles"},
    { name: "Listar Roles", permit_name: "listar_Roles"},
    { name: "Listar Permisos", permit_name: "listar_Permisos"},
    { name: "Listar Contratos", permit_name: "listar_Contratos"},
    { name: "Crear Contratos", permit_name: "crear_Contratos"},
    { name: "Detalles Contratos", permit_name: "detalles_Contratos"},
    { name: "Actualizar Contratos", permit_name: "actualizar_Contratos"},
    { name: "Inactivar Contratos", permit_name: "inactivar_Contratos"},
    { name: "Activar Contratos", permit_name: "activar_Contratos"},
    { name: "Crear Etapa Precontractual", permit_name: "crear_EtapaPrecontractual"},
    { name: "Visualizar Etapa Precontractual", permit_name: "visualizar_EtapaPrecontractual"},
    { name: "Actualizar Etapa Precontractual", permit_name: "actualizar_EtapaPrecontractual"},
    { name: "Listar Disposición", permit_name: "listar_Disposicion"},
    { name: "Crear Disposición", permit_name: "crear_Disposicion"},
    { name: "Detalles Disposición", permit_name: "detalles_Disposicion"},
    { name: "Actualizar Disposición", permit_name: "actualizar_Disposicion"},
    { name: "Inactivar Disposición", permit_name: "inactivar_Disposicion"},
    { name: "Activar Disposición", permit_name: "activar_Disposicion"},
    { name: "Listar Inspecciones", permit_name: "listar_Inspecciones"},
    { name: "Detalles Inspección", permit_name: "detalles_Inspeccion"},
    { name: "Actualizar Inspección", permit_name: "actualizar_Inspeccion"},

    { name: "Listar Expediente Electrónico", permit_name: "listar_Expediente_Electronico"},
    { name: "Adjuntar Expediente Electrónico", permit_name: "adjuntar_Expediente_Electronico"},
    { name: "Detalles Expediente Electrónico", permit_name: "detalles_Expediente_Electronico"},
    { name: "Descargar Expediente Electrónico", permit_name: "descargar_Expediente_Electronico"},
    { name: "Inactivar Expediente Electrónico", permit_name: "inactivar_Expediente_Electronico"},
    { name: "Listar Máster de formatos", permit_name: "listar_Master_formatos"},
    { name: "Adjuntar Máster de formatos", permit_name: "adjuntar_Master_formatos"},
    { name: "Detalles Máster de formatos", permit_name: "detalles_Master_formatos"},
    { name: "Descargar Máster de formatos", permit_name: "descargar_Master_formatos"},
    { name: "Inactivar Máster de formatos", permit_name: "inactivar_Master_formatos"},
]

// borrar esto cuando se termine, la autenticacion
if (!window.__sabi) {
    window.__sabi = {
        cancel_mapper: {},
        is_in_refresh: false,
        retry_pending: [],
        date_format: 'YYYY-MM-DD',
        number_formatter: new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }),
    };
}

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={esES}>
            <TemplateProvider>
                <App />
            </TemplateProvider>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
