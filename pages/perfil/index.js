import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import styles from "./perfil.module.scss";
import InfoPerfil from "../../components/perfil/info_perfil";
import MainLayout from "../../layouts/main-layout";
import Link from "next/link";


const user = {
    nombre: "Daniel",
    apellido: "Matsuura",
    pais: "Paraguay",
    ciudad: "Yatytay"
}


export default function Home() {
    return (

        <MainLayout>
            <div className="d-flex flex-column w-100">
                <Container fluid className={" " + styles.main}>
                    <Row className="pb-2 pt-3">
                        <Col className="d-flex justify-content-center">
                            <span>
                                Foto
                            </span>
                        </Col>
                    </Row>

                    <Row xs="3" sm="3" className="pb-3 justify-content-md-center">
                        <Col xs="2" sm="3" md="2" >
                        </Col>
                        <Col xs="8" sm="6" md="auto" className="d-flex justify-content-center">
                            <h3 className="m-auto">{user.nombre + " " + user.apellido}</h3>
                        </Col>
                        <Col xs="1" sm="3" md="2" className="d-flex justify-content-center">
                            <Link href="/perfil/edit">
                                <Button className="bg-transparent border-0" ><FaEdit size={35}></FaEdit></Button>
                            </Link>
                        </Col>
                    </Row>

                </Container>

                <Container fluid>
                    <Row xs="1" md="1" lg="2">
                        <Col>
                            <InfoPerfil opcion="Nombre:" value={user.nombre}></InfoPerfil>
                        </Col>

                        <Col>
                            <InfoPerfil opcion="Apellido:" value={user.apellido}></InfoPerfil>
                        </Col>

                        <Col>
                            <InfoPerfil opcion="Pais:" value={user.pais}></InfoPerfil>
                        </Col>

                        <Col>
                            <InfoPerfil opcion="Ciudad:" value={user.ciudad}></InfoPerfil>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainLayout>
    )
}