const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

class Database{
    constructor(){
        this.documents=[];
        this.save=function(documents){
            if(documents){
                this.documents=documents;
                for(var i=0;i<documents.length; i++){
                    let document = documents[i];
                    Object.entries(document).map(entry=>{
                        this[entry[0]]=entry[1];
                        this[`get${capitalize(entry[0])}`]=function(){
                            return this[entry[0]]
                        }
                        this[`pushTo${capitalize(entry[0])}`]=function(value){
                            let find = this.documents.filter(function(o,index){
                                if(o[entry[0]]){
                                    return o;
                                }
                            })
                            console.log(find)
                            
                        }
                    })
                }
            }
            localStorage.setItem("db",JSON.stringify(this.documents))
        }
        let documents = localStorage.getItem("db")
        if(documents){
            this.save(JSON.parse(documents))
        }
       
    }
}

