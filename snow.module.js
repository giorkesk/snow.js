class GUI{
    constructor(json={}){
        this.parseJson=function(json){
            let out=[];
            for(var child in json){
                if(child["add"]=="text"){
                    out.append(new GUI_Text(child["text"]));
                }
                if(child["add"]=="button"){
                    out.append(new GUI_Button(child["text"]));
                }
                if(child["add"]=="slider"){
                    out.append(new GUI_Slider(child["min"],child["max"]));
                }
                if(child["add"]=="input"){
                    out.append(new GUI_Input(child["text"]));
                }
                if(child["add"]=="container"){
                    out.append(new GUI_Container(this.parseJson(child["children"])));
                }
            }
            return(out);
        }
        this.elem=document.createElement("div");
        this.children=this.parseJson(json);
    }
    getDomElement(){
        console.log(this);
        return(this.elem);
    }
}

class GUI_Text{
    constructor(text=""){
        this.inner=text;
        this.useHTML=false;
    }
    setText(text=""){
        this.inner=text;
    }
}

class GUI_Button{
    constructor(text=""){
        this.inner="<button>"+text+"</button>";
        this.useHTML=true;
    }
    setText(text=""){
        this.inner=text;
    }
}

class GUI_Slider{
    constructor(min=0,max=100){
        this.inner="<input type='range' min='"+String(min)+"' max='"+String(max)+"'/>";
        this.useHTML=true;
    }
}

class GUI_Input{
    constructor(text=""){
        this.inner="<input type='text' value='"+text+"'/>";
        this.useHTML=true;
    }
}
class GUI_Container{
    constructor(children=[]){
            this.children=children;
    }
}
export {GUI,GUI_Text,GUI_Button,GUI_Slider,GUI_Input};