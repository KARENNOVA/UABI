import React, { FC, useState, useRef } from 'react';
import Modal from 'antd/lib/modal/Modal';
import AcquisitionsFrom from './AcquisitionForm';
import { LinkButton } from '../../../../utils/ui/link';

interface AcquisitionModalProps {
    type: 'create' | 'edit';
    modal_name?: string;
    disabled?: boolean;
    btn_label?: any;
    onChange: (data, i) => Promise<any>;
    acquisition?: any;
    active_type?: string[];
}

const AcquisitionModal: FC<AcquisitionModalProps> = ({
    modal_name,
    disabled,
    btn_label,
    onChange,
    acquisition,
    active_type,
    type,
}) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const form_ref = useRef<any>();
    const title = modal_name ? modal_name : 'Agregar adquisición';
    const close = () => {
        set_is_visible(false);
        // form_ref.current?.resetForm();
    };

    const open = () => {
        !disabled && set_is_visible(true);
    };

    return (
        <>
            <LinkButton
                name={type === 'create' ? (btn_label ? btn_label : title) : ''}
                iconText={type === 'create' ? '+' : undefined}
                icon={
                    type === 'edit' ? (
                        <i
                            className={['fa fa-pencil', ...(disabled ? ['text-muted'] : [])].join(' ')}
                            aria-hidden="true"
                        />
                    ) : undefined
                }
                avatar={type === 'create'}
                onClick={open}
            />
            <Modal
                title={title}
                centered
                visible={is_visible}
                width={1000}
                onCancel={close}
                footer={[
                    <button
                        key={1}
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={close}
                        disabled={disabled}
                    >
                        Cancelar
                    </button>,
                    <button
                        key={2}
                        className="btn btn-primary ms-2"
                        type="button"
                        disabled={disabled || form_ref.current?.isSubmitting}
                        onClick={() => {
                            form_ref.current.submitForm();
                        }}
                    >
                        Guardar{' '}
                        {form_ref.current?.isSubmitting && (
                            <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: 12, marginLeft: 4, color: '#fff' }}
                            />
                        )}
                    </button>,
                ]}
            >
                <AcquisitionsFrom
                    innerRef={form_ref}
                    acquisition={acquisition}
                    active_type={active_type}
                    onChange={(v, f) => {
                        console.log(v)
                        return onChange(v, f).then(() => {
                            close();
                        });
                    }}
                />
            </Modal>
        </>
    );
};

export default AcquisitionModal;
