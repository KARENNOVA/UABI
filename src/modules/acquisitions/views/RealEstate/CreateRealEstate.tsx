import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import { useHistory } from 'react-router-dom';
import RealEstateForm from '../../components/RealEstateForm';
import { clearRealEstate } from '../../redux/actions/realEstates';
import { useEffect } from 'react';
import { create_notification } from '../../../notificacions/redux/service';



const RealEstate = () => {
    const history: any = useHistory();
    const dispatch = useDispatch();
    const dependencies: any = useSelector((states: any) => states.acquisitions.dependencies.value);

    useEffect(() => {
        dispatch(clearRealEstate());
        dispatch(actions.getDependencies());
    }, []);

    const createRealEstate = async (values, form, isFinish) => {
        try {
            const res: any = await dispatch(actions.createRealEstate(values));

            console.log('res', res)
            console.log('ad', values.acquisitions.length)

            if (res && values.acquisitions.length > 0) {
                console.log('dentro de res', res);
                console.log('dentro de adquisicones', values.acquisitions.length > 0)
                console.log('crear adquisicion')
                await dispatch(actions.createAcquisitionForRealEstate(res.id, values.acquisitions));
            }

            for(let i = 3; i<= 5; i++) {
                await create_notification({
                    subject: 'Creación de un activo fijo',
                    description: `se ha creado un bien inmueble con matrícula ${res.registry_number} asignado al proyecto ${res.project.name}`,
                    action: `/acquisitions/real-estates/${res.id}/`,
                    priority: 2,
                    toRole: `${i}`
                });
            }

            // console.log("primero notificacion")

            // await create_notification({
            //     subject: 'Creación de un activo fijo',
            //     description: `se ha creado un bien inmueble con matrícula ${res.registry_number} asignado al proyecto ${res.project.name}`,
            //     action: `/acquisitions/real-estates/${res.id}/`,
            //     priority: 2,
            //     toRole: "4"
            // });
            // console.log("segunada notificacion")


            // await create_notification({
            //     subject: 'Creación de un activo fijo',
            //     description: `se ha creado un bien inmueble con matrícula ${res.registry_number} asignado al proyecto ${res.project.name}`,
            //     action: `/acquisitions/real-estates/${res.id}/`,
            //     priority: 2,
            //     toRole: "3"
            // });
            // console.log("tercera notificacion")

            if (isFinish) {
                history.push(`/acquisitions/real-estates/`);
            } else {
                if (res) {
                    return await dispatch(actions.getRealEstatesByProject(res.project_id));
                }
            }

            return Promise.resolve(false);
        } catch (e) {
            return Promise.reject();
        }
    };

    return <RealEstateForm type="create" onSubmit={createRealEstate} dependencies={dependencies} />;
};

export default RealEstate;
