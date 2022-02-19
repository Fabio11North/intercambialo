import styles from "./block.module.scss"

const Block = (props)=>{
    return (
        <div className={styles.block + " border rounded border-3 border-primary " + props.className}>
            <div className={styles.dummy}/>
            <div className={styles.content}>
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default Block;