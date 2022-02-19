import { Container,Row,Col } from "react-bootstrap";
import styles from './info_perfil.module.scss'



const InfoPerfil =(props)=>{
    return (
        <Container className={"mt-3 " + styles.info}>
            <Row>
                <Col  className="d-flex justify-content-sm-start">
                    <h6 className="align-self-center">{props.opcion}</h6>
                </Col>
                <Col className="d-flex justify-content-start">
                    <h3 className="align-self-center">{props.value}</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default InfoPerfil;