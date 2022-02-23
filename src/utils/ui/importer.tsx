import React, { CSSProperties, FC, Fragment, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from './card';
import Alert from 'antd/lib/alert';
import { http } from '../../config/axios_instances';

const Importer: FC<any> = (props) => {
    const baseStyle: CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#999',
        borderStyle: 'dashed',
        backgroundColor: '#fff',
        color: '#555',
        outline: 'none',
        transition: 'border .24s ease-in-out',
    };

    const focusedStyle = {
        borderColor: '#2196f3',
    };

    const acceptStyle = {
        borderColor: '#00e676',
    };

    const rejectStyle = {
        borderColor: '#ff1744',
    };

    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel',
        multiple: false,
    });

    const files = acceptedFiles.map((file: any) => <li key={file.path}>{file.path}</li>);

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    const [module, set_module] = useState('');
    const [is_uploading, set_is_uploading] = useState(false);

    return (
        <Card title="Carga masiva">
            <div className="row">
                <div className="col-4">
                    <Alert
                        message="Formato"
                        description={
                            <Fragment>
                                <a style={{ marginRight: 8 }} href="/Historic.xlsx" download="formato.xlsx">
                                    formato.xlsx
                                </a>
                                <br />
                                <span>
                                    Por favor descargue este formato como ejemplo, llene los datos y suba el archivo
                                    aqui.
                                </span>
                            </Fragment>
                        }
                        type="info"
                        showIcon
                    />
                </div>
                <div className="col-8">
                    <section className="container">
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            <Alert
                                message=""
                                description="Arrastre el archivo a importar aqui, o haga clic para seleccionar le archivo"
                                type="info"
                                showIcon
                            />
                            {/*<p>Arrastre el archivo a importar aqui, o haga clic para seleccionar le archivo</p>*/}
                        </div>
                        {acceptedFiles.length > 0 && (
                            <aside style={{ marginTop: 15 }}>
                                <h6>Archivo</h6>
                                <ul>{files}</ul>
                                <div style={{ margin: '16px 0' }}>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="module_id">Modulo</label>
                                            <select
                                                className="form-select"
                                                id="module_id"
                                                onChange={(e) => {
                                                    set_module(e.target.value);
                                                }}
                                            >
                                                <option value="">--- Selecione un modulo ---</option>
                                                <option value="contracs">Contratos</option>
                                                <option value="acquisitions">Adquisiciones</option>
                                                <option value="dispositions">Disposiciones</option>
                                                <option value="insurance">Seguros</option>
                                                <option value="leases">Arrendamientos</option>
                                                <option value="dependencies">dependencias</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    disabled={!(acceptedFiles.length > 0 && module)}
                                    onClick={() => {
                                        if (acceptedFiles.length > 0 && module) {
                                            set_is_uploading(true);
                                            const form_data = new FormData();
                                            form_data.append('xlsxFile', acceptedFiles[0]);
                                            form_data.append('module', module);
                                            http.post('/massive/', form_data, {
                                                headers: { 'content-type': 'multipart/form-data' },
                                            })
                                                .then((res) => {
                                                    set_is_uploading(false);
                                                    console.log(res);
                                                })
                                                .catch((error) => {
                                                    set_is_uploading(false);
                                                    console.error({ ...error });
                                                });
                                        }
                                    }}
                                >
                                    Cargar Formanto{' '}
                                    {is_uploading && (
                                        <i
                                            className="fa fa-spinner fa-spin"
                                            style={{
                                                fontSize: 14,
                                                marginLeft: 4,
                                                color: '#fff',
                                            }}
                                        />
                                    )}
                                </button>
                            </aside>
                        )}
                    </section>
                </div>
            </div>
        </Card>
    );
};

export default Importer;
