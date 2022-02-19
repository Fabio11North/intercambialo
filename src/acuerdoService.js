const acuerdoList = []

const createAcuerdo =(myObject,otherObject,state)=>{
    var newAcuerdo = {
        id: Math.floor(Math.random() *1000),
        new: state,
        myObject: myObject,
        wantObject: otherObject,
        chat:null
    }
    return newAcuerdo
}

const saveAcuerdo =(acuerdo)=>{
    if(acuerdo == null){
        return null
    }
    var recoveredList = localStorage.getItem('Acuerdos')
    
    if(recoveredList == null){
        acuerdoList.push(acuerdo)
        localStorage.setItem("Acuerdos",JSON.stringify(acuerdoList))
    }else{
        acuerdoList= JSON.parse(recoveredList);
        acuerdoList.push(acuerdo)
        localStorage.setItem("Acuerdos",JSON.stringify(acuerdoList))
    }
}

const updateAcuerdo=(id,myObject,otherObject)=>{
    getAllAcuerdo()

    if(acuerdoList == null){
    }else{
        for(var i=0; i < acuerdoList.length; i++){
            if(acuerdoList[i].id == id){
                var editAcuerdo= acuerdoList[i]
                editAcuerdo.myObject= myObject
                editAcuerdo.wantObject= otherObject
                acuerdoList[i]= editAcuerdo;
            }
        }
    }
    saveAllAcuerdo(acuerdoList)
}

const deleteAcuerdo=(id)=>{
    getAllAcuerdo()

    if(acuerdoList == null){
    }else{
        var newList =[]
        for(var i=0; i < acuerdoList.length; i++){
            if(acuerdoList[i].id != id){
                newList.push(acuerdoList[i])
            }
        }
        acuerdoList= newList
    }
    saveAllAcuerdo(acuerdoList)
}

const getAcuerdo=(id)=>{
    getAllAcuerdo()
    if(acuerdoList == null){
        return null;
    }else {
        for(var i=0; i< acuerdoList.length;i++){
            if(acuerdoList[i].id == id){
                return acuerdoList[i];
            }
        }
    }
    return null;
}

const getAllAcuerdo=()=>{
    var recoveredList = localStorage.getItem('Acuerdos')
    if(recoveredList == null){
        acuerdoList=[]
        return []
    }else{
        acuerdoList = JSON.parse(recoveredList)
        return acuerdoList
    }
}

const saveAllAcuerdo=(acuerdos)=>{
    localStorage.setItem("Acuerdos",JSON.stringify(acuerdos))
}

const AcuerdoService ={
    createAcuerdo : createAcuerdo,
    saveAcuerdo : saveAcuerdo,
    updateAcuerdo: updateAcuerdo,
    deleteAcuerdo: deleteAcuerdo,
    getAcuerdo: getAcuerdo,
    getAllAcuerdo: getAllAcuerdo,
    acuerdoList: acuerdoList
}

export default AcuerdoService