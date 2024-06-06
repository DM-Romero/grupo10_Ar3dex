console.log('Validacion create-product!!!')
const $ = (id) => document.getElementById(id);

window.onload = function() {

let form = document.querySelector('#form-create');

    $('name').addEventListener('focus',()=>{
        $('info-name').innerHTML="Ingresa el nombre del producto"
            setTimeout(()=>{
            $('info-name').innerHTML = "";
        }, 2000);
        $('error-name').innerHTML = ""
    
    });
    $("name").addEventListener("blur",(e)=>{
        $("info-name").innerHTML="";
        if(e.target.value.length<2) $("error-name").innerHTML = "El nombre debe ser mayor a dos caracteres";
        if(!e.target.value) $('error-name').innerHTML = "Debe ingresar el nombre del producto"
    
    })

    $("price").addEventListener("focus",()=>{
        $('info-price').innerHTML = "Ingresa el precio";
            setTimeout(()=>{
            $('info-price').innerHTML = "";
        }, 2000);
        $('error-price').innerHTML = ""
    })
    
    $('price').addEventListener('blur',(e)=>{
        $('info-price').innerHTML = "";
    
        if(e.target.value < 0) $('error-price').innerHTML = "Debe ser un valor valido ";
        if(!e.target.value) $('error-price').innerHTML = "Debes ingresar el precio del producto"
    });

    $("discount").addEventListener("focus",()=>{
        $('info-discount').innerHTML = "Ingresa el descuento";
            setTimeout(()=>{
            $('info-discount').innerHTML = "";
        }, 2000);
        $('error-discount').innerHTML = ""
    })
    
    $('discount').addEventListener('blur',(e)=>{
        $('info-discount').innerHTML = "";
    
        if(e.target.value < 0) $('error-discount').innerHTML = "Debe ser un valor valido";
        if(!e.target.value) $('error-discount').innerHTML = "Debes ingresar el descuento del producto"
        
    });

    $("description").addEventListener("focus",()=>{
        $('info-description').innerHTML = "Ingresa la descripción del producto";
            setTimeout(()=>{
            $('info-description').innerHTML = "";
        }, 2000);
        $('error-description').innerHTML = ""
    })
    
    $('description').addEventListener('blur',(e)=>{
        $('info-description').innerHTML = "";
    
        if(e.target.value.length < 20) $('error-description').innerHTML = "Debe tener más de 20 caracteres";
        if(!e.target.value) $('error-description').innerHTML = "Debes ingresar la descripción del producto"
        
    });

    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let error = false;
        let camposVacios = '';
        

        for (let i = 0; i < form.elements.length - 1; i++) {
            const element = form.elements[i];
            const identificador = element.getAttribute('data-identificador');
            

            if (!element.value) {
                error = true;
                camposVacios += `El campo ${identificador} es obligatorio.<br>`;
            } 
        }
        const name=document.querySelector('#name');
        if (!error) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "El producto " + name.value + " se creó con éxito",
                footer : " ",
                showConfirmButton: false,
                
              });
              setTimeout(() => {
                form.submit();
            }, 2000);
           
        } else {
            Swal.fire({
                icon: "error",
                title: "Ups, hay campos vacíos",
                html: camposVacios,
              });
        }
    });
}    

    
