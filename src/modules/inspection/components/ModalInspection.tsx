import Modal from 'antd/lib/modal/Modal';
import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRealEstateAttributes } from '../../../utils/interfaces';
import actions from './../../acquisitions/redux/actions/index';
import { Table } from 'antd';
import { LinkButton } from '../../../utils/ui/link';
import { useHistory } from 'react-router-dom';

interface InspectionModalProps {
    project_id?: number;
    onSave?: (values) => Promise<any>;
    disabled?: boolean;
}

const ModalInspection: FC<InspectionModalProps> = ({ /*onSave,*/ disabled, project_id }) => {
    let realEstates: IRealEstateAttributes[] = useSelector((store: any) => store.acquisitions.realEstates.value);
    let project: any = useSelector((store: any) => store.acquisitions.project.value);
    const dispatch = useDispatch();
    const history = useHistory();
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const open = () => {
        if (Number.isInteger(project_id)) {
            dispatch(actions.getRealEstatesByProject(project_id));
            dispatch(actions.getProject(project_id.toString()));
        }
        !disabled && set_is_visible(true);
    };
    const close = () => {
        dispatch(actions.clearRealEstates());
        set_is_visible(false);
    };

    const data = realEstates.map((r, i) => {
        return { ...r, key: `${r.id}_${i}` };
    });

    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            responsive: ['md'],
        },
        {
            title: 'Bien Inmueble',
            dataIndex: 'name',
        },
        {
            title: 'Matrícula',
            dataIndex: 'registry_number',
        },
        {
            title: 'Dirección',
            dataIndex: '',
            responsive: ['md'],
        },
        {
            title: 'Fecha de ultima Inspección',
            dataIndex: '',
            responsive: ['md'],
        },
        {
            title: '',
            dataIndex: 'id',
            render: (id) => (
                <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                        close();
                        history.push({
                            pathname: `/inspection/${id}/create/`,
                        });
                    }}
                >
                    <i className="fa fa-search d-inline-block d-sm-none" aria-hidden="true" />
                    <span className="d-none d-sm-inline-block">Inspeccionar</span>
                </button>
            ),
        },
    ];

    // const rowSelection = {
    //     onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
    //         console.log(`id: ${selectedRowKeys}`, 'realEstates: ', selectedRows);
    //         set_selectedRE(selectedRows);
    //     },
    // };

    return (
        <>
            <LinkButton
                name=""
                avatar={false}
                icon={
                    <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={() => {
                            open();
                        }}
                    />
                }
            />

            <Modal
                footer={
                    [
                        // <button
                        //     type="submit"
                        //     key="1"
                        //     className="btn btn-primary"
                        //     disabled={selectedRE.length === 0}
                        //     onClick={() => {
                        //         if (selectedRE.length > 0) {
                        //             close();
                        //             history.push({
                        //                 pathname: `/inspection/${selectedRE[0].id}/create/`,
                        //                 state: { real_estates: selectedRE },
                        //             });
                        //         }
                        //     }}
                        // >
                        //     siguiente
                        // </button>,
                    ]
                }
                title={`Bienes Inmuebles del proyecto: ${project?.name}`}
                centered
                visible={is_visible}
                width={700}
                onCancel={close}
            >
                <Table columns={columns} dataSource={data} />
            </Modal>
        </>
    );
};

export default ModalInspection;
