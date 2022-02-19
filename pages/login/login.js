import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import styles from './Login.module.scss'
import React from "react";
import Router from 'next/router'


export default function Login(){
    

    return(
        <div className={'d-flex flex-column justify-content-center align-items-center ' + styles.login_container} >
            <Container  className={'text-center p-4 align-items-center ' + styles.login_form } >
                <Form>
                    <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet' />
                    <h1 className={ styles.brand }>Intercambialó</h1>
                    <img className='bootstrap-logo mb-5 ' src="/vector.svg" alt="Vector Logo" />
                    <div className='d-grid'>
                        <Button variant='primary mb-3  text-white' size='lg' onClick={()=>{
                            Router.push('/Login/sign');
                        }}>Iniciar Sesion</Button>
                        <Button variant='success' size='lg' onClick={()=>{
                            Router.push('/Login/register')
                        }}>Registrarse</Button>
                    </div>
                </Form>
            </Container>
        </div> 
    );
}

