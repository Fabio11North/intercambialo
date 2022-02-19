import Image from "next/image"
import {Button,Container,Row,Col} from "react-bootstrap"
import styles from './box_Router.module.scss'
const BoxRouter=(props)=>{
    return(
            <Container  className={" " + styles.contenedor}>
                <Row  className={"align-items-center " + styles.fila_Router} >
                    <Col xs="3" sm="2" md="3" lg="2" className="text-white d-flex justify-content-center">
                        {props.icon}
                    </Col>
                    <Col  className={"p-2 " +styles.title}>
                        <h6>{props.title}</h6>
                        <h9>{props.description}</h9>
                    </Col>
                </Row>
            </Container>
        
  
    )
}

export default BoxRouter;

