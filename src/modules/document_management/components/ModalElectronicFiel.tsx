import React, { FC, useContext, useState } from 'react'
import Modal from 'antd/lib/modal/Modal';
import { LinkButton } from '../../../utils/ui/link';
import { Tag } from 'antd';
import { create_document } from '../../../utils/components/DocumentsModal/services';
import { getFiles } from '../redux/service';
import { useDispatch } from 'react-redux';
import { TemplateContext } from '../../../utils/components/template/template_context';

interface LocationModalProps {
    onSave?: (values) => Promise<any>;
    disabled?: boolean;
    real_estate_id?: number;
    type?: string;
    setNewDoc?: () => {};

}

const ModalElectronicFiel: FC<LocationModalProps> = ({ /*onSave,*/ disabled, real_estate_id, type, }) => {

    const input: HTMLInputElement = document.getElementById("subir_archivo") as HTMLInputElement;

    const [is_visible, set_is_visible] = useState<boolean>(false);
    const [docName, setDocName] = useState(null)
    const open = () => !disabled && set_is_visible(true);
    const close = () => set_is_visible(false);
    const dispatch = useDispatch();
    const context = useContext(TemplateContext);
    const documento = (e) => {
        setDocName(e.target?.files[0] ?? null)
    }
    return (
        <>
            <LinkButton
                name={`${context.device === "sm" ? "" : "Subir documento"}`}
                icon={<i className="fa fa-upload" aria-hidden="true" />}
                onClick={() => open()}
            >
            </LinkButton>
            <Modal
                footer={[
                    <button
                        type="submit"
                        className="btn btn-outline-primary "
                        key="1"
                        onClick={() => {
                            const input: HTMLInputElement = document.getElementById("subir_archivo") as HTMLInputElement;
                            input.value = "";
                            input.files = undefined;
                            setDocName(null)

                            close();
                        }}
                    >
                        No guardar cambios
                    </button>,
                    <button
                        type="submit"
                        style={ context.device !== "sm" ? { marginLeft: '-120px' }: {}}
                        key="2"
                        className={`btn btn-primary ${context.device === "sm" && "my-3"}`}
                        onClick={() => {
                            const doc = {
                                type: type,
                                name: docName?.name,
                                pdf: docName,
                            }
                            create_document(doc, real_estate_id ).then((res) => {
                                dispatch(getFiles(real_estate_id));
                                close();


                            }).catch((error) => {
                                console.log(error);

                            })

                        }}
                    >
                        volver y adjuntar
                    </button>,
                ]}
                title=""
                centered
                visible={is_visible}
                width={700}
                onCancel={close}
            >
                <h4 className="text-center" style={{ color: '#1FAEEF' }}>
                    Cargar Archivo
                </h4>
                <p className="text-center" style={{ margin: 25, fontWeight: "bold", fontSize: '14px' }}>
                    Selecciona el archivo que deseas cargar en la carpeta que señalaste
                </p>
                <div className="text-center"  >
                    <div style={{ textDecoration: 'underline', color: "#FF8900" }} onClick={() => {
                        const input = document.getElementById("subir_archivo");
                        input.click();
                        input.addEventListener("change", documento)
                    }}>Explorar en mi ordenador</div>
                    <input
                        type="file"
                        id="subir_archivo"
                        style={{ display: 'none' }}
                        name="documento"
                    />
                </div>
                {docName !== null &&
                    <div className="text-center my-3">
                        <Tag>{docName?.name}</Tag>
                    </div>
                }
            </Modal>
        </>
    )
}

export default ModalElectronicFiel
