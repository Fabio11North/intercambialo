import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import InfoAcuerdo from "../../../components/acuerdo/acuerdos/info_acuerdo"
import AcuerdoService from "../../../src/acuerdoService"

import { useRouter } from "next/router"
import MainLayout from "../../../layouts/main-layout"

export default function home() {

    const [acuerdos, setAcuerdos] = useState([])
    const router = useRouter()

    useEffect(() => {
        setAcuerdos(AcuerdoService.getAllAcuerdo())
        acuerdos = AcuerdoService.getAllAcuerdo()
    }, []);


    const handleAcuerdoSeleccionado = (id) => {
        var acuerdo = AcuerdoService.getAcuerdo(id)
        acuerdo.new = false
        AcuerdoService.deleteAcuerdo(id)
        AcuerdoService.saveAcuerdo(acuerdo)
        router.push("/acuerdo/acuerdos/" + id)
    }

    return (
        <MainLayout>
            <Container>
                <Row className="pb-5 pt-3">
                    <Col>
                        <h1 className="text-center"><b>Acuerdos</b></h1>
                    </Col>
                </Row>
                {
                    acuerdos.map((objetito) => {
                        return (
                            <Row key={objetito.id} className="p-3">

                                <a className="text-decoration-none" onClick={() => { (handleAcuerdoSeleccionado(objetito.id)) }}>
                                    <InfoAcuerdo acuerdo={objetito}></InfoAcuerdo>
                                </a>

                            </Row>
                        )
                    })
                }
            </Container>
        </MainLayout>


    )
}