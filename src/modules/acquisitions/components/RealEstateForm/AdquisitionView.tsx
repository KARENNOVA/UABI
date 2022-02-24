import React, { FC } from 'react';
import { AdquisitionsItf } from '../../../../utils/interfaces';
import AcquisitionList from './AcquisitionList';
import { Card } from '../../../../utils/ui';
import AcquisitionModal from './AcquisitionModal';

interface AcquisitionsFromProps {
    type?: 'view' | 'edit' | 'create';
    disabled?: boolean;
    acquisitions?: AdquisitionsItf[];
    formik: any;
    inventory?: boolean
}

const AcquisitionsView: FC<AcquisitionsFromProps> = ({ type, disabled, acquisitions, formik, inventory }) => {
    return (
        <Card
            title="Información de adquisición"
            extra={
                <>{!inventory ?
                    <AcquisitionModal
                        type="create"
                        btn_label="Agregar Adquisición"
                        active_type={formik.values.active_type}
                        onChange={async (aux_values) => {
                            const values = { ...aux_values, origin: aux_values.origin ? aux_values.origin : '' };
                            const new_acquisitions = [...(formik.values.acquisitions ?? []), values];
                            formik.setFieldValue('acquisitions', new_acquisitions, false);
                        }}
                    />
                    :
                    ""
                }
                </>

            }
        >
            <div className="col-12">
                <div className="row">
                    <AcquisitionList acquisitions={acquisitions || []} type={type} disabled={disabled} />
                </div>
            </div>
        </Card>
    );
};

AcquisitionsView.defaultProps = {};

export default AcquisitionsView;
