import { Container,Row,Col } from "react-bootstrap";
import styles from "./mensajes.module.scss"
const Mensajes = (props) =>{
    var mensajes= props.msgs.messages;
    return (
        <Container>
            {
                mensajes.map(function(object,i){
                    return <div key={i}>
                        {(object.author.name == "Daniel Matsuura")
                          ? <div  className={"d-flex justify-content-end "}>
                              <Row  className={" "+styles.msg}>
                                <Col lg={10}>
                                    <h5>{object.text}</h5>
                                </Col>
                             </Row>
                            </div>
                            
                            :<Row  className={" "+styles.msg}>
                                <Col lg={10} className="bg-black ">
                                    <h5 className="bg-black">{object.text}</h5>
                                </Col>
                            </Row>
                        }
                        </div>
                })
            }
        </Container>
    )
}

export default Mensajes;