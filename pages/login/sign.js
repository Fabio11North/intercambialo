import React, {Fragment, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './Login.module.scss';
import Router from 'next/router';

export default function Sign(){

    const [datos, setDatos] = useState({
        user: '',
        password: ''
    })

    const handleInputChange = (event)=>{
        console.log(event.target.value); //ir imprimiendo por consola lo que escribis
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }


    const imprimir = () =>{
        console.log(datos.user,datos.password)
    }

    return(
        <div className={'d-flex flex-column justify-content-center align-items-center ' + styles.login_container}>
            <Container  className={'text-center p-4 align-items-center ' + styles.login_form }>
                <Form >
                    <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet' />
                    <h1 className={'m-3 ' + styles.brand} >Intercambialó</h1>
                    <img className='bootstrap-logo mb-5 ' src="/vector.svg" alt="Vector Logo" />
                    <Form.Group controlId='sign-in-user'>
                        <Form.Control className='position-relative mb-3 m-1' name="user" onChange={handleInputChange} type="email" size="lg" placeholder="Usuario" autoComplete="username" />
                    </Form.Group>
                    <Form.Group controlId='sign-in-password'> 
                        <Form.Control className='position-relative mb-3' name="password" onChange={handleInputChange} type="password" size="lg" placeholder="Contraseña" autoComplete="current-password" />
                    </Form.Group>
                    <Form.Group controlId='remember-me' className="d-flex justify-content-center mb-3">
                        <Form.Check label="Recuerdame" />
                    </Form.Group>
                    <div className='d-grid'>
                        <Button variant='primary mb-2 m-3 text-white' size='lg' onClick={()=>{
                            Router.push('/')
                        }}>Iniciar Sesion</Button>
                        <Button variant='success m-3' size='lg' onClick={()=>{
                            Router.push('/login/login')
                        }}>Volver</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
