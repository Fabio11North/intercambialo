import { Container, Form } from 'react-bootstrap'
import React, {Fragment, useState} from 'react';
import styles from './MisObjetos.module.scss'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import ObjectService from '../../src/objectService';

export default function AddObjeto(){

    const [datos, setDatos] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        detalles:'',
    })

    const handleInputChange = (event)=>{
        console.log(event.target.value); //ir imprimiendo por consola lo que escribis
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }


    const putInLocalStorage= () =>{
        let addDatos= Object.keys(datos)
        .filter((k)=>{
            return datos[k] != '';
        })
        .reduce((acc,k)=>{
            acc[k] = datos[k];
            return acc;
        },{})
        ObjectService.addNewObject(addDatos);
    }


    return(
        <div className={' d-flex flex-column justify-content-center align-items-center ' + styles.object_container}>
            <Container className={' text-center p-4 align-items-center ' + styles.object_form }>
                <Form>
                    <h1 className='text-center p-2'>Agregar Objeto</h1>

                    <div className='mb-3'>
                        <input className="form-control" type="text" onChange={handleInputChange} name='nombre' placeholder='Nombre del Objeto'/>
                    </div>
                    <div className='mb-3'>
                        <textarea className="form-control"  name='descripcion' onChange={handleInputChange} rows={3} placeholder='Descripcion'/>
                    </div>
                    <div className='mb-3'>
                        <input className="form-control" name='precio'  onChange={handleInputChange} type="text" placeholder='Precio'/>
                    </div>
                    <div className='mb-3'>
                        <textarea className="form-control" name='detalles' onChange={handleInputChange} rows={3} placeholder='Detalles'/>
                    </div>

                    <div className='d-grid'>
                        <Button variant='primary mb-3 text-white' size='lg' onClick={()=>{
                            putInLocalStorage();
                            Router.push('/menu/mis_objetos');
                        }}>Agregar</Button>
                        <Button variant='success mb-3' size='lg' onClick={()=>{
                            Router.push('/menu/mis_objetos')
                        }}>Cancelar</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )

}