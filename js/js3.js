'use strict'
var lista=[];
var marca;
window.addEventListener('load', ()=>{

    document.getElementById("btn-introducir").addEventListener('click', ()=>{
        const radiobtn = document.getElementsByName("radio");
        var radio_checked;
        var name = document.getElementById("nombre").value
        var lastname = document.getElementById("apellido").value
        for (let index in radiobtn){
            if(radiobtn[index].checked == true){
                radio_checked = radiobtn[index].value;
            }
        }


        //control de campos
        name = name.trim();
        lastname = lastname.trim();
        var repe = recorrerJSON(name,lastname,lista)

        if(name == "" || lastname == "" || radio_checked == undefined || repe==false){

            if(name==""){
                document.getElementById("nombre").style.border= "red solid 1px";
            }
            if(lastname == "" ){
                document.getElementById("apellido").style.border= "red solid 1px";
            }
            if(radio_checked == undefined){
                document.getElementById("cena").style.border= "red solid 1px";
                document.getElementById("fiesta").style.border= "red solid 1px";
                document.getElementById("ceyfe").style.border= "red solid 1px";
            }
            if(repe==false){
                document.getElementById("alerta").removeAttribute("hidden");
            }
            
            
        }
        else{
                document.getElementById("nombre").removeAttribute("style");
                document.getElementById("apellido").removeAttribute("style");
                document.getElementById("cena").removeAttribute("style");
                document.getElementById("fiesta").removeAttribute("style");
                document.getElementById("ceyfe").removeAttribute("style");
                document.getElementById("alerta").setAttribute("hidden","");
                
            
            var sujeto ={
                nombre: name,
                apellido: lastname,
                asistencia: radio_checked
            }
            lista.push(sujeto);
            Dlista(sujeto);

            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            for (let index in radiobtn){
                if(radiobtn[index].checked == true){
                    radiobtn[index].checked = false;
                }
            }
        }
    })

    //botones listado
    const listado = document.getElementById('listado');
    listado.addEventListener('click', identificacion)


    document.getElementById("btn-modificar").addEventListener('click', ()=>{
        var fila = marca.target.parentNode.parentNode;
        const tIndex = marca.target.parentNode.parentNode.rowIndex;
        const radiobtn2 = document.getElementsByName("radio2");
        fila.cells[0].innerHTML = mnombre.value;
        lista[tIndex-1].nombre = mnombre.value;
        fila.cells[1].innerHTML = mapellido.value;
        lista[tIndex-1].apellido = mapellido.value;
        for (let index in radiobtn2){
            if(radiobtn2[index].checked == true){
                fila.cells[2].innerHTML = radiobtn2[index].value;
                lista[tIndex-1].asistencia = radiobtn2[index].value;
            }
        }
    });

    document.getElementById("btn-descarga").addEventListener('click', ()=>{ sortJSON(lista, 'nombre','asc'); jsonToExcel(lista, 'Lista.xlsx')})
})

//mete los datos en la lista
function Dlista(sujeto){
    var table = document.getElementById("listado");
    var tr = document.createElement("tr");
    
    for(let x in sujeto){
        var td = document.createElement("td");
        td.innerHTML = sujeto[x];
        tr.appendChild(td);
    }
    var btndelet = document.createElement("button");
    var btnedit = document.createElement("button");
   

    btnedit.className="btnedit btn btn-warning btn-sm";
    btndelet.className="btndelet btn btn-danger btn-sm";

    btnedit.setAttribute("data-bs-toggle", "modal");
    btnedit.setAttribute("data-bs-target", "#myModal");
    

    var td2 = document.createElement("td");
    
    td2.appendChild(btnedit);
    td2.appendChild(btndelet);
    
    
    tr.appendChild(td2);
    table.appendChild(tr);
}



function identificacion(e){
    marca = e;
    const tIndex = e.target.parentNode.parentNode.rowIndex;
    if(e.target.matches(".btndelet")){
        lista.splice(tIndex-1,1);
        listado.deleteRow(tIndex);
    }
    if(e.target.matches(".btnedit")){
        var mnombre = document.getElementById("mnombre");
        var mapellido = document.getElementById("mapellido");
        var fila = e.target.parentNode.parentNode;
        mnombre.value = fila.cells[0].innerHTML;
        mapellido.value = fila.cells[1].innerHTML;
        const radiobtn2 = document.getElementsByName("radio2");
        const identi = fila.cells[2].innerHTML;
        for (let index in radiobtn2){
            if(radiobtn2[index].value == identi){
                radiobtn2[index].checked = true;
            }
        }

    }
}



//pasar a csv
function jsonToExcel(jsonData, fileName) {
    // Crear una nueva hoja de trabajo a partir de los datos JSON
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    
    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();
    
    // Agregar la hoja de trabajo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Escribir el libro de trabajo en un archivo de tipo blob
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Crear un blob a partir del buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Crear un enlace temporal para la descarga
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function recorrerJSON(nomb,apell,objeto){
    for(var i=0;i<objeto.length;i++){
        if(objeto[i].nombre==nomb && objeto[i].apellido==apell)
            {
                return false;
            }
    }
}