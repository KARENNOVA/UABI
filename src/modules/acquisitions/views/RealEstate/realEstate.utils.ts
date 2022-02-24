import { swal_warning } from '../../../../utils';
import { create_document } from '../../../../utils/components/DocumentsModal/services';

const doc_required_message = (supports_documents) => {

    const missing_docs = supports_documents
        .filter((d) => d.type !== 6 &&  d.type !== 7 )
        .filter((d) => !d.id)
        .filter((d) => !d.hasOwnProperty('pdf') || !d.pdf);
    if (missing_docs.length > 0) {
        const _text = `${missing_docs.length > 1 ? 'Los' : 'El'} Archivo${
            missing_docs.length > 1 ? 's' : ''
        } ${missing_docs
            .map((doc) => doc.label)
            .join(', ')
            .replace(/, ([^,]*)$/, ' y $1')} ${
            missing_docs.length > 1 ? 'son' : 'es'
        } obligatorio${missing_docs.length > 1 ? 's' : ''}`;
        swal_warning.fire({
            title: 'Documentos requeridos',
            text: _text,
        });
        return true;
    } else {
        return false;
    }
};

export const compute_docs = async (supports_documents) => {
    if (
        supports_documents.filter((d) => d.hasOwnProperty('pdf') && d.pdf)
            .length > 0
    ) {
        if (doc_required_message(supports_documents)) {
            return Promise.reject();
        } else {
            return supports_documents.map((d) => {
                if (d.hasOwnProperty('pdf') && !!d.pdf) {
                    return { ...d, action: 'create' };
                }
                return { ...d, action: 'none' };
            });
        }
    } else {
        if (doc_required_message(supports_documents)) {
            return Promise.resolve(false);
        } else {
            return supports_documents.map((d) => ({ ...d, action: 'none' }));
        }
    }
};

export const upload_documents = (docs, id) => {
    const promises = [];
    if (docs && Array.isArray(docs)) {
        docs.filter((d) => d.action === 'create').forEach((d) => {
            promises.push(create_document(d, id));
        });
    }
    return Promise.all(promises).then((res) => {
        if(res.every(d => Array.isArray(d))){
            res = res.map(d=> d[0])
        }
        const no_action_docs = docs.filter((d) => d.action === 'none');
        const res_docs = [...no_action_docs, ...res]
        return res_docs.map((d) => d.id).join(',');
    });
};
