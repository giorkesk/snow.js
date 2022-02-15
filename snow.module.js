class GUI{
    constructor(json){
        this.parseJson=function(json){
            let out=[];
            for(var child in json){
                
            }
            return(out);
        }
        this.children=this.parseJson(json);
    }
    getDomElement(){
        return(document.createElement("img"));
    }
}
export {};
