
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  
  const pokemones = []; //Definir un arreglo en javascript
  const eliminar  = async function(){
    
    let res = await Swal.fire({
      title: "Desea enviar el pokemon al profesor oak?",
      showCancelButton: true,
      confirmButtonText: "Enviar!"
    });
    //La persona dijo que si?
    if(res.isConfirmed){
      //1. Saber que boton fue el que se apreto
      //2. Sacar el nro del boton
      let nro = this.nro;
      //3. Eliminar el pokemon de la lista
      pokemones.splice(nro,1);
      //4. Recargar la tabla
      cargarTabla();
    }else{
      Swal.fire("Operacion cancelada");
    }
  };

  const cargarTabla  = ()=>{
     //1. Una referencia a la tabla
     let tbody = document.querySelector("#tbody-pokemon");
     //Antes del for es limpiar la tabla para que no se repitan
     tbody.innerHTML = "";
     //2. Por cada pokemon generar una fila
     for(let i=0; i < pokemones.length; ++ i){ //for i in range(0,10)
       let p = pokemones[i];
       //Crea un elemento que no existe, pero no lo agrega a la página
       //Puedo crear cualquier etiqueta html aqui
       let tr = document.createElement("tr");
       //3. Por cada atributo de los pokemon (nombre,tipo, etc) generar una celda
       let tdNombre = document.createElement("td");
       let tdTipo = document.createElement("td");
       let tdDescripcion = document.createElement("td");
       let tdNro = document.createElement("td");
       let tdAcciones = document.createElement("td");

       tdNombre.innerText = p.nombre;

       let icono = document.createElement("i");
       if(p.tipo == "1"){
         //Agregar el icono agua
         //<i class="fas fa-tint"></i>
         icono.classList.add("fas","fa-tint", "text-primary", "fa-2x");
       } else if(p.tipo == "2"){
         //Agregar el icono de fuego
         //<i class="fas fa-fire"></i>
         icono.classList.add("fas","fa-fire","text-danger","fa-2x");
       } else if(p.tipo == "3"){
         //Agregar icono de planta
         //<i class="fab fa-envira"></i>
         icono.classList.add("fab", "fa-envira", "text-success", "fa-2x");
       }else{
         //Agregar el icono de  electrico
         //<i class="fas fa-bolt"></i>
         icono.classList.add("fas","fa-bolt","text-warning", "fa-2x");
       }
       tdTipo.classList.add("text-center");
       tdTipo.appendChild(icono);
       

       tdDescripcion.innerHTML = p.descripcion;
       tdNro.innerText = i + 1;
       //TODO: Como agrego un boton para las acciones?
       //Creo el boton
       let boton = document.createElement("button");
       boton.nro = i; //guardar cualquier cosa en un elemento HTML
       boton.addEventListener("click", eliminar);
       //Le agrego el texto al boton
       boton.innerText = "Enviar al profe oak";
       //Hago que el boton sea rojo
       boton.classList.add("btn","btn-danger");
       tdAcciones.classList.add("text-center");

       //Como hacer que el boton elimine?

       //Agrego el boton al td
       tdAcciones.appendChild(boton);

       tr.appendChild(tdNro);
       tr.appendChild(tdNombre);
       tr.appendChild(tdTipo);
       tr.appendChild(tdDescripcion);
       tr.appendChild(tdAcciones);
       tbody.appendChild(tr);
       
     }
     //4. Agregar esa fila a la tabla (Manipulando el DOM)
  };

  document.querySelector("#pokemon-form").addEventListener('submit', (e)=>{
    e.preventDefault(); //Prevenir que el formulario recargue la pagina
    let nombre = document.querySelector("#nombre-txt").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    let legendario = document.querySelector("#legendario-si").checked;
    let tipo = document.querySelector("#tipo-select").value;
    let esValido = true;

    document.querySelector("#nombre-txt").classList.remove("is-invalid");
    document.querySelector("#descripcion-txt").classList.remove("is-invalid");
    
    if(nombre.trim() == ""){ 
      document.querySelector("#nombre-txt").classList.add("is-invalid");
      esValido = false;
    }

    if(descripcion.trim() == ""){
      document.querySelector("#descripcion-txt").classList.add("is-invalid");
      esValido = false;
    }

    if(esValido){
      let pokemon = {};
      pokemon.nombre = nombre;
      pokemon.descripcion = descripcion;
      pokemon.legendario = legendario;
      pokemon.tipo = tipo;
      //TODO: Como limitar la cantidad de pokemon?
      pokemones.push(pokemon);
      cargarTabla();
      Swal.fire("Registro exitoso!","Pokemon Registrado!!", "info");
    }
  });

  document.querySelector("#limpiar-btn").addEventListener("click", ()=>{
     //Limpiar los elementos
     //Limpia un input text
     document.querySelector("#nombre-txt").value = "";
     //Limpiar un tinymce
     tinymce.get("descripcion-txt").setContent("");
     //Limpia un radiobutton (seleccionando la primera opcion)
     document.querySelector("#legendario-si").checked = true;
     //Limpia un select (tambien seleccionando la primera opcion)
     document.querySelector("#tipo-select").value= "1";
  });