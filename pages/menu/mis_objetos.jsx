import { Card } from "react-bootstrap"
import React, {useState} from "react"
import MainLayout from "../../layouts/main-layout";
import styles from './MisObjetos.module.scss'
import Container from 'react-bootstrap/Container'
import Router from 'next/router'
import { BiPlusMedical } from "react-icons/bi"
import Block from "../../components/block"
import ObjectService from "../../src/objectService";


export default function MisObjetos(){

    const[object, setObject] = useState(ObjectService.getLocalStorage('Object'));

    return(
    <MainLayout>
        <Container>
            <h1 className=" text-center p-3 ">Mis objetos</h1>
            <div className={styles.container}>
                    {
                        object.map((el)=>{
                            return(
                                <a href={"/menu/objeto/" + el.id}>
                                    <Block key={el.id} className={styles.block}>
                                        {el.nombre}
                                    </Block>
                                </a>
                            )
                        })
                        
                    }
                    <Block>
                        <button className=' w-100 h-100 d-flex justify-content-center align-items-center btn btn-ligth ' onClick={()=>{
                            Router.push('/menu/add_objeto')
                        }}>
                            <BiPlusMedical></BiPlusMedical>
                        </button>
                    </Block>
            </div>
        </Container>
    </MainLayout>
    )

}

