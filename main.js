var arquivo = document.getElementById("arquivo");
var FontSize = 5;
var multLine = 1;
setLine();

function bold(){
    document.execCommand("bold", false, null);
}

function italic(){
    document.execCommand("italic", false, null);
}

function underline(){
    document.execCommand("underline", false, null);
}

function lineThrough(){
    document.execCommand("strikeThrough", false, null);
}

function Font(fontSize){
    document.execCommand("fontSize", false, fontSize);
    FontSize = fontSize;
    setLine();
}

function Line(mult){
    multLine = mult;
    setLine();
}

function setLine(){
    if(arquivo != null){
        arquivo.style.lineHeight = FontSize*6*multLine+"px";
    }
}

function setFont(font){
    document.execCommand("fontName", false, font);
}

function alignCenter(){
    document.execCommand("justifyCenter", false, null);
}

function alignLeft(){
    document.execCommand("justifyLeft", false, null);
}

function alignRight(){
    document.execCommand("justifyRight", false, null);
}

function Justify(){
    document.execCommand("justifyFull", false, null);
}

function FontBigger(){
    if(FontSize < 7){
        Font(FontSize+1);
    }
}

function FontSmaller(){
    if(FontSize > 1){
        Font(FontSize-1);
    }
}

function UnList(){
    document.execCommand("insertUnorderedList", false, null);
}

function OrList(){
    document.execCommand("insertOrderedList", false, null);
}

function color(color){
    document.execCommand("foreColor", false, color);
}

function subscript(){
    document.execCommand("subscript", false, null);
}

function superscript(){
    document.execCommand("superscript", false, null);
}

function indent(){
    document.execCommand("indent", false, null);
}

function hiline(color){
    document.execCommand("hiliteColor", false, color);
}

function link(){
    var link = document.getElementById("URLlink").value;
    document.execCommand("createLink", false, link);
}

var botão = document.getElementById("finish");
var verdade = 1;

function terminar(){
    if(verdade == 1){
        arquivo.setAttribute("contenteditable", false);
        botão.innerHTML = "Modificar";
        verdade = 0;
        save();
        return;
    } else{
        arquivo.setAttribute("contenteditable", true);
        botão.innerHTML = "Terminar";
        verdade = 1;
    }
}

function save(){
    localStorage.setItem("text", arquivo.innerHTML);
}

function render(){
    if(arquivo != null){
        arquivo.innerHTML = localStorage.getItem("text");  
    }
}

render();

var contSubmenu1 = 0;

function submenu1(){
    if(contSubmenu1 == 0){
        document.getElementById("saveFile").style.display = "block";
        contSubmenu1 = 1;
    } else {
        document.getElementById("saveFile").style.display = "none";
        contSubmenu1 = 0;
    }
}

var contSubmenu2 = 0;

function submenu2(){
    if(contSubmenu2 == 0){
        document.getElementById("listFiles").style.display = "block";
        contSubmenu2 = 1;
    } else {
        document.getElementById("listFiles").style.display = "none";
        contSubmenu2 = 0;
    }
}

var repeat = false;
var inputName = document.getElementById("fileName");

function saveFile(){
    var fileName = inputName.value;
    localStorage.setItem("file"+fileName, arquivo.innerHTML);
    for(file of Filelist){
        if(fileName == file){
            repeat = true;
        }
    }
    if(repeat == false){
        Filelist.push(fileName);
    }
    saveList();
    renderList();
    repeat = false;
}

function loadFile(file){
    arquivo.innerHTML = localStorage.getItem("file" + file);
    inputName.value = file;
}

function newFile(){
    arquivo.innerHTML = "";
    inputName.value = "";
}

var Filelist = JSON.parse(localStorage.getItem("Filelist")) || [];

function saveList(){
    localStorage.setItem("Filelist", JSON.stringify(Filelist));
}

function renderList(){
    var lista = document.getElementById("listFiles");
    lista.innerHTML = "";
    for(file of Filelist){
        var listFiles = document.getElementById("listFiles");
        var liElement = document.createElement("li");
        var linkElement = document.createElement("a");
        linkElement.innerHTML = file;
        linkElement.setAttribute("href", "#");
        linkElement.setAttribute("onclick", "loadFile('"+file+"')");
        liElement.appendChild(linkElement);
        listFiles.appendChild(liElement);

        var deleteElementImg = document.createElement("img");
        deleteElementImg.setAttribute("src", "Imagens/apagar.ico");
        var deleteElement = document.createElement("a");
        deleteElement.setAttribute("href", "#");
        deleteElement.appendChild(deleteElementImg);
        var pos = Filelist.indexOf(file);
        deleteElement.setAttribute('onclick', 'deleteFile(' + pos + ',"' + file + '")');
        liElement.appendChild(deleteElement);

        saveList();
    }
}

function deleteFile(pos, file) {
    Filelist.splice(pos, 1);
    localStorage.removeItem("file" + file);
    renderList();
};

renderList();

function insert(char){
    arquivo.innerHTML += char;
}