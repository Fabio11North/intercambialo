import Image from "next/image"
import { Container, Row, Col } from 'react-bootstrap'
import { GiCardboardBoxClosed } from 'react-icons/gi'
import { ImSearch } from 'react-icons/im'
import { FaRegHandshake, FaRegUserCircle } from 'react-icons/fa'
import MainLayout from "../layouts/main-layout"
import BoxRouter from "../components/inicio/box_Router"
import Link from "next/link"



export default function Home() {
  return (
    <MainLayout>
      <Container >
        <Row className="justify-content-md-center">
          <Col md="auto" className="d-flex justify-content-center">
            <span>
              <Image src="/Logo.svg" alt="logo" width={300} height={150} />
            </span>
          </Col>
        </Row>

        <Row xs="1" sm="1" md="2" className="justify-content-md-center">
          <Link href={"/menu/mis_objetos"}>
            <Col>
              <BoxRouter icon={<GiCardboardBoxClosed size={50} />} title="Mis Objetos" description="Agrega y edita tus objetos que quieres intercambiar"></BoxRouter>
            </Col>
          </Link>
          <Link href={"/search/config"}>
            <Col>
              <BoxRouter icon={<ImSearch size={45} />} title="Explorar" description="Busca objetos de otros usuarios para intercambiar"></BoxRouter>
            </Col>
          </Link>
          <Link href={"/acuerdo/acuerdos"}>
            <Col>
              <BoxRouter icon={<FaRegHandshake size={45} />} title="Acuerdos" description="Maneja los pre-acuerdos hechos con otros usuarios"></BoxRouter>
            </Col>
          </Link>
          <Link href={"/perfil"}>
            <Col>
              <BoxRouter icon={<FaRegUserCircle size={45} />} title="Mi Perfil" description="Administra tu perfil de usuario de Intercambialó"></BoxRouter>
            </Col>
          </Link>
        </Row>
      </Container>
    </MainLayout>
  )
}