import { Field } from 'formik';
import React, { FC, useState, useEffect, useContext } from 'react';
import ErrorMessage from '../../../../utils/ui/error_messge';
import { IProjectAttributes } from '../../../../utils/interfaces';
import Select from '../../../../utils/ui/select';
import Tooltip from 'antd/lib/tooltip';
import { actions } from '../../redux';
import LocationModal from '../../../../utils/components/Location/LocationModal';
import { extractMonth, formatDate } from '../../../../utils';
import DocumentModal from '../../../../utils/components/DocumentsModal/index';

import { useDispatch } from 'react-redux';
import ModalDivideAreas from '../../../Inventory_record/components/ModalDivideAreas';
import TooltipField from '../../../../utils/ui/tooltip_field';
import { LinkButton } from '../../../../utils/ui/link';
import { TemplateContext } from '../../../../utils/components/template/template_context';

interface DataRealEstateFormProps {
    type?: 'view' | 'edit' | 'create';
    disabled?: boolean;
    formik: any;
    projects: IProjectAttributes[];
    onProjectSelectedChange?: (value) => void;
    project?: any;
    inventory?: boolean;
    englobe?: boolean;
    inventoryEdit?: boolean;
    acquisitions?: any[];
    tipologies?: any[];
    dependencies?: any;
}

export const DataRealEstateForm: FC<DataRealEstateFormProps> = ({
    type,
    disabled,
    tipologies,
    dependencies,
    formik,
    projects,
    project,
    inventory,
    englobe,
    inventoryEdit,
    acquisitions,
    onProjectSelectedChange,
}) => {
    const context = useContext(TemplateContext);
    useEffect(() => {
        if (!inventory) {
            let value_patrimonial = 0;
            acquisitions?.map((a) => (value_patrimonial = a.act_value + Number(a.recognition_value)));
            formik.setFieldValue('patrimonial_value', value_patrimonial, false);
            formik.setFieldValue('accounting_amount', value_patrimonial, false);
        }
    }, [acquisitions, inventory])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getTipologies());
    }, []);
    const [subs, set_subs] = useState<any[]>([]);
    const active_type = ['Lote', 'Mejora', 'Construcción', 'Construcción para demoler', 'Mejora para demoler'];
    const onChangeActiveType = (active_types, setFieldValue) => (e) => {

        const data_now = [...active_types];
        const new_value = e.target.value;
        console.log(new_value)
        const key = 'Lote';
        let aux_data: any[];
        if (!data_now.includes(new_value)) {
            if (data_now.includes(key)) {
                aux_data = [key, new_value];
            } else {
                if (new_value === key) {
                    aux_data = [key, ...data_now];
                } else {
                    aux_data = [new_value];
                }
            }
        } else {
            aux_data = [...data_now].filter((x) => x !== new_value);
        }
        if (!aux_data.includes(active_type[2]) && !aux_data.includes(active_type[3])) {
            formik.setFieldValue('construction_area', 0, false);

        }
        if (!aux_data.includes(active_type[0])) {
            formik.setFieldValue('plot_area', 0, false);
        }
        setFieldValue('active_type', aux_data, false);
    };

    // const format_list = (list) => {
    //     if (list && Array.isArray(list)) {
    //         let aux_list = [...list];
    //         aux_list = aux_list.map((d: any) => ({
    //             name: d.name,
    //             id: d.name,
    //         }));
    //         if (aux_list.length > 0) {
    //             return aux_list;
    //         }
    //     }
    //     return [];
    // };

    // const number_validate = (limit?: number) => (e) => {
    //     e.preventDefault();
    //     const regex = new RegExp(`^([1-9]+\\d*)|[0]${limit ? `{0,${limit}}` : '*'}$`);
    //     if (regex.test(e.target.value.toString())) {
    //         const a = Math.abs(parseInt(e.target.value))
    //         e.target.value = a
    //         formik.handleChange(e);
    //     }
    // };

    const number_validate = (limit?: number) => (e) => {
        e.preventDefault();
        const regex = new RegExp(`^[+]?\\d${limit ? `{0,${limit}}` : '*'}$`);
        if (regex.test(e.target.value.toString())) {
            formik.handleChange(e);
        }
    };

    return (

        <>

            <div className="row">
                <div className="form-group col-12 col-md-6 col-lg-6">
                    <label htmlFor="project_id_id" className="form-label">
                        Proyecto al que pertenece <span className="text-danger">*</span>
                    </label>
                    <Field
                        disabled={disabled}
                        options={
                            projects.map((project) => ({
                                id: `${project.id}`,
                                name: project.name,
                            }))
                        }
                        name="projects_id"
                        component={Select}
                        id="project_id_id"
                        extra_on_change={(id) => {
                            onProjectSelectedChange(id)
                        }}
                    />
                    <ErrorMessage name="projects_id" />
                </div>
                <div className="form-group col-12 col-md-3 col-lg-3">
                    <label htmlFor="tipology_id" className="form-label">
                        Tipología <span className="text-danger">*</span>
                    </label>
                    <Field
                        component={Select}
                        id="tipology_id"
                        name="tipology_id"
                        placeholder="Seleccione Tipología "
                        disabled={disabled}
                        options={tipologies?.map((tipology) => ({ id: tipology.id, name: tipology.tipology }))}
                        showSearch // habilitar para buscarx
                        filterOption={(input, option) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                        extra_on_change={(id) => {
                            const bill = tipologies.find((tipology) => tipology.id === id);
                            formik.setFieldValue('accounting_account', bill.accounting_account, false);
                        }}
                    />
                    <ErrorMessage name="tipology_id" />
                </div>

                <div className="form-group col-12 col-md-3 col-lg-3">
                    <label htmlFor="accounting_account_id" className="form-label">
                        Cuenta Contable
                    </label>
                    <Field
                        disabled
                        name="accounting_account"
                        type="text"
                        className="form-control"
                        id="accounting_account_id"
                    />
                    <ErrorMessage name="accounting_account" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="dependency_id" className="form-label">
                        Dependencia o Secretaría
                    </label>
                    <Field
                        component={Select}
                        name="dependency"
                        id="dependency_id"
                        disabled={disabled || dependencies?.length === 0 || project?.id !== 0}
                        placeholder="Selecciona una Dependencia"
                        options={dependencies?.map(d => ({ id: d.dependency, name: d.dependency }))}
                        showSearch
                        extra_on_change={(value) => {
                            if (value) {
                                // const dependency = dependencies.find((d) => d.dependency === value);
                                // const _subs = dependency.subs;
                                // formik.setFieldValue('subdependency', dependency.dependency);
                                // formik.setFieldValue('cost_center', dependency.management_center);
                                // formik.setFieldValue('management_center', dependency.management_center);
                                // set_subs(_subs);
                                const dependency = dependencies.find((d) => d.dependency === value);
                                const _subs = dependency.subs;
                                formik.setFieldValue('cost_center', dependency.management_center);
                                formik.setFieldValue('management_center', dependency.management_center);
                                set_subs(_subs);
                                const subdependency = _subs.find((d) => d.subdependency === dependency.dependency);
                                if (subdependency !== undefined) {
                                    formik.setFieldValue('subdependency', subdependency.subdependency);
                                    formik.setFieldValue('cost_center_id', subdependency.id);
                                }
                            }
                        }}
                        filterOption={(input, option) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name="dependency" />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="subdependency_id" className="form-label">
                        Subsecretaría o Subdirección
                    </label>
                    <Field
                        component={Select}
                        name="subdependency"
                        id="subdependency_id"
                        disabled={disabled || !formik.values.dependency || subs.length === 0 || project?.id !== 0}
                        placeholder="Selecciona una Sub. Dependencia"
                        options={subs.map(s => ({ id: s.subdependency, name: s.subdependency }))}
                        showSearch
                        allowClear
                        extra_on_change={(value) => {
                            if (value) {
                                // const dependency = dependencies.find((d) => d.dependency === formik.values.dependency);
                                // const subdependency = dependency.subs.find((d) => d.subdependency === value);
                                // formik.setFieldValue('cost_center', subdependency.cost_center);
                                const dependency = dependencies.find(
                                    (d) => d.dependency === formik.values.dependency
                                );
                                const subdependency = dependency.subs.find((d) => d.subdependency === value);
                                console.log(subdependency)
                                formik.setFieldValue('cost_center', subdependency.cost_center);
                                formik.setFieldValue('cost_center_id', subdependency.id);
                            }
                        }}
                        filterOption={(input, option) => {
                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                        }}
                    />
                    <ErrorMessage name="subdependency" />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="management_center_id" className="form-label">
                        Centro Gestor
                    </label>
                    <Field
                        disabled
                        type="text"
                        className="form-control"
                        name="management_center"
                        id="management_center_id"
                    />
                    <ErrorMessage name="cost_center" />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="cost_center_id" className="form-label">
                        Centro de Costos
                    </label>
                    <Field disabled type="text" className="form-control" name="cost_center" id="cost_center_id" />
                    <ErrorMessage name="cost_center" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="name_id" className="form-label">
                        Nombre Inmueble <span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Lorem impsu texto descriptivo" />
                    <Field
                        disabled={disabled}
                        name="name"
                        id="name_id"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        maxLength={200}
                    />
                    <ErrorMessage name="name" withCount max={200} />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="registry_number_noc" className="form-label">
                        Número matrícula <span className="text-danger">*</span>
                    </label>
                    <TooltipField text="Lorem impsu texto descriptivo" />
                    <Field
                        type="text"
                        name="registry_number"
                        className="form-control"
                        id="registry_number_noc"
                        autoComplete="off"
                        placeholder=""
                        disabled={disabled}
                        maxLength={20}
                    />

                    <ErrorMessage name="registry_number" withCount max={20} />
                </div>
                {type === "edit" &&
                    <div className="form-group col-12 col-md-6 col-lg-3">
                        <label htmlFor="active_code_id" className="form-label">
                            Código Activo
                        </label>
                        <Field
                            disabled
                            name="active_code"
                            id="active_code_id"
                            type="text"
                            className="form-control"
                            autoComplete="off"
                        />
                        <ErrorMessage name="active_code" />
                    </div>
                }

                <div className={`form-group col-12 col-md-${type === "edit" ? 3: 6} col-lg-${type === "edit" ? 3: 6}`}>
                    <label htmlFor="destination_type_id" className="form-label">
                        Tipo de Uso <span className="text-danger">*</span>
                    </label>
                    <Field
                        disabled={disabled}
                        name="destination_type"
                        as="select"
                        className="form-select"
                        id="destination_type_id"
                    >
                        <option value="" disabled hidden>
                            -- Seleccione Destinación --
                        </option>
                        <option key="PÚBLICO" value="PÚBLICO">
                            Uso Público
                        </option>
                        <option key="FISCAL" value="FISCAL">
                            Fiscal
                        </option>
                        <option key="MIXTO" value="MIXTO">
                            Mixto
                        </option>
                    </Field>

                    <ErrorMessage name="destination_type" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="patrimonial_value_id" className="form-label">
                        Valor Patrimonial <span className="text-danger">*</span>
                    </label>
                    <div className="input-group w-100">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled={!inventory}
                            name="patrimonial_value"
                            id="patrimonial_value_id"
                            type="number"
                            className="form-control text-end"
                            style={{ borderLeft: 'none' }}
                            min={0}
                            max={99999999999999999999}
                        />
                    </div>
                    <ErrorMessage name="patrimonial_value" />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <div className="row">
                        <div className="col-9">
                            <label htmlFor="total_area_id" className="form-label">
                                Área Total
                            </label>
                        </div>
                    </div>

                    <div className="input-group">
                        <Field
                            name="total_area"
                            type="number"
                            id="total_area_id"
                            className="form-control border-end-0"
                            min={0}
                            onChange={number_validate(10)}
                        />
                        <div className="input-group-prepend">
                            <Field
                                component={Select}
                                className="input-group-text bg-white border-start-0"
                                name="total_area_unit"
                                defaultValue="m2"
                                options={[
                                    {
                                        id: "m2",
                                        name: (
                                            <span>
                                                m<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "yd2",
                                        name: (
                                            <span>
                                                yd<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "ft2",
                                        name: (
                                            <span>
                                                ft<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <ErrorMessage name="total_area" />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="reconstruction_value_id" className="form-label">
                        Valor de reconstrucción <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-end-0">$</span>
                        </div>
                        <Field
                            disabled={disabled}
                            name="reconstruction_value"
                            type="number"
                            id="reconstruction_value_id"
                            className="form-control border-start-0 text-end"
                            min={0}
                            onChange={number_validate(10)}

                        />
                    </div>

                    <ErrorMessage name="reconstruction_value" />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <label htmlFor="total_percentage_id" className="form-label">
                        Porcentaje Total <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <Field
                            disabled={disabled}
                            name="total_percentage"
                            id="total_percentage_id"
                            className="form-control border-end-0"
                            min={0}
                            max={100}
                            onChange={number_validate(3)}
                            type="number"
                        />
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-white border-start-0">%</span>
                        </div>
                    </div>

                    <ErrorMessage name="total_percentage" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="material_id" className="form-label">
                        Materiales de construcción
                    </label>
                    <Field
                        component={Select}
                        id="material_id"
                        name="materials"
                        disabled={disabled}
                        className="w-100"
                        options={[
                            { name: 'Hormigón', id: 'Hormigón' },
                            { name: 'Madera', id: 'Madera' },
                        ]}
                        mode="multiple"
                    />

                    <ErrorMessage name="materials" />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="zone_id" className="form-label">
                        Zona de Bien Inmueble
                    </label>

                    <div className="form-check-inline me-5">
                        <label style={{ fontWeight: 400 }}>
                            <Field
                                disabled={disabled}
                                name="zone"
                                id="zone_id"
                                type="radio"
                                className="form-check-input"
                                value="Urbano"
                            />{' '}
                            Urbano
                        </label>
                    </div>
                    <div className="form-check-inline me-5">
                        <label style={{ fontWeight: 400 }}>
                            <Field
                                disabled={disabled}
                                name="zone"
                                id="zone_id"
                                type="radio"
                                className="form-check-input"
                                value="Rural"
                            />{' '}
                            Rural
                        </label>
                    </div>

                    <ErrorMessage name="zone" />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="address" className="form-label">
                        CBML
                    </label>
                    <Field name="_address.cbml" id="address" type="text" className="form-control" disabled />
                    <ErrorMessage name="_address.cbml" />
                </div>
                <div className="form-group col-12 col-md-6 col-lg-3">
                    <label htmlFor="address" className="form-label">
                        Dirección
                    </label>
                    <div className="input-group">
                        <Field name="_address.name" id="address" type="text" className="form-control" disabled />
                        <div className="input-group-prepend">
                            <LocationModal
                                disabled={disabled}
                                view="general"
                                zone={formik.values.zone}
                                onSave={async (values: any) => {
                                    formik.setFieldValue('address', values.id, false);
                                    formik.setFieldValue('_address.name', `${values.address}`, false);
                                    formik.setFieldValue('_address.cbml', `${values.cbmls.uabi}`, false);
                                    return Promise.resolve();
                                }}
                            />
                        </div>
                    </div>
                    <ErrorMessage name="_address.name" />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label className="form-label">
                        Tipo de activo <span className="text-danger">*</span>
                    </label>
                    <div style={{ height: '33.5px', lineHeight: '33.5px' }}>
                        {active_type.map((item, i) => {
                            return (
                                <label key={i} className="d-inline-block ms-1 me-1">
                                    <Field
                                        type="checkbox"
                                        name="active_type"
                                        value={item}
                                        className="me-2"
                                        onChange={onChangeActiveType(formik.values.active_type, formik.setFieldValue)}
                                    />
                                    {item}
                                </label>
                            );
                        })}
                    </div>
                    <ErrorMessage name="active_type" />
                </div>
            </div>
            <div className={`row ${context.device === "sm" && "my-5"}`}>
                <div className="col-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-9">
                            <label htmlFor="plot_area_id" className="form-label">
                                Área Lote
                            </label>
                        </div>
                        {inventory && (
                            <div className="col-12 col-lg-3">
                                <ModalDivideAreas total_area={formik.values.plot_area} formik={formik} type={'Lote'} />
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <Field
                            type="number"
                            className="form-control border-end-0"
                            id="plot_area_id"
                            name="plot_area"
                            disabled={!formik.values.active_type?.includes('Lote')}
                            // onChange={(e) => {
                            //     formik.handleChange(e);
                            //     // const value1 = parseFloat(e.target.value || 0);
                            //     // const value2 = parseFloat(formik.values.construction_area || 0);
                            //     //formik.setFieldValue('total_area', value1 + value2, false);
                            // }}
                            min={0}
                            onChange={number_validate(10)}
                        />
                        <div className="input-group-prepend">
                            <Field
                                component={Select}
                                className="input-group-text bg-white border-start-0"
                                name="plot_area_unit"
                                defaultValue="m2"
                                options={[
                                    {
                                        id: "m2",
                                        name: (
                                            <span>
                                                m<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "yd2",
                                        name: (
                                            <span>
                                                yd<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "ft2",
                                        name: (
                                            <span>
                                                ft<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                ]}
                            />
                            {/* <span className="input-group-text bg-white border-start-0">
                                m<sup>2</sup>
                            </span> */}
                        </div>
                    </div>
                    <ErrorMessage name="plot_area" />
                </div>
                <div className="col-12 col-md-6 col-lg-6">
                    <div className="row">
                        <div className="col-9">
                            <label htmlFor="area_construccion_id" className="form-label">
                                Área Construcción
                            </label>
                        </div>
                        {inventory && (
                            <div className="col-12 col-lg-3">
                                <ModalDivideAreas
                                    total_area={formik.values.construction_area}
                                    formik={formik}
                                    type={'Construcción'}
                                />
                            </div>
                        )}
                    </div>
                    <div className="input-group">
                        <Field
                            type="number"
                            className="form-control border-end-0"
                            id="area_construccion_id"
                            name="construction_area"
                            min={0}
                            disabled={
                                !(
                                    formik.values.active_type?.includes(active_type[1]) ||
                                    formik.values.active_type?.includes(active_type[2]) ||
                                    formik.values.active_type?.includes(active_type[3])
                                )
                            }
                            onChange={number_validate(10)}
                        // onChange={(e) => {
                        //     formik.handleChange(e);
                        //     // const value2 = parseFloat(e.target.value || 0);
                        //     // const value1 = parseFloat(formik.values.plot_area || 0);
                        //     //formik.setFieldValue('total_area', value1 + value2, false);
                        // }}
                        />
                        <div className="input-group-prepend">
                            <Field
                                component={Select}
                                className="input-group-text bg-white border-start-0"
                                name="construction_area_unit"
                                defaultValue="m2"
                                options={[
                                    {
                                        id: "m2",
                                        name: (
                                            <span>
                                                m<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "yd2",
                                        name: (
                                            <span>
                                                yd<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                    {
                                        id: "ft2",
                                        name: (
                                            <span>
                                                ft<sup>2</sup>
                                            </span>
                                        ),
                                    },
                                ]}
                            />
                            {/* <span className="input-group-text bg-white border-start-0">
                                m<sup>2</sup>
                            </span> */}

                        </div>
                    </div>
                    <ErrorMessage name="construction_area" />
                </div>
            </div>

            {englobe && (
                <div className="row">
                    <div className="col-8">
                        <label htmlFor="form-select" className="form-label">
                            Adjuntar Matrícula
                        </label>
                        <Field name="document" component={DocumentModal} btn_label="Adjuntar" />
                        <ErrorMessage name="document" />
                    </div>
                </div>
            )}
            <div className="row">
                <div className="form-group col-12">
                    <label htmlFor="description_id" className="form-label">
                        Descripción del inmueble <span className="text-danger">*</span>
                        <Tooltip title="Lorem impsu texto descriptivo">
                            <i className="fa fa-info-circle text-muted ms-2" style={{ fontSize: 14 }} />
                        </Tooltip>
                    </label>
                    <Field
                        disabled={disabled}
                        name="description"
                        id="description_id"
                        as="textarea"
                        className="form-control"
                        maxLength={1000}
                    />
                    <ErrorMessage name="description" withCount max={1000} />
                </div>
            </div>

            {type !== 'create' && (
                <>
                    <div className="row">
                        <div className={`form-group col-12 col-md-6 col-lg-6`}>
                            <label htmlFor="audit_trail_created_by_id" className="form-label">
                                Creado por
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="audit_trail_created_by_id"
                                name="audit_trail.created_by"
                                disabled
                            />
                            <ErrorMessage />
                        </div>
                        <div className="col-12 col-lg-3">
                            <label htmlFor="audit_trail_created_on_id" className="form-label">
                                Fecha creación
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="audit_trail_created_on_id"
                                name="audit_trail.created_on"
                                value={formatDate(formik.values.audit_trail?.created_on)}
                                disabled
                            />
                            <ErrorMessage />
                        </div>
                        <div className="col-12 col-lg-3">
                            <label htmlFor="sociedad_id" className="form-label">
                                Sociedad
                            </label>
                            <Field
                                type="text"
                                className="form-control"
                                id="sociedad_id"
                                name="sociedad"
                                value="FIMM"
                                disabled
                            />
                            <ErrorMessage />
                        </div>
                    </div>
                    {inventory && (
                        <>
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="accounting_amount_id" className="form-label">
                                        Importe Contabilidad
                                    </label>
                                    <div className="input-group w-100">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-end-0">$</span>
                                        </div>
                                        <Field
                                            type="number"
                                            className="form-control text-end"
                                            id="accounting_amount_id"
                                            name="accounting_amount"
                                        />
                                    </div>
                                    <ErrorMessage />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="periodo_contable_id" className="form-label">
                                        Período contable
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="periodo_contable_id"
                                        name="periodo_contable"
                                        value={extractMonth(formik.values.audit_trail?.created_on)}
                                        disabled

                                    // EL MES
                                    />
                                    <ErrorMessage />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="counterpart_id" className="form-label">
                                        Contrapartida
                                    </label>
                                    <Field
                                        type="number"
                                        className="form-control"
                                        id="counterpart_id"
                                        name="counterpart"
                                    />
                                    <ErrorMessage />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="assignments_id" className="form-label">
                                        Asignaciones
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="assignments_id"
                                        name="assignments"
                                        disabled={inventoryEdit}
                                    />
                                    <ErrorMessage />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="exploitation_value_id" className="form-label">
                                        Valor Aprovechamiento
                                    </label>
                                    <div className="input-group w-100">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-end-0">$</span>
                                        </div>
                                        <Field
                                            type="number"
                                            className="form-control text-end"
                                            id="exploitation_value_id"
                                            name="exploitation_value"
                                            disabled={inventoryEdit}
                                            min={0}
                                            max={99999999999999999999}
                                        />
                                        <ErrorMessage />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="authorization_value_id" className="form-label">
                                        Valor de Autorización
                                    </label>
                                    <div className="input-group w-100">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-end-0">$</span>
                                        </div>
                                        <Field
                                            type="number"
                                            className="form-control text-end"
                                            id="authorization_value_id"
                                            name="authorization_value"
                                            disabled={inventoryEdit}
                                            min={0}
                                            max={99999999999999999999}
                                        />
                                    </div>
                                    <ErrorMessage />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="years_useful_life_id" className="form-label">
                                        Vida útil años
                                    </label>
                                    <Field
                                        //disabled
                                        name="years_useful_life"
                                        id="years_useful_life_id"
                                        type="number"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="years_useful_life" />
                                </div>
                                <div className="col-12 col-lg-3">
                                    <label htmlFor="useful_life_periods_id" className="form-label">
                                        Vida útil Períodos
                                    </label>
                                    <Field
                                        //disabled
                                        name="useful_life_periods"
                                        id="useful_life_periods_id"
                                        type="number"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="useful_life_periods" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-8">
                                            <label htmlFor="canyon_value_id" className="form-label">
                                                Valor del Canon
                                            </label>
                                        </div>
                                        {(inventory && (formik.values.disposition_type === "Inversión Social" || formik.values.disposition_type === "Inversión")) && (
                                            <div className="col-4">
                                                <LinkButton
                                                    name="Aplicar Porcentaje"
                                                    icon={<i className="fa fa-plus-circle" aria-hidden="true" />}
                                                    onClick={() => {
                                                        context.set_canon_type(formik.values.disposition_type === "Inversión Social" ? "inversion_social" : formik.values.disposition_type === "Inversión" ? "inversion" : null)
                                                        context.toggle_percentage_modal();
                                                    }}
                                                >
                                                </LinkButton>
                                            </div>
                                        )}
                                    </div>
                                    <div className="input-group w-100">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white border-end-0">$</span>
                                        </div>
                                        <Field
                                            type="number"
                                            className="form-control text-end"
                                            id="canyon_value_id"
                                            name="canyon_value"
                                            disabled={inventoryEdit}
                                            min={0}
                                            max={99999999999999999999}
                                        />
                                    </div>
                                    <ErrorMessage />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="disposition_type_id" className="form-label">
                                        Tipo Disposición
                                    </label>
                                    <Field
                                        as="select"
                                        className="form-select"
                                        id="disposition_type_id"
                                        name="disposition_type"
                                        disabled={inventoryEdit}
                                    >
                                        <option key="availability_type" value="" hidden>
                                            --Seleccione disponibilidad--
                                        </option>
                                        {formik.values.destination_type !== 'PÚBLICO' && (
                                            <>
                                                <option key="availability_type1" value="Misional">
                                                    Misional
                                                </option>
                                                <option key="availability_type2" value="Misional social">
                                                    Misional social
                                                </option>
                                                <option key="availability_type3" value="Inversión">
                                                    Inversión
                                                </option>
                                                <option key="availability_type4" value="Inversión Social">
                                                    Inversión Social
                                                </option>
                                            </>
                                        )}
                                        {formik.values.destination_type !== 'FISCAL' && (
                                            <>
                                                <option key="availability_type5" value="Administración">
                                                    Administración
                                                </option>
                                                <option key="availability_type6" value="Mantenimiento">
                                                    Mantenimiento
                                                </option>
                                                <option key="availability_type7" value="Aprovechamiento">
                                                    Aprovechamiento
                                                </option>
                                                <option key="availability_type8" value="Calles">
                                                    Calles
                                                </option>
                                                <option key="availability_type9" value="Via">
                                                    Vía
                                                </option>
                                                <option key="availability_type10" value="Plaza">
                                                    Plaza
                                                </option>
                                                <option key="availability_type11" value="Parque">
                                                    Parque
                                                </option>
                                                <option key="availability_type12" value="Zona Verde">
                                                    Zona Verde
                                                </option>
                                                <option key="availability_type13" value="Zona dura">
                                                    Zona dura
                                                </option>
                                                <option key="availability_type14" value="Plaza">
                                                    Plaza
                                                </option>
                                            </>
                                        )}
                                        <option key="availability_type15" value="sin Asignar">
                                            sin Asignar
                                        </option>
                                    </Field>
                                    <ErrorMessage name="disposition_type" />
                                </div>
                            </div>
                            {formik.values.disposition_type === "Inversión Social" &&
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="social_investment_type_id" className="form-label">
                                            Tipo Inversión Social <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            disabled={disabled}
                                            name="social_investment_type"
                                            as="select"
                                            className="form-select"
                                            id="social_investment_type_id"
                                        >
                                            <option value="" hidden>
                                                -- Tipo de Inversión Social --
                                            </option>
                                            <option key="Locales Comerciales" value="Locales Comerciales">
                                                Locales Comerciales
                                            </option>
                                            <option key="Vivienda Social" value="Vivienda Social">
                                                Vivienda Social
                                            </option>
                                        </Field>

                                        <ErrorMessage name="social_investment_type" />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="social_program_id" className="form-label">
                                            Programa Social <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            id="social_program_id"
                                            name="social_program"
                                            disabled={inventoryEdit}
                                            maxLength={50}
                                        />
                                        <ErrorMessage name="social_program" withCount max={50} />
                                    </div>
                                </div>
                            }

                        </>
                    )}
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="comentarios_id" className="form-label">
                                Comentarios
                            </label>
                            <Field
                                as="textarea"
                                className="form-control"
                                id="comentarios_id"
                                name="comentarios"
                                placeholder="Comentarios y anotaciones"
                            />
                            <ErrorMessage />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
