class GUI{
	constructor(json=[]){
		this.parseJson=function(json){
			let out=[];
			for(let i=0;i<json.length;i++){
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
				if(child["add"]=="image"){
					out.push(new GUI_Image(child["url"]));
				}
				if(child["add"]=="checkbox"){
					out.push(new GUI_Checkbox());
				}
				if(child["add"]=="radio"){
					out.push(new GUI_Radio(child["group"]));
				}
				if(child["add"]=="container"){
					out.push(new GUI_Container(this.parseJson(child["children"])));
				}
				if(child["add"]=="vcontainer"){
					out.push(new GUI_VerticalContainer(this.parseJson(child["children"])));
				}
				if(child["add"]=="window"){
					out.push(new GUI_Window(this.parseJson(child["children"]),child["x"],child["y"],child["flip"]));
				}
			}
			return(out);
		}
		this.convert=function(child,elem){
			elem.innerHTML="";
			for(var i=0;i<child.children.length;i++){
				if(child.children[i].children!=undefined){
					let inr=child.children[i].inner;
					this.convert(child.children[i],inr);
					elem.appendChild(inr);
				}else{
					elem.appendChild(child.children[i].inner);
				}
				if(child.splitter!=undefined){
					elem.appendChild(document.createElement(child.splitter));
				}
			}
		}
		this.refresh=function(){
			this.convert(this,this.elem);
		}
		this.elem=document.createElement("div");
		this.children=this.parseJson(json);
		this.splitter="br";
	}
	getDomElement(){
		this.refresh();
		return(this.elem);
	}
}

class GUI_Text{
	constructor(text=""){
		this.inner=document.createElement("span");
		this.inner.innerText=text;
	}
}

class GUI_Button{
	constructor(text=""){
		this.inner=document.createElement("button");
		this.inner.innerText=text;
	}
}

class GUI_Slider{
	constructor(min=0,max=100){
		this.inner=document.createElement("input");
		this.inner.type="range";
		this.inner.min=min;
		this.inner.max=max;
	}
}

class GUI_Input{
	constructor(text=""){
		this.inner=document.createElement("input");
		this.inner.type="text";
		this.inner.value=text;
	}
}

class GUI_Image{
	constructor(url=""){
		this.inner=document.createElement("img");
		this.inner.src=url;
	}
}

class GUI_Checkbox{
	constructor(){
		this.inner=document.createElement("input");
		this.inner.type="checkbox";
	}
}

class GUI_Radio{
	constructor(group="default"){
		this.inner=document.createElement("input");
		this.inner.type="radio";
		this.inner.name=group;
	}
}

class GUI_Container{
	constructor(children=[]){
		this.children=children;
		this.inner=document.createElement("div");
	}
}

class GUI_VerticalContainer{
	constructor(children=[]){
		this.children=children;
		this.inner=document.createElement("div");
		this.splitter="br";
	}
}

class GUI_Window{
	constructor(children=[],x=25,y=25,flip=false){
		this.children=children;
		this.inner=document.createElement("div");
		this.inner.style.position="fixed";
		if(flip){
			this.inner.style.float="right";
			this.inner.style.top=String(x)+"px";
			this.inner.style.right=String(y)+"px";
		}else{
			this.inner.style.float="left";
			this.inner.style.top=String(x)+"px";
			this.inner.style.left=String(y)+"px";
		}
	}
}

export {GUI,GUI_Text,GUI_Button,GUI_Slider,GUI_Input,GUI_Image,GUI_Checkbox,GUI_Radio,GUI_Container,GUI_VerticalContainer,GUI_Window};

