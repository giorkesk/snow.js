class GUI{
    constructor(json={}){
        this.parseJson=function(json){
            let out=[];
            for(var i=0;i<json.length;i++){
                let child=json[i];
                if(child["add"]=="text"){
                    out.push(new GUI_Text(child["text"]));
                }
                if(child["add"]=="button"){
                    out.push(new GUI_Button(child["text"]));
                }
                if(child["add"]=="slider"){
                    out.push(new GUI_Slider(child["min"],child["max"]));
                }
                if(child["add"]=="input"){
                    out.push(new GUI_Input(child["text"]));
                }
                if(child["add"]=="container"){
                    out.push(new GUI_Container(this.parseJson(child["children"])));
                }
            }
            return(out);
        }
        this.extrHTML=function(group){
            let out="";
            for(let i=0;i<group.children.length;i++){
                let child=group.children[i];
                if(child.children!=undefined){
                    out+=child.innerStart+this.extrHTML(child)+child.innerEnd;
                }else{
                    out+=child.inner;
                    out+="<br>";
                }
            }
            return(out);
        }
        this.updateElement=function(){
            this.elem.innerHTML=this.extrHTML(this);
        }
        this.elem=document.createElement("div");
        this.children=this.parseJson(json);
    }
    getDomElement(){
        this.updateElement();
        return(this.elem);
    }
}

class GUI_Text{
    constructor(text=""){
        this.inner="<span>"+text+"</span>";
    }
    setText(text=""){
        this.inner="<span>"+text+"</span>";
    }
}

class GUI_Button{
    constructor(text=""){
        this.inner="<button>"+text+"</button>";
    }
    setText(text=""){
        this.inner=text;
    }
}

class GUI_Slider{
    constructor(min=0,max=100){
        this.inner="<input type='range' min='"+String(min)+"' max='"+String(max)+"'/>";
    }
}

class GUI_Input{
    constructor(text=""){
        this.inner="<input type='text' value='"+text+"'/>";
    }
}
class GUI_Container{
    constructor(children=[]){
            this.children=children;
            this.innerStart="<div>";
            this.innerEnd="</div>";
    }
}
export {GUI,GUI_Text,GUI_Button,GUI_Slider,GUI_Input};