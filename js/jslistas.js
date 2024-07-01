'use strict'
var lista=[];
var marca;
const btnModificar = document.getElementById('btn-modificar');
window.addEventListener('load', ()=>{
    document.getElementById('btn-modificar').disabled = true;

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
    marca = e;
    const radiobtn = document.getElementsByName("radio");
    if(e.target.matches(".btndelet")){
        
        const tIndex = e.target.parentNode.parentNode.rowIndex;
        listado.deleteRow(tIndex);
    }
    if(e.target.matches(".btnedit")){
        var fila = e.target.parentNode.parentNode;

        for(var i=0;i<3;i++){
            
            if(i==0){
                document.getElementById("nombre").value = fila.cells[i].innerHTML;
            }
            if(i==1){
                document.getElementById("apellido").value = fila.cells[i].innerHTML;
            }
            if(i==2){
                const identi = fila.cells[i].innerHTML;
                for (let index in radiobtn){
                    if(radiobtn[index].value == identi){
                        radiobtn[index].checked = true;
                    }
                }
            }
        }
        
        btnModificar.disabled = false;
        document.getElementById('btn-introducir').disabled = true;
        document.getElementById('tabla').disabled = true;
        
    }
}

btnModificar.addEventListener('click',()=>{
    var fila = marca.target.parentNode.parentNode;
    const radiobtn = document.getElementsByName("radio");
    var radio_checked;
    var name = document.getElementById("nombre").value
    var lastname = document.getElementById("apellido").value;
    for (let index in radiobtn){
        if(radiobtn[index].checked == true){
            radio_checked = radiobtn[index].value;
        }
    }
    if(name == "" || lastname == "" || radio_checked == undefined){
        alert("Es necesario rellenar todos los datos");
    }else{
    
        for(var i=0;i<3;i++){
            
            if(i==0){
                fila.cells[i].innerHTML= document.getElementById("nombre").value;
            }
            if(i==1){
                fila.cells[i].innerHTML = document.getElementById("apellido").value;
            }
            if(i==2){
                const radiobtn = document.getElementsByName("radio");
                for (let index in radiobtn){
                    if(radiobtn[index].checked == true){
                        fila.cells[i].innerHTML = radiobtn[index].value;
                    }
                }
            }
        }
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        for (let index in radiobtn){
            if(radiobtn[index].checked == true){
            radiobtn[index].checked = false;
            }
        }
        btnModificar.disabled = true;
        document.getElementById('btn-introducir').disabled = false;
    }
});



