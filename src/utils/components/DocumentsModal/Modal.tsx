import { FC, useState, useRef } from 'react';
import Modal from 'antd/lib/modal/Modal';
import Form from './Form';
import { FormikProps, FormikValues } from 'formik';
import Tag from 'antd/lib/tag';
import { createDownload, delete_document, download_document } from './services';
import Image from 'antd/lib/image';

interface LocationModalProps {
    doc_name?: string;
    modal_name?: string;
    disabled?: boolean;
    btn_class?: string;
    btn_label?: string;
    onDelete?: (doc) => void;
    file_type: 'pdf' | 'img';
    onChange: (data) => void;
    doc?: any;
}

const DocumentsModal: FC<LocationModalProps> = ({
    doc,
    doc_name,
    modal_name,
    disabled,
    btn_class,
    btn_label,
    file_type,
    onDelete,
    onChange,
}) => {
    const [is_visible, set_is_visible] = useState<boolean>(false);
    const title = modal_name
        ? modal_name
        : `Agregar ${file_type === 'pdf' ? 'Documento' : file_type === 'img' ? 'Imagen' : 'Documento'}`;
    const form_ref = useRef<FormikProps<FormikValues>>();
    const file = file_type === 'pdf' ? doc?.pdf : doc?.img || null;
    let file_url = null;
    if (file) {
        file_url = window.URL.createObjectURL(file);
    }
    const close = () => {
        set_is_visible(false);
        form_ref.current?.resetForm();
    };

    const open = () => {
        !disabled && set_is_visible(true);
    };

    const is_submitting = form_ref.current?.isSubmitting;

    const on_change = (new_doc, _delete = false, prev_doc = null) => {
        if (doc?.hasOwnProperty('id') && doc?.id) {
            delete_document(doc.id).then(() => {
                onChange(new_doc);
                _delete && onDelete && onDelete(new_doc);
            });
        } else {
            onChange(new_doc);
            _delete && onDelete && onDelete(new_doc);
        }
    };
    return (
        <>
            <div className={['input-group', btn_class].join(' ')}>
                <div className="form-control form-control-lg">
                    {doc?.name && (
                        <Tag
                            closable={!disabled}
                            onClose={() => {
                                on_change(
                                    {
                                        type: doc.type,
                                        label: doc.label,
                                    },
                                    true
                                );
                            }}
                            onClick={() => {
                                if (doc.id) {
                                    download_document(doc.id, doc.name);
                                } else {
                                    createDownload(doc.name, file);
                                }
                            }}
                        >
                            {doc.name}
                        </Tag>
                    )}
                </div>
                <span className="input-group-text btn btn-clear btn-outline-primary" onClick={open}>
                    {btn_label ? btn_label : title}
                </span>
            </div>
            {file_type === 'img' && file && <Image width={100} src={file_url} />}
            <Modal
                title={title}
                centered
                visible={is_visible}
                width={700}
                onCancel={close}
                footer={[
                    <button key={1} className="btn btn-outline-primary" onClick={close} disabled={is_submitting}>
                        Cancelar
                    </button>,
                    <button
                        key={2}
                        className="btn btn-primary ms-2"
                        onClick={() => form_ref.current?.submitForm()}
                        disabled={is_submitting}
                    >
                        Cargar
                    </button>,
                ]}
            >
                <Form
                    name={doc_name}
                    innerRef={form_ref}
                    file_type={file_type}
                    onSubmit={(values) => {
                        const data = {
                            label: doc?.label || '',
                            type: doc?.type || -1,
                            ...(file_type === 'pdf' ? { pdf: values.file } : {}),
                            ...(file_type === 'img' ? { img: values.file } : {}),
                            ...values,
                        };
                        delete data.file;
                        on_change(data, false, doc);
                        close();
                        return Promise.resolve();
                    }}
                />
            </Modal>
        </>
    );
};

export default DocumentsModal;
