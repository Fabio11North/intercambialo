
    //Obtiene la lista de objetos del localstorage
    const objectList= [];   

    //Hace un set al localstorage
    function localStorageObjectList(list){
        localStorage.setItem('Object',JSON.stringify(list));
    }


    const addObject = (data) =>{
        let list= getLocalStorage();
        list.push(data)
        localStorageObjectList(list);
    }

    const addNewObject = (data)=>{
        const createNewObject = ()=>{
            const getMaxId = ()=>{
                let list = getLocalStorage();
                return list.reduce((previous, current)=>{
                    return Math.max(previous, current.id);
                }, -1);
            }
            
            return {
                id:getMaxId()+1,
                nombre:"Nombre",
                descripcion:"Descripcion",
                precio: "Precio",
                detalles: "Detalles",
                image: "Mi Imagen",
                user: {
                    id:0,
                    name:"Daniel Matsuura",
                    city:"Encarnacion"
                }
            };
        }
    
        let newObject = {...createNewObject(), ...data};
        addObject(newObject);
    }

   

    const getLocalStorage = () =>{
        try{
            const item = localStorage.getItem('Object');
            return item ? JSON.parse(item) : []
        }catch(error){
            console.log(error);
            return [];
        }
    }

    const getKeyLocalStorage = (value) =>{

        try{
            let dato = getLocalStorage()
            console.log(dato);
            for (let i = 0; i < dato.length; i++) {
                if(dato[i].id == value){
                    console.log("Se encontro el objecto: " + dato[i].nombre);
                    return dato[i]
                }      
            }

            return undefined;
        }catch(error){
            console.log(error);
            return [];
        }   
    }

    const deleteObjectList = (id)=>{

        objectList = getLocalStorage('Object')
        var newObjectList= []

        for (let i = 0; i < objectList.length; i++) {
            if (!(objectList[i].id == id)) {
                newObjectList.push(objectList[i]);
            }
        }

        objectList = newObjectList;

        //Actualiza el LocalStore
        localStorageObjectList(objectList);

    }

    const getObjectIndex = (id) =>{
        return getLocalStorage().findIndex(object=> object.id == id);
    }

    const editObjectList = (id, data) =>{
        let index = getObjectIndex(id);
        if(index == -1) return undefined;

        let list = getLocalStorage();
        let object = list[index];
        object = {...object, ...data}
        object.id= id;
        list[index] = object;

        localStorageObjectList(list);

    }

    
    const ObjectService = {
        addNewObject: addNewObject,
        getLocalStorage: getLocalStorage,
        getKeyLocalStorage: getKeyLocalStorage,
        deleteObjectList: deleteObjectList,
        localStorageObjectList: localStorageObjectList,
        editObjectList: editObjectList,
        objectList: objectList
    }


export default ObjectService