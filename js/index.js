//nav
let menu_bar = document.querySelector('#menu-bar');
menu_bar.addEventListener('click', function() {
    menu.classList.toggle("menu-toggle");
    
});

//GALLERY
function galeryImg(){
    const image = document.querySelectorAll(".img");
    const containerimg = document.querySelector(".container_img");
    const imageContainer = document.querySelector(".img-show");
    const copy = document.querySelector(".copy");
    const close = document.querySelector(".bx.bx-x"); 
    
    
    image.forEach(image => {
        image.addEventListener("click", ()=>{
    
            addImage(image.getAttribute('src'),image.getAttribute('alt'));
    
        })
    });
    
    
    const addImage = (srcImage, altImage) =>{
        containerimg.classList.toggle('move'); // toggle agrega o quita las clases 
        imageContainer.classList.toggle('show');
        imageContainer.src  = srcImage
        copy.innerHTML = altImage;
    }
    
    close.addEventListener('click',() =>  {
        containerimg.classList.toggle('move');
        imageContainer.classList.toggle('show');
    });
    
}

// REST PARTE TABLA
function contactJS(){
    const url = 'https://62c694ca74e1381c0a62f321.mockapi.io/api/usuarios';
    let id = 0;
    //inspeccionar porq ese id, como se asigna y como manipularlo
    async function obtenerDatos(){
        const tabla = document.querySelector("#body__t");
        tabla.innerHTML= "";
        try{
            let res = await fetch(url);
            let json = await res.json();
            for (const usuario of json) {
                let email = usuario.email;
                let nombre = usuario.nombre;
                let coment = usuario.comentario
                id = usuario.id;
                tabla.innerHTML +=`<tr class ="tr__js">
                                        <td>
                                            ${email}
                                        </td>
                                        <td>
                                            ${nombre}
                                        </td>  
                                        <td>
                                            ${coment}
                                        </td>  
                                        <td class = "seleccionar">
                                            ${id}
                                        </td>  
                                        </tr>`;
            }
        }
        catch (error){
            console.log(error)
        }
        console.log(id);
    };
    
    async function enviarDato(e) {
        e.preventDefault();
        method(url, "POST", "Enviado");
        formSelector.reset();
    };
    async function  modificarUltimo(e){
        e.preventDefault();
        method(`${url}/${id}`, "PUT", "modificado");
        formSelector.reset();
        obtenerDatos();
    };

    async function borrarUltimo(){ 
        let formData = new FormData(form) 
        let id__ = formData.get("id__delete")
        try{
            let res = await fetch(`${url}/${id__}`, {
                "method": "DELETE"
            });
            if(res.status === 200){
                document.querySelector("#msg").innerHTML  =`<h5 class="h5_form">Eliminado</h5>`;
            }
        } 
        catch(error){
            console.log(error);
        };
        formSelector.reset();
        obtenerDatos();
    }




    async function method(data, tipo, estado){
        let formData = new FormData(form) 
        let email = formData.get("email")
        let nombre = formData.get ("nombre");
        let comentario = formData.get("comentario__");
        
        let usuarios = {
            "email": email,
            "nombre": nombre,
            "comentario": comentario
        }

        try{
            let res = await fetch(`${data}`, {
                "method": `${tipo}`, //put
                "headers": { "Content-type" : "application/json" },
                "body": JSON.stringify(usuarios)
            });
            if(res.status === 200){
                document.querySelector("#msg").innerHTML  =`<h5 class="h5_form">${estado}</h5>`;
                
            }else if(res.status === 201){
                document.querySelector("#msg").innerHTML  = `<h5 class="h5_form">${estado}</h5>`;
            }
        } catch(error){
            console.log(error);
        }
        obtenerDatos();
    }

    let formSelector =document.querySelector("#form");
    formSelector.addEventListener("submit", enviarDato);
    document.querySelector("#borrar").addEventListener("click", borrarUltimo);
    document.querySelector("#modificar").addEventListener("click", modificarUltimo);
    obtenerDatos();
}