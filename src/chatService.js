var chatList= []

const createMessage=(message,author)=>{
    var newMessage ={
        text: message,
        author: author
    }
    return newMessage;
}

const createChat =(author,destiny)=>{
    var chat = {
        id: Math.floor(Math.random() *1000),
        user1: author,
        user2: destiny,
        messages : []
    }
    return chat
}

const saveChat=(chat)=>{
    if(chat==null){
        return null
    }
    var recoveredList = localStorage.getItem("chats")
    if(recoveredList == null){
        chatList.push(chat)
        localStorage.setItem("chats",JSON.stringify(chatList))
    }else{
        chatList= JSON.parse(recoveredList)
        chatList.push(chat)
        localStorage.setItem("chats",JSON.stringify(chatList))
    }

}

const updateChat=(chat,message)=>{
    var newChatList=[]
    var newChat
    getChats()

    for(var i=0; i< chatList.length ; i++){
        if(chatList[i].id == chat.id){
            newChat = chatList[i]
            newChat.messages.push(message)
            newChatList.push(newChat)
        }else{
            newChatList.push(chatList[i])
        }
       
    }
    chatList= newChatList
    localStorage.setItem("chats",JSON.stringify(chatList))
    
    return newChat
}

const deleteChat=(id)=>{
    getChats()

    if(chatList == null){
    }else{
        var newList =[]
        for(var i=0; i < chatList.length; i++){
            if(chatList[i].id != id){
                newList.push(chatList[i])
            }
        }
        chatList= newList
    }
    localStorage.setItem("chats",JSON.stringify(chatList))
}

const getChat=(id)=>{
    getChats()
    for(var i=0; i < chatList.length ; i++){
        if(chatList[i].id== id){
            return chatList[i]
        }
    }
    return null
}

const getChats=()=>{
    var recoveredList = localStorage.getItem("chats")
    if(recoveredList == null){
        chatList= []
        return chatList
    }else{
        chatList= JSON.parse(recoveredList)
        return chatList
    }
}

const existsChat=(user1,user2)=>{
    getChats()

    for(var i=0; i< chatList.length; i++){
        if((chatList[i].user1.id === user1) && (chatList[i].user2.id === user2)){
            return chatList[i].id
        }else if((chatList[i].user1.id === user2) && (chatList[i].user2.id === user1)){
            return chatList[i].id
        }
    }
    return null
}

const ChatService ={
    createChat: createChat,
    createMessage: createMessage,
    saveChat: saveChat,
    updateChat: updateChat,
    getChat: getChat,
    getChats: getChats,
    existsChat: existsChat,
    deleteChat: deleteChat,
    chatList: chatList
}

export default ChatService