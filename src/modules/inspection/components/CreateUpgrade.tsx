import React, { FC } from 'react';
import { Card } from '../../../utils/ui';
// import { useHistory } from 'react-router-dom';
import UpgradeForm from './UpgradeForm';
import { IOccupant, NewInspection } from '../custom_types';
import { PersonalInformationForm } from "../../../utils/ui/PersonaM";
import { compute_persona_name } from "../../../utils";
import { useContext } from 'react';
import { TemplateContext } from '../../../utils/components/template/template_context';
interface CreateUpgradeProps {
    inspection: NewInspection;
    owner: any;
    innerRef: any;
    onSubmit: (values) => void;
}
const CreateUpgrade: FC<CreateUpgradeProps> = ({ owner, innerRef, onSubmit }) => {
    console.log("PersonalInformationForm", owner)
    // const history = useHistory();
    const context = useContext(TemplateContext);
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-12">
                    <div className="content_box_table">
                        <div className="title">Datos del tenedor u ocupante del bien inmueble</div>
                        <div className="table_content">
                            <table className="box-table">
                                <thead>
                                    <tr>
                                        <th>Nombres y apellido</th>
                                        <th>Documento de identidad</th>
                                        {(context.device === 'lg' || context.device === 'md') &&
                                            <>
                                                <th>Teléfono de contacto</th>
                                                <th>Correo electrónico</th>
                                            </>

                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{compute_persona_name(owner) || '-'}</td>
                                        <td>{owner?.documentNumber || '-'}</td>
                                        {(context.device === 'lg' || context.device === 'md') &&
                                            <>
                                                <td>{owner?.phoneNumber || '-'}</td>
                                                <td>{owner?.email || '-'}</td>
                                            </>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <Card
                        title={
                            <span className="">
                                Actualizar datos del tenedor u ocupante del bien inmueble
                            </span>
                        }
                    >
                        <PersonalInformationForm
                            withNit={true}
                            persona={owner}
                            form_ref={innerRef}
                            disabled={false}
                            onChange={(values, form) => {
                                return onSubmit(values)
                            }}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateUpgrade;
