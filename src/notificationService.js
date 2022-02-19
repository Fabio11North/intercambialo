const KEY = "list/notification";

//Basic Function
const setNotificationList = (list)=>{
    sessionStorage.setItem(KEY, JSON.stringify(list));
}

const getNotificationList = ()=>{
    let list = JSON.parse(sessionStorage.getItem(KEY));
    if(list) return list;
    return [];
}

const addNotification = (data)=>{
    let list = getNotificationList();
    list.push(data);
    setNotificationList(list);
}

const addNewNotification = (data)=>{
    const createNewNotification = ()=>{
        const getMaxId = ()=>{
            let list = getNotificationList();
            return list.reduce((previous, current)=>{
                return Math.max(previous, current.id);
            }, -1);
        }
        
        return {
            id:getMaxId()+1,
            description:"Hubo una notification nueva.",
            date:new Date().toDateString(),
            href:"/",
            seen:false
        };
    }

    let newObject = {...createNewNotification(), ...data};
    addNotification(newObject);
}

const getNotificationIndex = (id)=>{
    return getNotificationList().findIndex(notification=>notification.id == id);
}

const getNotification = (id)=>{
    let index = getNotificationIndex(id);
    if (index == -1) return undefined;
    return getNotificationList()[index];
}

const setNotification = (id, data)=>{
    let index = getNotificationIndex(id);
    if (index == -1) return undefined;

    let list = getNotificationList();
    let notification = list[index];
    notification = {...notification, ...data}
    notification.id = id;
    list[index] = notification;

    setNotificationList(list);
}

const removeNotification = (id)=>{
    let newList = getNotificationList().filter(notification=>notification.id != id);
    setNotificationList(newList);
}

//function
const getUnseenNotifications = ()=>{
    return getNotificationList().filter(notification => notification.seen == false);
}

const setUnseenNotificationToSeen = ()=>{
    let newList = getNotificationList().map(notification=>{
        notification.seen = true;
        return notification;
    });
    setNotificationList(newList);
}

//Export
const NotificationService = {
    //Basic Function
    getNotificationList:getNotificationList,
    addNotification:addNotification,
    addNewNotification:addNewNotification,
    getNotification:getNotification,
    setNotification:setNotification,
    removeNotification:removeNotification,

    //Functions
    getUnseenNotifications:getUnseenNotifications,
    setUnseenNotificationToSeen:setUnseenNotificationToSeen
}

export default NotificationService;