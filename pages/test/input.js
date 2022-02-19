import Link from "next/link";
import { useRef } from "react";
import MainLayout from "../../layouts/main-layout";
import styles from "../../styles/image.module.scss"

export default function ImageInput(){
    const imageRef = useRef();

    const readImage = (e)=>{
        const reader = new FileReader();

        if(e.target.files && e.target.files[0]){
            reader.onload = (e)=>{
                let readValue = e.target.result;
                imageRef.current.src = readValue;
                sessionStorage.setItem("test/image", readValue);
                console.log(readValue);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return(<MainLayout>
        <div className={styles.content}>
            <input type={"file"} id="image_input" accept="image/png, image/jpg" onChange={readImage}></input>
            <img width={500} className="m-3" ref={imageRef} src=""/>
            <Link href={"/image/10"}>
                <a>
                    <h1>
                        A ID 10
                    </h1>
                </a>
            </Link>
        </div>
    </MainLayout>)
}