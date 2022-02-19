import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './Login.module.scss'
import Router from 'next/router'

export default function Register(){
    return(
        <div className={'d-flex flex-column justify-content-center align-items-center ' + styles.login_container}>  
                <Container className={'text-center p-4 align-items-center ' + styles.login_form }>
                <Form>
                <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet' />
                <h1 className={styles.brand}>Intercambialó</h1>
                <img className='bootstrap-logo mb-2' src="/vector.svg" alt="Vector Logo" />
                <h4 className="d-flex justify-content-center mb-5">Registro</h4>
                <Form.Group controlId=''> 
                        <Form.Control className='position-relative mb-3'type="email" size="s" placeholder="Nombre" />
                </Form.Group>
                <Form.Group controlId=''> 
                        <Form.Control className='position-relative mb-3'type="email" size="s" placeholder="Correo" />
                </Form.Group>
                <Form.Group controlId=''> 
                        <Form.Control className='position-relative mb-3' type="password" size="s" placeholder="Contraseña" />
                </Form.Group>
                <Form.Group controlId=''> 
                        <Form.Control className='position-relative mb-5' type="password" size="s" placeholder="Confirmar Contraseña" />
                </Form.Group>
                <div className='d-grid'>
                        <Button variant='primary mb-3 text-white' size='lg' onClick={()=>{
                            Router.push('/Login/login')
                        }}>Registrarse</Button>
                        <Button variant='success mb-3' size='lg' onClick={()=>{
                            Router.push('/Login/login')
                        }}>Volver</Button>
                </div>
                </Form>
                </Container>
        </div>
    );

}
