import { Row,Container,Col,Badge } from "react-bootstrap";
import Image from "next/image";
import style from "./../acuerdos/info_acuerdo.module.scss"
import Block from "../../acuerdo/auxiliar/block"
const InfoAcuerdo=(props)=>{

    var acuerdo= props.acuerdo;
    return (
        <Container fluid className="pb-2 ">
            <Row xs="2" className={"justify-content-center m-0 "+ style.cuerpo}>

                <Col xs="5" sm="4" md="4" lg="3" className={"d-flex justify-content-center border-bottom  border-4 border-secondary pb-1 pe-0 "+ style.imagenes}>
                    <Block style={style.imagenPrincipal}>
                        <p>{acuerdo.wantObject.image}</p>
                    </Block>  
                </Col>

                <Col xs="7" sm="8" md="6" lg="4" className=" d-flex flex-column justify-content-center border-bottom border-4 border-secondary pb-1">
                    <Row className="mb-2 ">
                        <Col xs="7" sm="7" lg={6}  className="d-flex justify-content-left">
                            <h5 className="text-center"><b>{acuerdo.wantObject.name}</b></h5>
                        </Col>
                        <Col xs="5" sm="5" lg={6} className="d-flex justify-content-center">
                            {(acuerdo.new==true) ? (
                                <div >   
                                    <h3 className="text-center text-white p-1"><Badge bg="info">Nuevo</Badge></h3>                                 
                                </div>
                                
                            ):(null)}
                        </Col>
                    </Row>
                    <Row xs="2">
                        <Col xs="7" sm="7" lg={6} className="d-flex flex-column justify-content-center">
                                <h6 className="text-left">{acuerdo.wantObject.user.name}</h6>
                                <h6 className="text-left">cambia por tu:</h6>
                        </Col>
                        <Col xs="5" sm="5" lg={6} className="d-flex justify-content-center">
                            <Block style={style.imagenSecundaria}>
                                <p>{acuerdo.myObject.image}</p>
                            </Block> 
                            
                        </Col>
                    </Row>          
                </Col>
               
            </Row>
           
        </Container>
    )

}

export default InfoAcuerdo;

/*
<Image src={"/"+acuerdo.wantObject.image} width={175} height={175}  />
<Image src={"/"+ acuerdo.myObject.image} width={100} height={100}  />
*/