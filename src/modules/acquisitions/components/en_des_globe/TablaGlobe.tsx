import React, { FC, useEffect, useState } from 'react';
import { Table, Popconfirm, Form, Typography } from 'antd';
import { EditableCell } from '../../../../utils/ui/editableCell';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import { useParams, useHistory } from 'react-router-dom';
import { swal_warning } from '../../../../utils';

interface IParams {
    id: string;
}

interface TableGlobeProps {
    action: any;
}

export const TablaGlobe: FC<TableGlobeProps> = ({ action }) => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();

    const realEstates: any = useSelector((states: any) => states.acquisitions.realEstates.value);

    const [data, setData] = useState(null);
    const [numberRealEstates, setNumberRealEstates] = useState(1);
    const [disabled, setDisabled] = useState(true);
    const [valueArea, setValueArea] = useState(0);
    const [editingKey, setEditingKey] = useState('');
    const [selectRealEsates, setSelectRealEsates] = useState(0);
    const [selectRowKeys, setSelectRowKeys] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(actions.getProjects());
        dispatch(actions.getRealEstatesByProject(Number(id), {}));
    }, []);

    // let newrealEstates = [];
    console.log(realEstates);
    // const codes = realEstates.map(realEstate => realEstate.sap_id.split(",")).map(codigo => codigo?.filter(cod => cod.charAt(cod.length - 1) !== 'J'))
    //console.log('bienes',realEstates)
    // newrealEstates = realEstates.reduce((valor_anterior, valor_actual) => {
    //     const codigos = valor_actual.sap_id.split(',');
    //     const codes = codigos.filter((cod) => cod.charAt(cod.length - 1) !== 'J');
    //     for (let i = 0; i < codes.length; i++) {
    //         const obj = {
    //             ...valor_actual,
    //         };
    //         obj.sap_id = codes[i];
    //         valor_anterior.push(obj);
    //     }
    //     return valor_anterior;
    // }, []);

    useEffect(() => {
        // const dataTable = [];
        const dataTable = realEstates.map((realEstate) => {
            const object = {
                key: realEstate.active_code,
                name: realEstate.name,
                total_area: realEstate.construction_area ? realEstate.construction_area : realEstate.plot_area,
                intact_area: realEstate.construction_area ? realEstate.construction_area : realEstate.plot_area,
                use_area: 0,
                type: realEstate.construction_area ? 'constrution' : 'lote',
                id: realEstate.id,
            };
            return object;
            // if (realEstate?.active_code?.charAt(realEstate?.active_code?.length - 1) === 'J') {
            //     dataTable.push({
            //         key: realEstate.active_code,
            //         name: realEstate.name,
            //         total_area: realEstate.construction_area,
            //         intact_area: realEstate.construction_area,
            //         use_area: 0,
            //         type: 'constrution',
            //         id: realEstate.id,
            //     });

            // } else {
            //     dataTable.push({
            //         key: realEstate.active_code,
            //         name: realEstate.name,
            //         total_area: realEstate.plot_area,
            //         intact_area: realEstate.plot_area,
            //         use_area: 0,
            //         type: 'lote',
            //         id: realEstate.id,
            //     });
            // }
        });
        setData(dataTable);
    }, []);

    useEffect(() => {
        const areaCalculada = calculateTotalSArea();
        setValueArea(areaCalculada);
        if (areaCalculada > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [data]);

    // Input numero bienes Inmuebles a dividir
    const handleInputChange = (e) => {
        setNumberRealEstates(([e.target.name] = e.target.value));
    };

    const calculateTotalSArea = () => {
        if (Array.isArray(data)) {
            let totalAreaUse = 0;
            data.map((row) => (totalAreaUse = totalAreaUse + row.use_area));
            return totalAreaUse;
        }
    };

    const isEditing = (record: any) => record.key === editingKey;

    const edit = (record: any & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as any;

            const newData = [...data];

            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                if (newData[index].use_area !== 0) {
                    newData[index].intact_area = newData[index].total_area - newData[index].use_area;
                }
                if (newData[index].use_area > newData[index].total_area) {
                    console.log('el area a utilizar no valida');
                    setEditingKey('');
                    return;
                } else if (newData[index].use_area >= 0) {
                    setData(newData);
                    setEditingKey('');
                }
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // filas seleccionadas de la tabla
    const rowSelection = {
        onChange: (selectedRowKeys: [], selectedRows: any[]) => {
            const idRealEstaesSelect = selectedRows.reduce((valor_anterior, valor_actual) => {
                if (!valor_anterior.includes(valor_actual.id)) {
                    valor_anterior.push(valor_actual.id);
                }
                return valor_anterior;
            }, []);
            setSelectRealEsates(idRealEstaesSelect.length);
            setSelectRowKeys(selectedRowKeys);
        },
    };

    const columns: any = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        // },
        {
            title: 'Código Activo',
            dataIndex: 'key',
        },
        {
            title: 'Bien Inmueble',
            dataIndex: 'name',
            width: '20%',
            responsive: ['md'],
        },
        {
            title: 'Area Total',
            dataIndex: 'total_area',
            align: 'center'
        },
        {
            title: 'Area a Utilizar',
            dataIndex: 'use_area',
            editable: true,
            width: '20%',
            align: 'center'
        },
        {
            title: 'Area Intacta',
            dataIndex: 'intact_area',
            width: '20%',
            align: 'center',
            responsive: ['md'],
        },
        {
            title: 'Editar',
            dataIndex: 'operation',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            <i className="fa fa-save d-inline d-sm-none me-1" style={{ color: '#1FAEEF', fontSize: 16 }} />
                            <span className="d-none d-sm-inline-block">Guardar</span>
                        </a>
                        <Popconfirm title="Seguro que desea cancelar?" onConfirm={cancel}>
                            <i className="fa fa-window-close d-inline d-sm-none text-danger me-1" style={{ fontSize: 16 }}/>
                            <span className="d-none d-sm-inline-block">Cancelar</span>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={!selectRowKeys.includes(record.key)} onClick={() => edit(record)}>
                        Editar
                    </Typography.Link>
                );
            },
        },
    ];
    //console.log('data',data)
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: col.dataIndex === 'use_area' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <div className="row">Seleccione los bienes Inmuebles que desea {action}</div>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowSelection={{
                    ...rowSelection,
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                // pagination={false}
            />
            <div className="col-6 my-3">
                <label htmlFor="number_real_estates" className="form-label">
                    Número de Bien Inmuebles
                </label>
                <input
                    type="number"
                    name="numberRealEstates"
                    className="form-control"
                    placeholder="numero a dividir bien inmueble"
                    autoComplete="off"
                    value={numberRealEstates}
                    onChange={handleInputChange}
                    min={0}
                    disabled={disabled}
                />
            </div>
            <button
                className="btn btn-primary"
                onClick={(e) => {
                    //console.log(data)
                    const dataSelect = data.filter((a) => selectRowKeys.includes(a.key));
                    let areaSelect = dataSelect.every((b) => b.use_area > 0);
                    //console.log(selectRealEsates)
                    switch (action) {
                        case 'englobar':
                            if (numberRealEstates < selectRealEsates) {
                                if (areaSelect) {
                                    history.push({
                                        pathname: `/englobar/realEstates/`,
                                        state: { numberRealEstates, valueArea, data, action, realEstates },
                                    });
                                } else {
                                    swal_warning.fire({
                                        title: 'Valor de Área a utilizar Obligatorio',
                                        text: `El valor del área a ${action} no puede ser cero`,
                                    });
                                }
                            } else {
                                swal_warning.fire({
                                    title: 'No se puede englobar',
                                    text: ``,
                                });
                            }

                            break;

                        case 'desenglobar':
                            if (numberRealEstates > selectRealEsates) {
                                if (valueArea === 0) {
                                    e.preventDefault();
                                    //console.log("debe elegir valores ")
                                    swal_warning.fire({
                                        title: 'Valor de Área a utilizar Obligatorio',
                                        text: `El valor del área a ${action} no puede ser cero`,
                                    });
                                } else {
                                    console.log(action);
                                    history.push({
                                        pathname: `/englobar/realEstates/`,
                                        state: { numberRealEstates, valueArea, data, action, realEstates },
                                    });
                                }
                            } else {
                                console.log('no valido');
                            }
                            break;

                        default:
                            break;
                    }
                }}
            >
                enviar
            </button>
        </Form>
    );
};
