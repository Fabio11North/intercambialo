import { useRouter } from "next/router"
import React, {useState, useEffect } from "react"
import styles from '../MisObjetos.module.scss'
import { Container, Form } from 'react-bootstrap'
import { AiTwotoneEdit } from "react-icons/ai"
import { AiTwotoneDelete } from "react-icons/ai"
import { AiOutlineRollback } from "react-icons/ai"
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import Modal from 'react-bootstrap/Modal'
import ObjectService from "../../../src/objectService"

export default function Objeto_Detalle(){
    
    const router=useRouter()
    const { id } = router.query
    const [datos, setDatos] = useState({});

    //Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleAction = () =>{
        deleteObject();
        Router.push('/menu/mis_objetos')
    }

    useEffect(()=>{
        setDatos(ObjectService.getKeyLocalStorage(id))
    },[id])

    const deleteObject = () =>{
        ObjectService.deleteObjectList(id);
    }
    
    const condition = ()=>{
        if (datos!=null) {
            return true;
        }else{
            return false;
        }
    }


    return (
        <div>
            {condition()
            ? <div className={' d-flex flex-column justify-content-center align-items-center ' + styles.object_container}>
                <Container className={' text-center p-4 align-items-center ' + styles.object_form }>
                    <h1 className="text-center p-1">Detalle del Objeto</h1>
                    <div className={"text-left p-1 m-2 " + styles.object_form_into }>
                        <p className="fw-bold">Nombre del Objeto: </p>
                        <p className="fst-italic">{datos.nombre}</p>
                    </div>
                    <div className={"text-left p-1 m-2 " + styles.object_form_into }>
                        <p className="fw-bold">Descripcion: </p>
                        <p className="fst-italic">{datos.descripcion}</p>
                    </div>
                    <div className={"text-left p-1 m-2 " + styles.object_form_into }>
                        <p className="fw-bold">Precio: </p>
                        <p className="fst-italic">{datos.precio}</p>
                    </div>
                    <div className={"text-left p-1 m-2 " + styles.object_form_into }>
                        <p className="fw-bold">Detalles: </p>
                        <p className="fst-italic"> {datos.detalles}</p>
                    </div>
                    <div>
                    <a href={"/menu/editar/" + datos.id}>
                        <Button variant='primary mb-3 m-2 '  className="button_form" size='lg'>
                            <AiTwotoneEdit></AiTwotoneEdit>
                        </Button>   
                    </a>
                        <Button variant='danger mb-3 m-2 '  className="button_form" size='lg' onClick={()=>{
                            handleShow()
                        }}>
                            <AiTwotoneDelete></AiTwotoneDelete>
                        </Button>   
                    <Button variant='success mb-3 m-2' size='lg' onClick={()=>{
                            Router.push('/menu/mis_objetos')
                        }}><AiOutlineRollback></AiOutlineRollback>
                        </Button>  
                      
                    </div>
                    
                </Container>
            </div>
            :<div></div>
            }

        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Eliminando Objecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estas seguro de eliminar este objecto de tu lista?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleAction}>
                        Aceptar
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        </div>
        
    )
}
        
    


