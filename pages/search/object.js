import Router from 'next/router'
import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Block from "../../components/block";
import MainLayout from "../../layouts/main-layout";
import ObjectService from "../../src/objectService";
import styles from "./object.module.scss"

const Object = ()=>{
    const [list, setList] = useState([]);

    useEffect(()=>{
        setList(ObjectService.getLocalStorage());
    },[]);

    const saveExploreItem = (element)=>{
        sessionStorage.setItem("cache/explore_item", JSON.stringify(element));
    }

    return(
        <MainLayout>
            <Container className="my-3">
                <h1 className="text-center">
                    Mis Objetos
                </h1>
                <p className="text-justify">
                    Elige un objeto que vas a intercambiar. Al 
                    elegir un objeto, al explorar te mostraran 
                    objetos con precios identicos al elegido 
                    para un intercambio mas justo.
                </p>
                <div className={styles.container}>
                    {
                        list.map((el)=>{
                            return(
                                <div onClick={()=>{
                                    saveExploreItem(el);
                                    Router.push("/search/config")
                                }}>
                                    <Block key={el.id} className="w-100">
                                        {el.nombre}
                                    </Block>
                                </div>
                            );
                        })
                    }
                </div>
            </Container>
        </MainLayout>
    );
}

export default Object;