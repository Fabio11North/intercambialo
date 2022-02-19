import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import styles from "./perfil.module.scss";
import Image from "next/image";
import { RiImageAddFill } from 'react-icons/ri'
import { Form } from "react-bootstrap";
import MainLayout from "../../layouts/main-layout";
import { useRouter } from "next/router";
import Link from "next/link";


export default function edit() {

    const router= useRouter()

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        pais: " ",
        ciudad: " "
    });


    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    return (
        <MainLayout>
            <Container fluid className={"" + styles.main}>
                <Row className="pb-2 pt-3">
                    <Col>
                    </Col>
                    <Col xs="auto" sm="auto" className="d-flex justify-content-center ">
                        <span>
                            Foto
                        </span>

                    </Col>
                    <Col className="d-flex justify-content-start">
                        <Button className="d-flex align-self-end bg-transparent border-0"> <RiImageAddFill size={35} /></Button>
                    </Col>
                </Row>
            </Container>

            <Container className={" " + styles.formulario}>
                <Row className="justify-content-center">
                    <Col xs="10" sm="8" md="8" lg="6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label >Nombre</Form.Label>
                                <Form.Control type="text" placeholder="nombre" name="nombre" onChange={handleInputChange} />
                            </Form.Group >
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="apellido" name="apellido" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control type="text" placeholder="pais" name="pais" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control type="text" placeholder="ciudad" name="ciudad" onChange={handleInputChange} />
                            </Form.Group>

                            <Row className="mb-2">
                                <Col>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Link href="/perfil">
                                        <Button className="text-white m-0" variant="primary" type="submit">
                                            Guardar
                                        </Button>
                                    </Link>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Link href="/perfil">
                                        <Button className="text-white m-0" variant="secondary" type="submit">
                                            Cancelar
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    </Col>

                </Row>

            </Container>

        </MainLayout>

    )

}