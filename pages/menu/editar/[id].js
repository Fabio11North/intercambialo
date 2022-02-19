import { useRouter } from "next/router"
import React, {useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import ObjectService from "../../../src/objectService"
import styles from '../MisObjetos.module.scss'
import Button from 'react-bootstrap/Button'

export default function EditarObjeto(){

    const router=useRouter()
    const {id} = router.query
    const [datos, setDatos] = useState({});

    const [newDatos, setNewDatos] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        detalles:'',
    })
    
    useEffect(()=>{
        setDatos(ObjectService.getKeyLocalStorage(id))
    },[id])
    
    const handleInputChange = (event)=>{
        console.log(event.target.value); //ir imprimiendo por consola lo que escribis
        setNewDatos({
            ...newDatos,
            [event.target.name] : event.target.value
        })
    }

    const putInLocalStorage= () =>{
        console.log(newDatos)
        let addDatos= Object.keys(newDatos)
        .filter((k)=>{
            return newDatos[k] != '';
        })
        .reduce((acc,k)=>{
            acc[k] = newDatos[k];
            return acc;
        },{})
        ObjectService.editObjectList(id, addDatos);
    }

    const condition = ()=>{
        if (datos!=null) {
            return true;
        }else{
            return false;
        }
    }

    return(
        <div>
            {condition()
                ?<div className={' d-flex flex-column justify-content-center align-items-center m-4 ' + styles.object_container}>
                    <Container className={' text-center p-4 align-items-center ' + styles.object_form }>
                        <h1 className="text-center p-2 ">Editar Objeto</h1>
                        <div className='mb-2'>
                            <p className="text-start fw-bold">Nombre: </p>
                            <input className="form-control" type="text" onChange={handleInputChange} name='nombre' placeholder={datos.nombre}/>
                        </div>
                        <div className='mb-2'>
                            <p className="text-start fw-bold">Descripcion: </p>
                            <textarea className="form-control"  name='descripcion' onChange={handleInputChange} rows={3} placeholder={datos.descripcion}/>
                        </div>
                        <div className='mb-2'>
                            <p className="text-start fw-bold">Precio: </p>
                            <input className="form-control" name='precio'  onChange={handleInputChange} type="text" placeholder={datos.precio}/>
                        </div>
                        <div className='mb-2'>
                            <p className="text-start fw-bold">Detalles: </p>
                            <textarea className="form-control" name='detalles' onChange={handleInputChange} rows={3} placeholder={datos.detalles}/>
                        </div>

                        <div className='d-grid'>

                        <a href={"/menu/objeto/" + datos.id}>
                        <Button variant='primary mb-3 text-white' size='lg' onClick={()=>{
                            putInLocalStorage();
                        }}>Aceptar Cambios</Button>
                        </a> 
                        
                        <a href={"/menu/objeto/" + datos.id}>
                            <Button variant='success mb-3' size='lg' onClick={()=>{
                                
                            }}>Cancelar</Button>
                        </a>
                        
                    </div>
                    </Container>
                </div>
                :<div></div>
            }   
        </div>
    )
}