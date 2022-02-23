import { FC, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getList } from './service';
import { ICountryAddressAttributes } from '../../interfaces';
import Tooltip from 'antd/lib/tooltip';
import ErrorMessage from '../../../utils/ui/error_messge';
import Select from '../../ui/select';
import TooltipField from '../../ui/tooltip_field';

interface LocationProps {
    modalClose?: (values, callback) => void;
    view?: string;
    zone?: string;
    innerRef?: any;
}

const Location: FC<LocationProps> = ({ modalClose, view, zone, innerRef }) => {
    const [countries, setCountries] = useState<ICountryAddressAttributes[]>([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [communisses, setCommunisses] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);

    const initialValues: any = {
        country: 1,
        country_name: '',
        state: 1,
        state_name: '',
        city: 1,
        city_name: '',
        commune: '',
        commune_name: '',
        neighborhood: '',
        neighborhood_name: '',
        stratum: '',
        block: '',
        lot: '',
        type: '',
        first_number: '',
        first_appendix: '',
        first_orientation: '',
        second_number: '',
        second_appendix: '',
        second_orientation: '',
        identifier: '',
        indicaciones: '',
    };

    const schema = Yup.object().shape({
        country: Yup.string().required('Campo obligatorio'),
        state: Yup.string().required('Campo obligatorio'),
        city: Yup.string().required('Campo obligatorio'),
        commune: Yup.string().required('Campo obligatorio'),
        neighborhood: Yup.string().required('Campo obligatorio'),
        type: Yup.string().required('Campo obligatorio'),
        first_number: Yup.string().required('Campo obligatorio'),
        second_number: Yup.string().required('Campo obligatorio'),
        identifier: Yup.string().required('Campo obligatorio'),
    });

    useEffect(() => {
        (async () => {
            const res: any[] = await Promise.all([
                getList('countries'),
                getList('states', { father: initialValues.country }),
                getList('cities', { father: initialValues.state }),
                getList('communes', { father: initialValues.city }),
            ]);
            setCountries(res[0]);
            setStates(res[1]);
            setCities(res[2]);
            setCommunisses(res[3]);
        })();
    }, []);

    const letters = generate_two_letters_combination();
    return (
        <Formik
            enableReinitialize
            innerRef={innerRef}
            initialValues={initialValues}
            validationSchema={(view === 'general' || view === 'user') && schema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                modalClose &&
                    modalClose(values, () => {
                        setSubmitting(false);
                        resetForm();
                    });
            }}
        >
            {({ values, isValid, isSubmitting, setFieldValue, handleChange }) => {
                const has_country = values.country !== '';
                let has_state = values.state !== '';
                let has_city = values.city !== '';
                let has_commune = values.commune !== '';
                const has_countries = countries.length > 0;
                const has_states = states.length > 0;
                const has_cities = cities.length > 0;
                const has_communisses = communisses.length > 0;
                const has_neighborhoods = neighborhoods.length > 0;

                const comune = communisses.find((c: any) => c.id === values.commune);
                const _neighborhood = neighborhoods.find((c: any) => c.id === values.neighborhood);
                const cb = `${comune ? `${comune.code}`.padStart(2, '0') : ''}${
                    _neighborhood ? `${_neighborhood.code}`.padStart(2, '0') : ''
                }`;

                if (values.country === 1 && values.country_name === '' && has_countries) {
                    const country: any = countries.find((c: any) => c.id === 1);
                    setFieldValue('country_name', country?.name, false);
                }
                if (values.state === 1 && values.state_name === '' && has_states) {
                    const state: any = states.find((c: any) => c.id === 1);
                    setFieldValue('state_name', state?.name, false);
                }
                if (values.city === 1 && values.city_name === '' && has_cities) {
                    const city = cities.find((c: any) => c.id === 1);
                    setFieldValue('city_name', city?.name, false);
                }

                const number_validate = (limit?: number) => (e) => {
                    e.preventDefault();
                    const regex = new RegExp(`^[+]?\\d${limit ? `{0,${limit}}` : '*'}$`);
                    if (regex.test(e.target.value.toString())) {
                        handleChange(e);
                    }
                };
                return (
                    <Form>
                        <div className="form-row row">
                            <div className="form-group col-12 col-md-4 col-lg-4">
                                <label htmlFor="" className="form-label">
                                    País <span className="text-danger">*</span>
                                </label>
                                <Field
                                    component={Select}
                                    name="country"
                                    options={countries}
                                    placeholder="--país--"
                                    extra_on_change={async (value) => {
                                        const list = await getList('states', { father: value });
                                        setStates(list);
                                        setFieldValue('state', '');
                                        setFieldValue('city', '');
                                        setFieldValue('commune', '');
                                        setFieldValue('neighborhood', '');
                                        const country_r: any = countries.find((c: any) => c.id === value);
                                        setFieldValue('country_name', country_r?.name, false);
                                    }}
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="country" />
                            </div>
                            <div className="form-group col-12 col-md-4 col-lg-4">
                                <label htmlFor="" className="form-label">
                                    Departamento <span className="text-danger">*</span>
                                </label>
                                <Field
                                    name="state"
                                    disabled={!has_country || !has_countries}
                                    component={Select}
                                    options={[states[0]]}
                                    placeholder="--departamento--"
                                    extra_on_change={async (value) => {
                                        const list = await getList('cities', { father: value });
                                        setCities(list);
                                        setFieldValue('city', '');
                                        setFieldValue('commune', '');
                                        setFieldValue('neighborhood', '');
                                        const state_r: any = states.find((c) => c.id === value);
                                        setFieldValue('state_name', state_r?.name, false);
                                    }}
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="state" />
                            </div>
                            <div className="form-group col-12 col-md-4 col-lg-4">
                                <label htmlFor="" className="form-label">
                                    {zone && zone === 'Rural' ? 'Municipio ' : 'Ciudad '}
                                    <span className="text-danger">*</span>
                                </label>
                                <Field
                                    name="city"
                                    disabled={!has_state || !has_states}
                                    component={Select}
                                    placeholder={`--${zone && zone === 'Rural' ? 'municipio' : 'ciudad'}--`}
                                    options={[cities[0]]}
                                    extra_on_change={async (value) => {
                                        const list = await getList('communes', { father: value });
                                        setCommunisses(list);
                                        setFieldValue('commune', '');
                                        setFieldValue('neighborhood', '');
                                        const city_r: any = cities.find((c) => c.id === value);
                                        setFieldValue('city_name', city_r?.name, false);
                                    }}
                                    showSearch
                                    filterOption={(input, option) => {
                                        return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                />
                                <ErrorMessage name="city" />
                            </div>
                        </div>
                        {(view === 'general' || view === 'user' || view === 'comodato') && (
                            <div className="form-row row">
                                <div className="form-group col-12 col-md-4 col-lg-4">
                                    <label htmlFor="" className="form-label">
                                        {zone && zone === 'Rural' ? 'Corregimiento ' : 'Comuna '}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="commune"
                                        disabled={!has_city || !has_communisses}
                                        component={Select}
                                        placeholder={`--${zone && zone === 'Rural' ? 'corregimiento' : 'comuna'}--`}
                                        options={communisses.map((a) => ({
                                            id: a.id,
                                            name: `${`${a.code}`.padStart(2, '0')} - ${a.name}`,
                                        }))}
                                        extra_on_change={async (value) => {
                                            const list = await getList('neighborhoods', {
                                                father: value,
                                            });
                                            setNeighborhoods(list);
                                            setFieldValue('neighborhood', '');
                                            const commune_r: any = communisses.find((c) => c.id === value);
                                            setFieldValue('commune_name', commune_r?.name, false);
                                        }}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="commune" />
                                </div>
                                <div className="form-group col-12 col-md-4 col-lg-4">
                                    <label htmlFor="" className="form-label">
                                        {zone && zone === 'Rural' ? 'Vereda ' : 'Barrio '}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="neighborhood"
                                        disabled={!has_commune || !has_neighborhoods}
                                        component={Select}
                                        placeholder={`--${zone && zone === 'Rural' ? 'vereda' : 'barrio'}--`}
                                        options={neighborhoods.map((a) => ({
                                            id: a.id,
                                            name: `${`${a.code}`.padStart(2, '0')} - ${a.name}`,
                                        }))}
                                        extra_on_change={async (value) => {
                                            const neighborhood_r: any = neighborhoods.find((c) => c.id === value);
                                            setFieldValue('neighborhood_name', neighborhood_r?.name, false);
                                        }}
                                        showSearch
                                        filterOption={(input, option) => {
                                            return option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    />
                                    <ErrorMessage name="neighborhood" />
                                </div>

                                {view !== 'user' && view !== 'comodato' && (
                                    <>
                                        <div className="form-group col-12 col-md-4 col-lg-4">
                                            <label htmlFor="" className="form-label">
                                                CB
                                            </label>
                                            <input className="w-100 form-control" type="text" value={cb} disabled />
                                            <ErrorMessage />
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-6">
                                            <label htmlFor="" className="form-label">
                                                Manzana <span className="text-danger">*</span>
                                            </label>
                                            <TooltipField text="Lorem impsu texto descriptivo" />
                                            <Field
                                                className="w-100 form-control"
                                                type="text"
                                                name="block"
                                                autoComplete="off"
                                                min={0}
                                                max={9999}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    const { value } = e.target;
                                                    const regex = /^[0-9]{0,3}$/;
                                                    if (regex.test(value.toString())) {
                                                        handleChange(e);
                                                    }
                                                }}
                                            />

                                            <ErrorMessage name="block" />
                                        </div>

                                        <div className="form-group col-12 col-lg-6 col-md-6">
                                            <label htmlFor="" className="form-label">
                                                Lote <span className="text-danger">*</span>
                                            </label>
                                            <TooltipField text="Lorem impsu texto descriptivo" />
                                            <Field
                                                className="w-100 form-control"
                                                type="string"
                                                name="lot"
                                                autoComplete="off"
                                                min={0}
                                                max={999}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    const { value } = e.target;
                                                    const regex = /^[0-9]{0,4}$/;
                                                    if (regex.test(value.toString())) {
                                                        handleChange(e);
                                                    }
                                                }}
                                            />

                                            <ErrorMessage name="lot" />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {(view === 'general' || view === 'user') && (
                            <>
                                <h5>Dirección</h5>
                                <hr />
                                <div className="from-row row">
                                    <div className="form-group col-12 col-lg-3 col-md-3">
                                        <label htmlFor="" className="form-label">
                                            Tipo <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            name="type"
                                            component={Select}
                                            placeholder={`Tipo`}
                                            options={[
                                                { id: '', name: ' ---' },
                                                { id: 'CL', name: 'Calle' },
                                                { id: 'CR', name: 'Carrera' },
                                                { id: 'CQ', name: 'Circular' },
                                                { id: 'DG', name: 'Diagonal' },
                                                { id: 'TV', name: 'Transversal' },
                                            ]}
                                            // extra_on_change={async (value) => {
                                            //     if (value === 'CL') {
                                            //         setFieldValue('first_orientation', 'Sur', false);
                                            //         setFieldValue('second_orientation', 'Este', false);
                                            //     } else if (value === 'CR') {
                                            //         setFieldValue('first_orientation', 'Este', false);
                                            //         setFieldValue('second_orientation', 'Sur', false);
                                            //     } else {
                                            //         setFieldValue('first_orientation', '', false);
                                            //         setFieldValue('second_orientation', '', false);
                                            //     }
                                            // }}
                                        />
                                        <ErrorMessage name="type" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Número <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            name="first_number"
                                            type="number"
                                            className="w-100 form-control"
                                            min={0}
                                            onChange={number_validate(3)}
                                        />

                                        <ErrorMessage name="first_number" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Letra
                                        </label>
                                        <Field
                                            name="first_appendix"
                                            component={Select}
                                            placeholder="Letra"
                                            options={letters.map((l) => ({ id: l, name: l }))}
                                            showSearch
                                            filterOption={(input, option) => {
                                                return (
                                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                        <ErrorMessage name="first_appendix" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Orientación
                                        </label>
                                        <Field
                                            name="first_orientation"
                                            component={Select}
                                            placeholder="Orientación"
                                            options={[
                                                { id: '', name: ' ---' },
                                                { id: 'Sur', name: 'Sur' },
                                                { id: 'Norte', name: 'Norte' },
                                                { id: 'Este', name: 'Este' },
                                                { id: 'Oeste', name: 'Oeste' },
                                            ]}
                                        />

                                        <ErrorMessage name="first_orientation" />
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Número <span className="text-danger">*</span>
                                        </label>
                                        <div className="input-group">
                                            <span
                                                className="input-group-text"
                                                style={{ background: 'white', borderRight: 'none' }}
                                                id="basic-addon1"
                                            >
                                                #
                                            </span>
                                            <Field
                                                name="second_number"
                                                type="number"
                                                className="form-control"
                                                style={{ borderLeft: 'none' }}
                                                min={0}
                                                onChange={number_validate(3)}
                                            />
                                        </div>

                                        <ErrorMessage name="second_number" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Letra
                                        </label>
                                        <Field
                                            name="second_appendix"
                                            component={Select}
                                            placeholder="Letra"
                                            options={letters.map((l) => ({ id: l, name: l }))}
                                            showSearch
                                            filterOption={(input, option) => {
                                                return (
                                                    option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                );
                                            }}
                                        />
                                        <ErrorMessage name="first_appendix" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Orientación
                                        </label>
                                        <Field
                                            name="second_orientation"
                                            component={Select}
                                            placeholder="Orientación"
                                            options={[
                                                { id: '', name: ' ---' },
                                                { id: 'Sur', name: 'Sur' },
                                                { id: 'Norte', name: 'Norte' },
                                                { id: 'Este', name: 'Este' },
                                                { id: 'Oeste', name: 'Oeste' },
                                            ]}
                                        />
                                        <ErrorMessage name="first_orientation" />
                                    </div>
                                    <div className="form-group col-12 col-md-3 col-lg-3">
                                        <label htmlFor="" className="form-label">
                                            Indicativo <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            name="identifier"
                                            type="number"
                                            className="w-100 form-control"
                                            min={0}
                                            onChange={number_validate(3)}
                                        />

                                        <ErrorMessage name="identifier" />
                                    </div>
                                </div>
                                <div className="from-row row">
                                    <div className="form-group col-12 col-md-4 col-lg-4">
                                        <label htmlFor="" className="form-label">
                                            Estrato
                                            <span className="text-danger"> *</span>
                                        </label>
                                        <Field
                                            name="social_stratum"
                                            component={Select}
                                            placeholder="Estrato"
                                            options={[
                                                { id: 1, name: '1' },
                                                { id: 2, name: '2' },
                                                { id: 3, name: '3' },
                                                { id: 4, name: '4' },
                                                { id: 5, name: '5' },
                                                { id: 6, name: '6' },
                                            ]}
                                        />

                                        <ErrorMessage name="stratum" />
                                    </div>
                                    <div className="form-group col-12 col-md-8 col-lg-8">
                                        <label htmlFor="" className="form-label">
                                            Indicaciones
                                        </label>
                                        <TooltipField text="Lorem impsu texto descriptivo" />
                                        <Field
                                            name="indicaciones"
                                            type="text"
                                            className="form-control"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                const { value } = e.target;
                                                const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ]*$/g);
                                                if (regex.test(value.toString())) {
                                                    handleChange(e);
                                                }
                                            }}
                                        />
                                        <ErrorMessage name="indicaciones" />
                                    </div>
                                </div>
                            </>
                        )}
                        <hr style={{ margin: 0 }} />
                        <div className="d-flex justify-content-end mt-2">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                Consultar
                                {isSubmitting && (
                                    <i
                                        className="fa fa-spinner fa-spin"
                                        style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                                    />
                                )}
                            </button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Location;

const generate_two_letters_combination = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const arr = letters.split('');
    for (let i = 0; i < letters.length; i++) {
        const first_letter = letters[i];
        for (let j = 0; j < letters.length; j++) {
            const new_letter = first_letter + letters[j];
            arr.push(new_letter);
            if (new_letter === 'HH') {
                break;
            }
        }
        if (first_letter === 'H') {
            break;
        }
    }
    return arr;
};
