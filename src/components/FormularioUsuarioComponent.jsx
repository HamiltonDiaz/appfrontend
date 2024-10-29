import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createUser } from '../services/AuthService';

const FormularioUsuarioComponent = ({ usuarios, setUsuarios }) => {
    const [nuevoUsuario, setnuevoUsuario] = useState({})
    const { handleSubmit, register, reset } = useForm();

    const { mutate } = useMutation({
        mutationFn: createUser,
        onError: (err) => {
            toast(err.message);

        },
        onSuccess: (data) => {
            if (!data.success) {
                toast.error(data.message);

            } else {
                toast.success(data.message);
                setUsuarios([...usuarios, nuevoUsuario])
                reset();
            }
        }
    });

    const onSubmit = (data) => {
        setnuevoUsuario(data)
        mutate(data)

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} >

            <div className="row g-2 mb-3">

                <div className="col">
                    <input type="text" className="form-control" id="primer_nombre" placeholder="Primer Nombre" {...register('primer_nombre')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="otros_nombres" placeholder="Otro Nombre" {...register('otros_nombres')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="primer_apellido" placeholder="Primer Apellido"{...register('primer_apellido')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="segundo_apellido" placeholder="Segundo Apellido" {...register('segundo_apellido')} />
                </div>
                <div className='col'>
                    <select className='form-control' id="id_tipos_identificacion" required {...register('id_tipos_identificacion')}>
                        <option value="1">Cédula de Ciudadanía</option>
                        <option value="2">Tarjeta de Identidad</option>
                        <option value="3">Cédula de Extranjería</option>
                    </select>
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="numero_identificacion"
                        placeholder="Número de Identificación" {...register('numero_identificacion')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="name" placeholder="Nombre de Usuario" {...register('name')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="email" placeholder="Email" {...register('email')} />
                </div>
                <div className="col">
                    <input type="text" className="form-control" id="telefono" placeholder="Teléfono" {...register('telefono')} />
                </div>
                <input type="hidden" className="form-control" id="password" placeholder="password" value='1232' {...register('password')} />
                <input type="hidden" className="form-control" id="password_confirmation" placeholder="password_confirmation" value='1232' {...register('password_confirmation')} />
                <div className="col">
                    <button className="btn btn-success btn-custom" id="registrarBtn">Registrar</button>
                </div>
            </div>
        </form>
    )
}

export default FormularioUsuarioComponent