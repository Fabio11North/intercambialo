import Image from "next/image";
import Head from "next/head";
import { Button, Col, Container, Navbar, Offcanvas, Row } from "react-bootstrap";
import { FaBars, FaBell, FaBox, FaCog, FaHandshake, FaHome, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import styles from "./main-layout.module.scss"
import { useEffect, useState } from "react";
import NotificationService from "../src/notificationService";
import Link from "next/link";

const MainLayout = (props) => {
    const [show, setShow] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(()=>{
        setNotificationCount(NotificationService.getUnseenNotifications().length)
    },[]);

    return <div className="min-vh-100 d-flex flex-column">
        <Head>
            <link href='https://fonts.googleapis.com/css?family=Satisfy' rel='stylesheet' />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
        <Navbar  expand="lg" className={"bg-primary shadow sticky-top " + styles.header}>
            <Container fluid className="d-flex align-items-end">
                <div>
                    <Button className="rounded-circle text-white" onClick={()=>{setShow(true)}}> <h3> <FaBars /> </h3> </Button>
                </div>
                <div>
                    <h3 className={styles.brand}> Intercambialo </h3>
                </div>
                <div>
                    <a href="/notification">
                        <Button className={"rounded-circle text-white " + styles.notification}> 
                            <h3> <FaBell /> </h3> 
                            {
                                notificationCount>0?
                                <span className={"badge rounded-circle bg-info " + styles.notificationCounter}>
                                    {notificationCount}
                                </span>:
                                ""
                            }
                        </Button>
                    </a>
                </div>
            </Container>
        </Navbar>
        <div className="d-flex align-items-stretch flex-grow-1">
            <div className={"bg-primary shadow " + styles.sidebar}>
                <a href="/">
                    <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                        <h3 className="text-white"> <FaHome/> </h3>
                    </div>
                </a>
                <a href="/menu/mis_objetos">
                    <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                        <h3 className="text-white"> <FaBox/> </h3>
                    </div>
                </a>
                <a href="/search/config">
                    <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                        <h3 className="text-white"> <FaSearch/> </h3>
                    </div>
                </a>
                <a href="/acuerdo/acuerdos">
                    <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                        <h3 className="text-white"> <FaHandshake/> </h3>
                    </div>
                </a>
                <a href="/perfil">
                    <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                        <h3 className="text-white"> <CgProfile/> </h3>
                    </div>
                </a>
                <div className={"d-flex justify-content-center align-items-center " + styles.sidebarItem}>
                    <h3 className="text-white"> <FaCog/> </h3>
                </div>
            </div>
            <div className="flex-grow-1">
                <div className="h-100">
                    {props.children}
                </div>
            </div>
        </div>
        <div className={styles.footer}>
            <div className={"bg-primary shadow fixed-bottom " + styles.footer}>
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col className={"d-flex flex-column justify-content-center align-items-center text-white text-center " + styles.footerItem}>
                            <h1 className="text-white">
                                <FaBox/>
                            </h1>
                            <b>Mis Objetos</b>
                        </Col>
                        <Col className={"d-flex flex-column justify-content-center align-items-center text-white text-center " + styles.footerItem}>
                            <h1 className="text-white">
                                <FaSearch/>
                            </h1>
                            <b>Explorar</b>
                        </Col>
                        <Col className={"d-flex flex-column justify-content-center align-items-center text-white text-center " + styles.footerItem}>
                            <h1 className="text-white">
                                <FaHandshake/>
                            </h1>
                            <b>Acuerdos</b>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

        <Offcanvas className={"bg-primary"} show={show} onHide={()=>setShow(false)}>
            <Offcanvas.Header className={"text-white"} closeButton>
                <Offcanvas.Title><h4>Opciones</h4></Offcanvas.Title>
            </Offcanvas.Header>
            <div className="overflow-auto">
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><FaHome className="me-3"/>Inicio</h5>
                </div>
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><FaBox className="me-3"/>Mis Objetos</h5>
                </div>
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><FaSearch className="me-3"/>Explorar</h5>
                </div>
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><FaHandshake className="me-3"/>Acuerdos</h5>
                </div>
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><CgProfile className="me-3"/>Perfil</h5>
                </div>
                <div className={"p-2 d-flex align-items-center " + styles.offcanvasItem}>
                    <h5 className={"d-flex align-items-center text-white"}><FaCog className="me-3"/>Configuracion</h5>
                </div>
            </div>
      </Offcanvas>
    </div>
}

export default MainLayout;