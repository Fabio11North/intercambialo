import { Container, Row, Col, Button, Form } from "react-bootstrap"
import Mensajes from "../../../components/acuerdo/chat/mensajes";
import styles from "../chat/chat.module.scss"
import { useRouter } from "next/router"
import ChatService from "../../../src/chatService";
import { useState, useEffect } from "react"
import MainLayout from "../../../layouts/main-layout";

export default function Chat() {

    const router = useRouter()
    const { id } = router.query
    const [chat, setChat] = useState()
    const [message, setMessage] = useState({
        text: ''
    })

    var user1 = {
        id: "1",
        name: "Daniel Matsuura"
    }
    var user2 = {
        id: "2",
        name: "Juan Lopez"
    }


    const handleInputChange = (event) => {
        setMessage({
            ...message,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = () => {
        console.log(message.text)
        var mensajito = ChatService.createMessage(message.text, user1)
        setChat(ChatService.updateChat(chat, mensajito))
    }



    useEffect(() => {
        if (id) setChat(ChatService.getChat(id))

        /*
        if(chat == null){
         
            chat= ChatService.createChat(user1,user2)
            ChatService.saveChat(chat)

            var mensaje1= ChatService.createMessage("Holaa, donde nos encontramos",user1)
            var mensaje2= ChatService.createMessage("Hola, en lo de..",user2)
           
            chat= ChatService.updateChat(chat,mensaje1)
            chat= ChatService.updateChat(chat,mensaje2)
            setChat(chat)
            
        }*/
    }, [id]);


    return (
        <div>
            {(chat == null) ? (
                <p>Elemento no encontrado</p>
            ) : (
                <MainLayout>
                    <Container >
                        <Row className="pt-3 pb-5">
                            <Col className="">
                                <h1 className="text-center"><b>{chat.user2.name}</b></h1>
                            </Col>
                        </Row>

                        <Row className="mb-3 d-flex justify-content-center">
                            <Col xs={12} sm={12} lg={9}>
                                <Mensajes msgs={chat}></Mensajes>
                            </Col>


                        </Row>
                        <Row className={"pt-5 justify-content-center " + styles.teclado}>
                            <Col xs={9} sm={10} lg={6}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicText">
                                        <Form.Control type="text" placeholder="Mensaje" name="text" onChange={handleInputChange} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={3} sm={2} lg={2}>
                                <Button className="bg-black border border-black text-white " onClick={handleSubmit}>Enviar</Button>
                            </Col>
                        </Row>
                    </Container>
                </MainLayout>
            )}
        </div>
    )
}

