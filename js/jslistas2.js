'use strict'
var lista=[];
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
        if(name == "" || lastname == "" || radio_checked == undefined){
            alert("Es necesario rellenar todos los datos");
        }
        else{

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
   

    btnedit.className="btnedit";
    btndelet.className="btndelet";
    

    var td2 = document.createElement("td");
    
    td2.appendChild(btnedit);
    td2.appendChild(btndelet);
    
    
    tr.appendChild(td2);
    table.appendChild(tr);
}

//botones listado
const listado = document.getElementById('listado');
listado.addEventListener('click', identificacion)

function identificacion(e){
    const radiobtn = document.getElementsByName("radio");
    if(e.target.matches(".btndelet")){
        
        const tIndex = e.target.parentNode.parentNode.rowIndex;
        listado.deleteRow(tIndex);
    }
    if(e.target.matches(".btnedit")){
        var fila = e.target.parentNode.parentNode;
        const trnombre = document.createElement('input');
        const trapellidos = document.createElement('input');

        for(var i=0;i<4;i++){
            
            if(i==0){
                trnombre.value = fila.cells[i].innerHTML;
                fila.cells[i].innerHTML = "";
                fila.cells[i].appendChild(trnombre);
            }
            if(i==1){
                trapellidos.value = fila.cells[i].innerHTML;
                fila.cells[i].innerHTML = "";
                fila.cells[i].appendChild(trapellidos);
            }
            if(i==2){
                const identi = fila.cells[i].innerHTML;
                fila.cells[i].innerHTML = "";
                const rcena = document.createElement('input');
                const rfiesta = document.createElement('input');
                const rceyfi = document.createElement('input');

                const lcena = document.createElement('label');
                const lfiesta = document.createElement('label');
                const lceyfi = document.createElement('label');

                lcena.innerHTML = "Cena";
                lfiesta.innerHTML = "Fiesta";
                lceyfi.innerHTML = "Cena y Fiesta";

                rcena.type = "radio";
                rfiesta.type = "radio";
                rceyfi.type = "radio";

                rcena.value = "Cena";
                rfiesta.value = "Fiesta";
                rceyfi.value = "Cena y Fiesta";
                if(rcena.value == identi){
                    rcena.checked = true;
                }
                if(rfiesta.value == identi){
                    rcena.checked = true;
                }
                if(rceyfi.value == identi){
                    rcena.checked = true;
                }

                rcena.name = "radiom";
                rfiesta.name = "radiom";
                rceyfi.name = "radiom";

                fila.cells[i].appendChild(rcena);
                fila.cells[i].appendChild(lcena);
                fila.cells[i].appendChild(rfiesta);
                fila.cells[i].appendChild(lfiesta);
                fila.cells[i].appendChild(rceyfi);
                fila.cells[i].appendChild(lceyfi);

            }
            if(i==3){
                const btnmodi = document.createElement('button');
                btnmodi.innerHTML = "Modificar";
                btnmodi.id = "btnmodi"
                fila.cells[i].innerHTML="";
                fila.cells[i].appendChild(btnmodi);
            }
        }
        document.getElementById('btn-introducir').disabled = true;
        document.getElementById('tabla').disabled = true;
        
    }
    if(e.target.matches(".btnmodi")){
        for(var i=0;i<4;i++){
            if(i==0){

            }
            if(i==1){

            }
            if(i==2){

            }
            if(i==3){

            }


        }


    }
}



