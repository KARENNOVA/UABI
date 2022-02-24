import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs } from 'antd';
import CreateOccupation from './CreateOccupation';
import CreateInspectionPhysical from './CreateInspectionPhysical';
import CreateUpgrade from './CreateUpgrade';
import PhotographicRecordForm from './PhotographicRecordForm';
import Report from './Report';
import BasicInformation from './BasicInformation';
import { NewInspection } from '../custom_types';
import { FormikProps, FormikValues } from 'formik';
import { swal_success } from '../../../utils';
import { create_notification } from '../../notificacions/redux/service';
import { create_inspection } from '../redux/service';

interface InspectionFormTagsProps {
    inspection: NewInspection;
    real_estate: any;
    user: any;
}
interface HistoryParams {
    new_inspection: NewInspection;
    active_key: string;
    max: number;
}

const InspectionFormTags: FC<InspectionFormTagsProps> = ({ inspection, real_estate, user }) => {
    const { TabPane } = Tabs;
    let [active_key, new_inspection, steps, max, show_next, next_tab, goBack, execute_save, callback] =
        useInit(inspection, real_estate);
    return (
        <div className="h-100 d-flex flex-column">
            <div className="flex-fill overflow-auto">
                <div className="bg-white d-flex flex-column h-100">
                    <div className="d-flex flex-row mb-3 pt-3 ps-4">
                        <h5>Crear nueva Inspección</h5>
                    </div>

                    <Tabs activeKey={active_key} className="w-100 h-100" onChange={callback}>
                        <TabPane tab="Información básica BI" key="1">
                            <BasicInformation
                                inspection={inspection}
                                obs={new_inspection.basic_information.differences}
                                real_estate={real_estate}
                                innerRef={steps[0].ref}
                                onSubmit={steps[0].onSave}
                            />
                        </TabPane>
                        <TabPane tab="Ocupación" key="2" disabled={max < 2}>
                            <CreateOccupation
                                inspection={inspection}
                                occupation={new_inspection?.occupation}
                                innerRef={steps[1].ref}
                                onSubmit={steps[1].onSave}
                            />
                        </TabPane>
                        <TabPane tab="Inspección física" key="3" disabled={max < 3}>
                            <CreateInspectionPhysical
                                inspection={inspection}
                                physical_inspection={new_inspection?.physical_inspection}
                                innerRef={steps[2].ref}
                                onSubmit={steps[2].onSave}
                            />
                        </TabPane>
                        <TabPane tab="Registro fotográfico" key="4" disabled={max < 4}>
                            <PhotographicRecordForm
                                inspection={inspection}
                                records={new_inspection.physical_inspection.properties.filter((p) => !!p.image)}
                                photografic_register={new_inspection?.photografic_register}
                                innerRef={steps[3].ref}
                                onSubmit={steps[3].onSave}
                            />
                        </TabPane>
                        <TabPane tab="Actualización" key="5" disabled={max < 5}>
                            <CreateUpgrade
                                inspection={inspection}
                                owner={new_inspection?.occupant}
                                innerRef={steps[4].ref}
                                onSubmit={steps[4].onSave}
                            />
                        </TabPane>
                        <TabPane tab="Generar informe" key="6" disabled={max < 6}>
                            <Report
                                innerRef={steps[5].ref}
                                onSubmit={steps[5].onSave}
                                data={new_inspection}
                                real_estate={real_estate}
                                user={user}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <div
                className="bg-white d-flex flex-row justify-content-between"
                style={{ padding: 16, borderTop: '1px solid #ccc' }}
            >
                <button type="button" className="btn btn-outline-primary" onClick={goBack}>
                    Atrás
                </button>
                <div className="flex-fill" />
                {show_next && (
                    <button type="button" className="btn btn-primary" onClick={next_tab}>
                        Siguiente
                    </button>
                )}
                {!show_next && (
                    <button type="button" className="btn btn-primary" onClick={execute_save}>
                        Guardar
                    </button>
                )}
            </div>
        </div>
    );
};

const useInit = (
    old_inspection: NewInspection,
    real_estate: any
): [string, NewInspection, any[], number, boolean, () => void, () => void, () => void, (key: string) => void] => {
    const history = useHistory<HistoryParams>();
    const active_key = history.location.state?.active_key || '1';
    const ls = history.location.state;
    const clerar_inspection = {
        basic_information: {
            differences: '',
            isAnEspecialCase: false,
            special_actions: '',
            report_pdf_id: '',
        },
        occupation: {
            tenure: '',
            use: '',
            ownership: '',
            contractual: '',
        },
        physical_inspection: {
            observations: '',
            public_services: [
                { name: 'Energía', subscriber: 0, accountant: 0, status: 0 },
                { name: 'Gas', subscriber: 0, accountant: 0, status: 0 },
                { name: 'Agua', subscriber: 0, accountant: 0, status: 0 },
                { name: 'Teléfono', subscriber: 0, accountant: 0, status: 0 },
            ],
            properties: [
                {
                    name: '',
                    status_property: '',
                    observation: '',
                    photographic_evidence: '',
                },
            ],
        },
        occupant: {
            names: '',
            surnames: '',
            document_type: '',
            document_number: 0,
            phone_number: 0,
            phone_number_ext: 0,
            email: '',
        },
        photografic_register: {
            facade: '',
            general: [''],
        },
    };
    const [new_inspection, set_new_inspection] = useState(ls?.new_inspection ? ls?.new_inspection : clerar_inspection);
    const [max, set_max] = useState<number>(history.location.state?.max || 1);
    const [is_saving, set_is_saving] = useState<boolean>(false);
    const [go_next, set_go_next] = useState<string>(null);

    const steps = [
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async () => {
                set_is_saving(true);
                await steps[0].ref.current?.submitForm();
            },
            onSave: async (values) => {
                set_is_saving(false);
                set_new_inspection((data) => ({
                    ...data,
                    basic_information: {
                        ...new_inspection?.basic_information,
                        differences: values.observations,
                    },
                }));
                console.log(1, 'guardado');
            },
        },
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async () => {
                console.log(2);
                set_is_saving(true);
                await steps[1].ref.current?.submitForm();
            },
            onSave: async (values) => {
                set_new_inspection((data) => ({
                    ...data,
                    occupation: {
                        ...new_inspection?.occupation,
                        ...values,
                    },
                }));
                console.log(2, 'guardado');
                set_is_saving(false);
            },
        },
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async () => {
                console.log(3);
                set_is_saving(true);
                await steps[2].ref.current?.submitForm();
            },
            onSave: async (values) => {
                set_new_inspection((data) => ({
                    ...data,
                    physical_inspection: {
                        ...new_inspection.physical_inspection,
                        public_services: [...values.public_services],
                        properties: [...values?.properties],
                        observations: values.observations,
                    },
                }));
                console.log(3, 'guardado');
                set_is_saving(false);
            },
        },
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async () => {
                console.log(4);
                set_is_saving(true);
                await steps[3].ref.current?.submitForm();
            },
            onSave: async (values) => {
                set_new_inspection((data) => ({
                    ...data,
                }));
                console.log(4, 'guardado');
                set_is_saving(false);
            },
        },
        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async () => {
                console.log(5);
                set_is_saving(true);
                await steps[4].ref.current?.submitForm();
            },
            onSave: async (values) => {
                set_new_inspection((data) => {
                    const res = {
                        ...data,
                        occupant: {
                            ...data.occupant,
                            ...values,
                            document_type: values.documentType,


                        },
                    };
                    return res;
                });
                console.log(5, 'guardado');
                set_is_saving(false);
            },
        },

        {
            ref: useRef<FormikProps<FormikValues>>(),
            save: async (is_finish = false) => {
                console.log(6);
                set_is_saving(true);
                if (is_finish) {
                    steps[5].ref.current?.setFieldValue('finish', true, false);
                }
                await steps[5].ref.current?.submitForm();
            },
            onSave: async (values) => {
                const new_data = {
                    ...new_inspection,
                    basic_information: {
                        ...new_inspection.basic_information,
                        isAnEspecialCase: values.is_special_case,
                        special_actions: values.special_actions,
                    },
                };
                console.log(new_data);
                set_new_inspection(new_data);
                console.log(6, 'guardado');
                set_is_saving(false);
                if (values.finish) {
                    console.log({ final_data: new_data });
                    const res = await create_inspection(real_estate.id, new_data);
                    console.log(res)
                    swal_success.fire('Inspeccion realizada exitosamente', '', 'success').then(() => {
                        history.push('/inspection/');
                        create_notification({
                            subject: 'Es necesario mantenimiento',
                            description: `es necesario mantenimiento para el bien inmueble ${real_estate?.name}`,
                            action: `/acquisitions/real-estates/${real_estate?.id}/`,
                            priority: 2,
                            toRole: "1",
                        });
                    });
                }
            },
        },
    ];
    const limit = 6;
    const show_next = parseInt(active_key) < limit;
    const next_tab = () => {
        const key = parseInt(active_key);
        const next = key + 1;
        if (next <= limit) {
            callback(`${next}`);
        }
    };
    const prev_tab = () => {
        const key = parseInt(active_key);
        const prev = key - 1;
        if (prev > 0) {
            callback(`${prev}`);
        }
    };

    const callback = (key: string) => {
        const int_key = parseInt(active_key);
        // console.groupCollapsed('guardando', int_key);
        const save = steps[int_key - 1]?.save;
        save &&
            save().then(() => {
                set_go_next(key);
            });
    };

    const goBack = () => {
        if (active_key === '1') {
            history.goBack();
        } else {
            prev_tab();
        }
    };

    const execute_save = async () => {
        await steps[limit - 1].save(true);
    };

    useEffect(() => {
        if (!is_saving && go_next) {
            const key = parseInt(go_next);
            if (key > max) {
                set_max(key);
            }
            history.push(history.location.pathname, { active_key: go_next, new_inspection, max });
            set_go_next(null);
            console.groupEnd();
        }
    }, [is_saving, go_next]);

    // useEffect(() => {
    //     if(!Object.is(old_inspection, clerar_inspection)){
    //         set_new_inspection((data) => ({
    //             ...data,
    //             ...old_inspection,
    //         }));
    //     }
    // }, [old_inspection]);

    // useEffect(() => {
    //     console.log('new', new_inspection);
    // }, [new_inspection]);

    return [active_key, new_inspection, steps, max, show_next, next_tab, goBack, execute_save, callback];
};

export default InspectionFormTags;
