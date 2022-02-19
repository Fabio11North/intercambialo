import { useEffect, useState } from "react";
import MainLayout from "../../layouts/main-layout";
import NotificationService from "../../src/notificationService";
import styles from "./notification.module.scss"

const Notification = ()=>{
    const [list, setList] = useState([]);
    useEffect(()=>{
        const divideNotification = (data)=>{
            let timeRanges = [
                {name:"Hoy", notification:[]},
                {name:"Ayer", notification:[]},
                {name:"Hace una Semana", notification:[]},
                {name:"Hace un Mes", notification:[]},
                {name:"Anteriores", notification:[]},
            ];

            data.forEach((notification)=>{
                let date = new Date(notification.date);
                let today = new Date();
                let difftime = Math.abs(today - date);
                let diffdate = Math.floor(difftime / (1000 * 60 * 60 * 24))

                console.log(diffdate);

                if (diffdate == 0){
                    timeRanges[0].notification.push(notification);
                }else if (diffdate == 1){
                    timeRanges[1].notification.push(notification);
                }else if (diffdate <= 7){
                    timeRanges[2].notification.push(notification);
                }else if (diffdate <= 30){
                    timeRanges[3].notification.push(notification);
                }else{
                    timeRanges[4].notification.push(notification);
                }
            });

            return timeRanges.filter(time=>time.notification.length!=0);
        }

        let dividedList = divideNotification(NotificationService.getNotificationList().reverse());
        console.log(dividedList);
        setList(dividedList);
        NotificationService.setUnseenNotificationToSeen();
    }, []);

    return <MainLayout>
        <div className="m-3 d-flex flex-column align-items-center">
            <h1 className="text-center">
                Notificaciones
            </h1>
            <div className={styles.wrapper}>
                {list.map((timeRange)=>{
                    return(
                        <div key={timeRange.name} className="mb-3">
                            <h2>
                                {timeRange.name}
                            </h2>
                            {timeRange.notification.map((notification)=>{
                                return(
                                    <div key={notification.id} className="d-flex justify-content-between align-items-center">
                                        <a href={notification.href}>
                                            {notification.description}
                                        </a>
                                        {
                                            notification.seen?
                                            <span className={"badge " + styles.new}></span>:
                                            <span className={"badge bg-info " + styles.new}>Nuevo</span>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    </MainLayout>
}

export default Notification;