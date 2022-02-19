import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';
import Block from '../../components/block';
import MainLayout from '../../layouts/main-layout';
import styles from './config.module.scss'

const Config = ()=>{
    const [item, setItem] = useState(null);

    useEffect(()=>{
        setItem(JSON.parse(sessionStorage.getItem("cache/explore_item")));
    }, []);

    const renderItem = ()=>{
        if (item){
            return(
                <div className={'border border-primary border-3 rounded ' + styles.object}>
                    <div className={'d-flex justify-content-center align-items-center ' + styles.blockDiv}>
                        <Block className="w-100">
                            {item.nombre}
                        </Block>
                    </div>
                    <div className={styles.detailsDiv}>
                        <h2>{item.nombre}</h2>
                        <h4>{item.precio} Gs</h4>
                        <h4>{item.descripcion}</h4>
                    </div>
                    <div className={styles.changeDiv}>
                        <h1 className='text-primary'><FaExchangeAlt></FaExchangeAlt></h1>
                    </div>
                </div>
            );
        }else{
            return(
                <div className={'border border-primary border-3 rounded ' + styles.object}>
                    <div className={styles.placeholder}>
                        <h4 className='text-secondary'>Agregar un objeto...</h4>
                    </div>
                    <div className={styles.changeDiv}>
                        <h1 className='text-primary'><FaExchangeAlt></FaExchangeAlt></h1>
                    </div>
                </div>
            );
        }
    }

    return(
        <MainLayout>
            <div className={styles.wrapper}>
                <div className={"p-3 " + styles.container}>
                    <h1 className='text-center'>
                        Opciones de Exploracion
                    </h1>
                    <h4 className={'text-center ' + styles.text}>
                        Intercambia tu objeto con otro
                    </h4>
                    <div className='m-3'>
                        <h3 className={styles.subtitle}>
                            Objeto para intercambiar
                        </h3>
                        <Link href='/search/object'>
                            {renderItem()}
                        </Link>
                    </div>
                    <div className='m-3'>
                        <h3 className={styles.subtitle}>
                            Keyword
                        </h3>
                        <input type={"text"} placeholder='Explorar con keyword...' 
                        className={'border border-primary border-3 rounded ' + styles.input}/>
                    </div>
                    <div className='m-3'>
                        <h3 className={styles.subtitle}>
                            Diferencia de precio
                        </h3>
                        <input type={"number"} placeholder='Diferencia de precio' 
                        className={'border border-primary border-3 rounded ' + styles.input}/>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <a href='/search/explore'>
                            <button type='button' className='btn btn-success btn-lg'>
                                Explorar
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Config;