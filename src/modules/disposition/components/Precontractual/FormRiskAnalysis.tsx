import { FC } from 'react';
import ErrorMessage from './../../../../utils/ui/error_messge';
import { Field } from 'formik';

interface FormProps {
    formik: any;
}

export const FormRiskAnalysis: FC<FormProps> = ({formik}) => {
    return (
        <>
            <div className="div" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                Análisis riesgos regulatorio
            </div>
            <hr />
            <div className="row">
                {/* <div className="col-2 text-center" style={{marginTop: 30, fontSize: '14px', fontWeight: 'bold'}}>Riesgo regulatorio</div> */}
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="regulatory_risk.degree_occurrence" className="form-label">
                        Grado de ocurrencia
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="regulatory_risk.degree_occurrence"
                        name="regulatory_risk.degree_occurrence"
                        disabled={false}
                    >
                        <option key="regulatory" value="" disabled>
                            -- Seleccionar --
                        </option>
                        <option key="muy bajo" value="MUY BAJO">
                            muy bajo
                        </option>
                        <option key="bajo" value="BAJO">
                            bajo
                        </option>
                        <option key="medio" value="MEDIO">
                            medio
                        </option>
                        <option key="alto" value="ALTO">
                            alto
                        </option>
                        <option key="muy alto" value="MUY ALTO">
                            muy alto
                        </option>
                    </Field>
                    <ErrorMessage name="regulatory_degree_occurrence" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="regulatory_risk.impact_degree" className="form-label">
                        Grado de impacto
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="regulatory_risk.impact_degree"
                        name="regulatory_risk.impact_degree"
                        disabled={false}
                    >
                        <option key="regulatory_impact" value="" disabled>
                            -- Seleccionar --
                        </option>
                        <option key="muy bajo" value="MUY BAJO">
                            muy bajo
                        </option>
                        <option key="bajo" value="BAJO">
                            bajo
                        </option>
                        <option key="medio" value="MEDIO">
                            medio
                        </option>
                        <option key="alto" value="ALTO">
                            alto
                        </option>
                        <option key="muy alto" value="MUY ALTO">
                            muy alto
                        </option>
                    </Field>
                    <ErrorMessage name="regulatory_risk.impact_degree" />
                </div>
                <div className="col-12 col-lg-6 col-md-12">
                    <label htmlFor="regulatory_risk.responsible" className="form-label">
                        Responsable
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="regulatory_risk.responsible"
                        name="regulatory_risk.responsible"
                        disabled={false}
                    >
                        <option key="regulatory_responsible_id" value="" disabled>
                            -- Seleccionar --
                        </option>
                        <option key="Contratista" value="Contratista">
                            Contratista
                        </option>
                        <option key="municipio" value="municipio">
                            municipio
                        </option>
                    </Field>
                    <ErrorMessage name="regulatory_risk.responsible" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="regulatory_risk.mitigation_mechanism" className="form-label">
                        Mecanismo de mitigación
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="regulatory_risk.mitigation_mechanism"
                        name="regulatory_risk.mitigation_mechanism"
                        placeholder=""
                        autoComplete="off"
                        maxLength={280}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="regulatory_risk.mitigation_mechanism" withCount max={280} />
                </div>
            </div>
            <div className="div" style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '14px' }}>
                Análisis riesgos operativos
            </div>
            <hr />
            <div className="row">
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="operational_risk.degree_occurrence" className="form-label">
                        Grado de ocurrencia
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="operational_risk.degree_occurrence"
                        name="operational_risk.degree_occurrence"
                        disabled={false}
                    >
                        <option key="operational_risk.degree_occurrence" value="" disabled>
                            --Seleccionar--
                        </option>
                        <option key="muy bajo" value="MUY BAJO">
                            muy bajo
                        </option>
                        <option key="bajo" value="BAJO">
                            bajo
                        </option>
                        <option key="medio" value="MEDIO">
                            medio
                        </option>
                        <option key="alto" value="ALTO">
                            alto
                        </option>
                        <option key="muy alto" value="MUY ALTO">
                            muy alto
                        </option>
                    </Field>
                    <ErrorMessage name="operational_risk.degree_occurrence" />
                </div>
                <div className="col-12 col-lg-3 col-md-6">
                    <label htmlFor="operational_risk.impact_degree" className="form-label">
                        Grado de impacto
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="operational_risk.impact_degree"
                        name="operational_risk.impact_degree"
                        disabled={false}
                    >
                        <option key="operative_impact_degree" value="" disabled>
                            --Seleccionar--
                        </option>
                        <option key="muy bajo" value="MUY BAJO">
                            muy bajo
                        </option>
                        <option key="bajo" value="BAJO">
                            bajo
                        </option>
                        <option key="medio" value="MEDIO">
                            medio
                        </option>
                        <option key="alto" value="ALTO">
                            alto
                        </option>
                        <option key="muy alto" value="MUY ALTO">
                            muy alto
                        </option>
                    </Field>
                    <ErrorMessage name="operational_risk.impact_degree" />
                </div>
                <div className="col-12 col-lg-6 col-md-12">
                    <label htmlFor="operational_risk.responsible" className="form-label">
                        Responsable
                    </label>
                    <Field
                        as="select"
                        className="w-100 form-select form-control"
                        id="operational_risk.responsible"
                        name="operational_risk.responsible"
                        disabled={false}
                    >
                        <option key="operative_responsible" value="" disabled>
                            --Seleccionar--
                        </option>
                        <option key="Contratista" value="Contratista">
                            Contratista
                        </option>
                        <option key="municipio" value="municipio">
                            municipio
                        </option>
                    </Field>
                    <ErrorMessage name="operational_risk.responsible" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="operational_risk.mitigation_mechanism" className="form-label">
                        Mecanismo de mitigación
                    </label>
                    <Field
                        as="textarea"
                        className="form-control"
                        id="operational_risk.mitigation_mechanism"
                        name="operational_risk.mitigation_mechanism"
                        placeholder=""
                        autoComplete="off"
                        maxLength={280}
                        onChange={(e) => {
                            e.preventDefault();
                            const { value } = e.target;
                            const regex = new RegExp(/^[A-Za-z0-9\s\\Ñ\\ñ\\áéíóúüÁÉÍÓÚÜ,.;:()¿?¡!"]*$/g);
                            if (regex.test(value.toString())) {
                                formik.handleChange(e);
                            }
                        }}
                    />
                    <ErrorMessage name="operational_risk.mitigation_mechanism" withCount max={280} />
                </div>
            </div>
        </>
    );
};
