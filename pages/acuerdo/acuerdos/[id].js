import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa"
import { IoChatbubblesSharp } from "react-icons/io5"
import style from './acuerdos.view.module.scss'
import Block from "../../../components/acuerdo/auxiliar/block";
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from "react";
import AcuerdoService from "../../../src/acuerdoService";
import ChatService from "../../../src/chatService";
import MainLayout from "../../../layouts/main-layout";
import { route } from "next/dist/server/router";

export default function home() {

    const router = useRouter()
    const { id } = router.query
    const [acuerdo, setAcuerdo] = useState(null)

    const [smShow, setSmShow] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (id) setAcuerdo(AcuerdoService.getAcuerdo(id))
    }, [id]);

    const handleChat = () => {
        /*
        var chatId = ChatService.existsChat(acuerdo.myObject.user.id, acuerdo.wantObject.user.id)
        if (chatId != null) {
            router.push("/acuerdo/chat/" + chatId)
        } else {
            var chat = ChatService.createChat(acuerdo.myObject.user, acuerdo.wantObject.user)
            ChatService.saveChat(chat)
            router.push("/acuerdo/chat/" + chat.id)
        }*/

        if(acuerdo.chat == null){
            var chat = ChatService.createChat(acuerdo.myObject.user, acuerdo.wantObject.user)
            ChatService.saveChat(chat)
            acuerdo.chat= chat
            AcuerdoService.deleteAcuerdo(acuerdo.id)
            AcuerdoService.saveAcuerdo(acuerdo)
            router.push("/acuerdo/chat/" + chat.id)
        }else{
            router.push("/acuerdo/chat/"+acuerdo.chat.id)
        }
    }


    const handleEliminarAcuerdo = () => {
        var chatId = ChatService.existsChat(acuerdo.myObject.user.id, acuerdo.wantObject.user.id)

        if (chatId != null) {
            ChatService.deleteChat(chatId)
        }
        AcuerdoService.deleteAcuerdo(acuerdo.id)
        router.push("/acuerdo/acuerdos")
    }
    return (
        <div>
            {(acuerdo == null) ? (
                <p>Elemento no encontrado</p>
            ) : (
                <MainLayout>
                    <Container fluid className={"p-0 m-0 " + style.body}>
                        <Container>
                            <Container className="overflow-visible">
                                <Row className="mb-4 mt-3">
                                    <Col></Col>
                                    <Col className="my-auto">
                                        <h1 className="text-center"><b>Acuerdo</b></h1>
                                    </Col>
                                    <Col className="">
                                        <Button className="bg-transparent border-0" onClick={() => setSmShow(true)}>
                                            <BiDotsVerticalRounded size={55} />
                                        </Button>
                                        <Modal
                                            size="sm"
                                            variant="primary"
                                            show={smShow}
                                            onHide={() => setSmShow(false)}
                                            aria-labelledby="exampe-modal-sizes-title-sm"
                                            className={" " + style.modales}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm">
                                                    Configurar
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Container>
                                                    <Row>
                                                        <Col><Button onClick={() => {
                                                            handleShow()
                                                        }}>-  Eliminar Acuerdo</Button></Col>
                                                        <Modal
                                                            show={show}
                                                            onHide={handleClose}
                                                            backdrop="static"
                                                            keyboard={false}
                                                        >
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>¡ Alerta !</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <p className="text-center"> ¿Estas seguro que quieres eliminar el acuerdo?</p>

                                                            </Modal.Body>
                                                            <Modal.Footer className="d-flex justify-content-center">
                                                                <Row >
                                                                    <Col >
                                                                        <Button size="lg" variant="danger" onClick={() => {
                                                                            handleEliminarAcuerdo()
                                                                            handleClose()
                                                                            setSmShow(false)
                                                                        }}>Si</Button>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button size="lg" variant="secondary" onClick={() => {
                                                                            handleClose()
                                                                            setSmShow(false)
                                                                        }}>Cancelar</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Modal.Footer>
                                                        </Modal>
                                                    </Row>
                                                </Container>

                                            </Modal.Body>
                                        </Modal>
                                    </Col>
                                </Row>
                            </Container>

                            <Container className={"mb-5 " + style.objetos}>
                                <Row className="justify-content-center mb-3">
                                    <Col xs={6} sm={6} lg={4}>
                                        <h3 className="text-center"><b>{acuerdo.wantObject.user.name}</b></h3>
                                    </Col>
                                    <Col xs={6} sm={6} lg={4}>
                                        <h3 className="text-center"><b>Mio</b></h3>
                                    </Col>
                                </Row>
                                <Row className={"justify-content-center mb-3 " + style.imagenes}>
                                    <Col xs={6} sm={6} lg={4} className="d-flex justify-content-center">
                                        <Block style={style.imagen} >
                                            <p>{acuerdo.wantObject.image}</p>
                                        </Block>
                                    </Col>
                                    <Col xs={6} sm={6} lg={4} className="d-flex justify-content-center">
                                        <Block style={style.imagen}>
                                            <p>{acuerdo.myObject.image}</p>
                                        </Block>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mb-2">
                                    <Col xs={6} sm={6} lg={4}>
                                        <h5 className="text-center"><b>{acuerdo.wantObject.name}</b></h5>
                                    </Col>
                                    <Col xs={6} sm={6} lg={4}>
                                        <h5 className="text-center"><b>{acuerdo.myObject.name}</b></h5>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={6} sm={6} lg={4}>
                                        <h5 className="text-center">{acuerdo.wantObject.description}</h5>
                                    </Col>

                                    <Col xs={6} sm={6} lg={4}>
                                        <h5 className="text-center">{acuerdo.myObject.description}</h5>
                                    </Col>
                                </Row>
                            </Container>

                        </Container>


                        <Container fluid className={"pb-2 pt-2  " + style.contacto}>
                            <Row className="mb-3">
                                <Col xs="2" sm="2" lg="1" className="d-flex justify-content-center">
                                    <FaUserCircle size={60} />
                                </Col>
                                <Col>
                                    <h5><b>{acuerdo.wantObject.user.name}</b></h5>
                                    <h6>De {acuerdo.wantObject.user.city}</h6>
                                </Col>
                            </Row>
                            <Row >
                                <Col className="d-grid gap-2">
                                    <Button size="lg" className={"text-white d-flex justify-content-center " + style.boton} onClick={handleChat}>
                                        <h4 className="pe-3">Contactarse con {acuerdo.wantObject.user.name} </h4>
                                        <div>
                                            <IoChatbubblesSharp size={25} />
                                        </div>

                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </MainLayout>
            )
            }
        </div>

    )

}

/*
<Image className={" "} src={"/"+acuerdo.wantObject.image} width={200} height={200}  />
 <Image className={" "} src={"/"+acuerdo.myObject.image} width={200} height={200} />
*/