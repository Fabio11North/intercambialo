import { useEffect, useRef } from "react";
import MainLayout from "../../layouts/main-layout";
import styles from "../../styles/image.module.scss"

export default function ImageOutput(){
    const imageRef = useRef();

    useEffect(()=>{
        let value = sessionStorage.getItem("test/image");
        if(value){
            imageRef.current.src = value;
        }
    },[]);

    return(<MainLayout>
        <div className={styles.content}>
            <img width={500} className="m-3" ref={imageRef} src=""/>
        </div>
    </MainLayout>)
}