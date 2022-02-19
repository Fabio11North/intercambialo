import NotificationService from "../../src/notificationService"
import UserService from "../../src/userService";

const Test = ()=>{
    const targetId = 1;
    return <div>
        <button onClick={()=>{
            UserService.addNewUser({
                name:"Fulano",
                city:"Encarnacion"
            });
            console.log(UserService.getUserList());
        }}>
            Agregar uno nuevo
        </button>
        <button onClick={()=>{
            console.log(NotificationService.getNotification(targetId));
        }}>
            Buscar notificacion
        </button>
        <button onClick={()=>{
            NotificationService.setNotification(targetId, {name:"Hola"})
            console.log(NotificationService.getNotificationList());
        }}>
            Settear notificacion
        </button>
        <button onClick={()=>{
            NotificationService.removeNotification(targetId);
            console.log(NotificationService.getNotificationList());
        }}>
            Borrar notificacion
        </button>
    </div>
}

export default Test;