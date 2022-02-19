import { useEffect, useRef, useState } from 'react';
import MainLayout from "../../layouts/main-layout";
import styles from "./explore.module.scss"
import Block from "../../components/block"
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaHeart, FaTimes } from 'react-icons/fa';
import AcuerdoService from '../../src/acuerdoService';
import NotificationService from '../../src/notificationService';

const myObject = {
    id: 0,
    name: "Mi Objeto",
    description: "Esto es un Mi Objeto.",
    details:"Esto es el detalle del Mi Objeto.",
    price: 100000,
    image: "Mi Imagen",
    user: {
        id:0,
        name:"Daniel Matsuura",
        city:"Encarnacion"
    }
}

const objectList = [
    {
        id: 0,
        name: "Objeto 1",
        description: "Esto es un Objeto 1.",
        details:"Esto es el detalle del Objeto 1.",
        price: 100000,
        image: "Imagen 1",
        user: {
            id:1,
            name:"Fulano",
            city:"Encarnacion"
        }
    },
    {
        id: 1,
        name: "Objeto 2",
        description: "Esto es un Objeto 2.",
        details:"Esto es el detalle del Objeto 2.",
        price: 200000,
        image: "Imagen 2",
        user: {
            id:1,
            name:"Fulano",
            city:"Encarnacion"
        }
    },
    {
        id: 2,
        name: "Objeto 3",
        description: "Esto es un Objeto 3.",
        details:"Esto es el detalle del Objeto 3.",
        price: 300000,
        image: "Imagen 3",
        user: {
            id:1,
            name:"Fulano",
            city:"Encarnacion"
        }
    },
    {
        id: 3,
        name: "Objeto 4",
        description: "Esto es un Objeto 4.",
        details:"Esto es el detalle del Objeto 4.",
        price: 400000,
        image: "Imagen 4",
        user: {
            id:1,
            name:"Fulano",
            city:"Encarnacion"
        }
    },
    {
        id: 4,
        name: "Objeto 5",
        description: "Esto es un Objeto 5.",
        details:"Esto es el detalle del Objeto 5.",
        price: 500000,
        image: "Imagen 5",
        user: {
            id:1,
            name:"Fulano",
            city:"Encarnacion"
        }
    }    
];

const Explore = () => {
    const [nextId, setNextId] = useState(2);
    const [list, setList] = useState([{ id: -1 }, { id: 0 }, { id: 1 }]);
    const [item, setItem] = useState({});

    useEffect(()=>{
        const parseObject = (object)=>{
            let ret = {};
            ret.id = object.id;
            ret.name = object.nombre;
            ret.description = object.descripcion;
            ret.price = object.precio;
            ret.details = object.detalles;
            ret.image = object.nombre;
            ret.user = object.user;
            return ret;
        }
        let object = JSON.parse(localStorage.getItem("cache/explore_item"));
        setItem(parseObject(object));
    });

    const rightZoneRef = useRef();
    const leftZoneRef = useRef();

    const dragDown = (event) => {
        const getCoordinates = (eventObject) => {
            let coordinates = {};
            if (eventObject.type.startsWith("touch")) {
                let touch = eventObject.touches[0] || eventObject.changedTouches[0];
                coordinates.x = touch.clientX;
                coordinates.y = touch.clientY;
            } else if (eventObject.type.startsWith("mouse")) {
                coordinates.x = eventObject.clientX;
                coordinates.y = eventObject.clientY;
            }
            return coordinates;
        }

        const element = event.target.parentElement;

        if (element.classList.contains(styles.removed) || element.classList.contains(styles.new)) return;

        let coord = getCoordinates(event);
        let rect = element.getBoundingClientRect();
        let offsetX = coord.x - rect.x;
        let offsetY = coord.y - rect.y;

        element.classList.add(styles.moving);

        let leftZone = leftZoneRef.current;
        let rightZone = rightZoneRef.current;

        leftZone.classList.add(styles.moving);
        rightZone.classList.add(styles.moving);

        const thresholdBuffer = Math.round(41 * window.innerWidth/320);
        const isInLeftThreshold = (eventObject)=>{
            let coord = getCoordinates(eventObject);
            let leftZoneRect = leftZone.getBoundingClientRect();
            let leftThreshold = leftZoneRect.x + leftZoneRect.width + thresholdBuffer;
            let centerX = coord.x - offsetX + rect.width / 2;
            return centerX < leftThreshold;
        }

        const isInRightThreshold = (eventObject)=>{
            let coord = getCoordinates(eventObject);
            let rightZoneRect = rightZone.getBoundingClientRect();
            let rightThreshold = rightZoneRect.x - thresholdBuffer;
            let centerX = coord.x - offsetX + rect.width / 2;
            return centerX > rightThreshold;
        }

        const dragMove = (event) => {
            const clamp = (n, min, max) => {
                return Math.max(Math.min(n, max), min);
            }

            let coord = getCoordinates(event);
            let left = coord.x - offsetX - rect.x;
            let top = coord.y - offsetY - rect.y;

            const ROTATE_RANGE = 1000;
            const ROTATE_COUNT = 0.1;
            let rotate = clamp(left, -ROTATE_RANGE, ROTATE_RANGE) / (ROTATE_RANGE / ROTATE_COUNT);

            let scale = 1.01;
            element.style.transform = `translate(${left}px, ${0}px) rotate(${rotate}turn) scale(${scale}, ${scale})`

            if (isInLeftThreshold(event)){
                leftZone.classList.add(styles.hover);
                rightZone.classList.remove(styles.hover);
            }else if(isInRightThreshold(event)){
                leftZone.classList.remove(styles.hover);
                rightZone.classList.add(styles.hover);
            }else{
                leftZone.classList.remove(styles.hover);
                rightZone.classList.remove(styles.hover);
            }
        }

        const dragUp = (event) => {
            document.onmousemove = null;
            document.onmouseup = null;
            document.ontouchmove = null;
            document.ontouchend = null;

            element.classList.remove(styles.moving);

            leftZone.classList.remove(styles.moving);
            rightZone.classList.remove(styles.moving);
            leftZone.classList.remove(styles.hover);
            rightZone.classList.remove(styles.hover);

            if(isInLeftThreshold(event) || isInRightThreshold(event)){
                let dir = Math.sign(isInLeftThreshold(event) ? -1 : 1);
                element.style.transform = `translate(${150 * dir}vw) rotate(${0.1 * dir}turn)`

                if(dir == 1){
                    let newAcuerdo = AcuerdoService.createAcuerdo(item, objectList[list[1].id], true);
                    AcuerdoService.saveAcuerdo(newAcuerdo);
                    NotificationService.addNewNotification({
                        description:"Hubo un Match con " + newAcuerdo.wantObject.user.name + ".",
                        href:"/acuerdo/acuerdos/"+newAcuerdo.id
                    });
                }

                let _list = [list[1], list[2], { id: nextId }];
                let next = nextId + 1;
                if (next >= objectList.length) next = 0;
                setNextId(next);
                setList(_list);
            }
            else {
                element.style.transform = ``
            }
        }

        document.onmousemove = dragMove;
        document.onmouseup = dragUp;
        document.ontouchmove = dragMove;
        document.ontouchend = dragUp;
    }

    return <MainLayout>
        <div className={styles.wrapper}>
            <div ref={leftZoneRef} className={styles.dropZone}>
                <div className={styles.symbol + " " + styles.times}>
                    <FaAngleDoubleLeft/> <FaTimes/>
                </div>
            </div>
            <div className={styles.cardContainer}>
                <div className={styles.card + " " + styles.removed} key={list[0].id}>
                </div>
                <div className={styles.card} key={list[1].id}>
                    <div className={styles.cardGrabbable} onMouseDown={dragDown} onTouchStart={dragDown}>
                        <Block className={"m-2 w-75 " + styles.block}>{objectList[list[1].id].image}</Block>
                        <div className='w-100 h-100 text-justify m-2 p-3 border border-primary border-3 rounded overflow-auto'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h3 className={styles.h3}>{objectList[list[1].id].name}</h3>
                                <h4 className={styles.h4}> {objectList[list[1].id].price} Gs </h4>
                            </div>
                            <h4>Descripcion</h4>
                            <p className={styles.text}>
                                {objectList[list[1].id].description}
                            </p>
                            <h4>Detalles</h4>
                            <p className={styles.text}>
                                {objectList[list[1].id].details}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.card + " " + styles.new} key={list[2].id}> 
                </div>
            </div>
            <div ref={rightZoneRef} className={styles.dropZone}>
                <div className={styles.symbol + " " + styles.heart}>
                    <FaHeart/> <FaAngleDoubleRight/>
                </div>
            </div>
        </div>
    </MainLayout>
}

export default Explore;