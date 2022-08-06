
  const fileInput = document.getElementById("formGroupExampleInput4");//subir archivo


  const originalImage = document.getElementById("imgFotoPrincipalPreload");
  
//  const compressedImage = document.querySelector("#compressedImage");
  
  //const resizingElement = document.querySelector("#resizingRange");
  
  //const qualityElement = document.querySelector("#qualityRange");
  
 // const uploadButton = document.querySelector("#uploadButton");
  
  var compressedImageBlob=1;
  
  //let resizingFactor = 0.5;
  
  //let quality = 0.3;
  
  // initializing the compressed image
  //compressImage(originalImage, resizingFactor, quality);
  
  
  fileInput.addEventListener("change", async (e) => {
                const [file] = fileInput.files;
                // storing the original image
                originalImage.src = await fileToDataUri(file);//fileToDaraUri obtiene el blob de la imagen
                // compressing the uplodaded image
                originalImage.addEventListener("load", () => {//espera a que carge la imagen y despues la comprime
                  compressImage(originalImage,0.3);
                });
                return false;//stop run this funtion
  });
  

  //resizingElement.oninput = (e) => {// oninput when reasizing elemt is input or change, (e) es el enevto
    
    //resizingFactor = parseInt(e.target.value) / 100;//parseInt convert numver to integer
    //compressImage(originalImage, resizingFactor, quality);
  //};
  
  //qualityElement.oninput = (e) => {
   // quality = parseInt(e.target.value) / 100;
   // compressImage(originalImage, resizingFactor, quality);
  //};
  
  /*
  uploadButton.onclick = () => {
    // uploading the compressed image to
    // Imgur (if present)
    if (compressedImageBlob) {
      const formdata = new FormData();
      
      formdata.append("image", compressedImageBlob);
      fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Client-ID YOUR_CLIENT_ID"
        },
        body: formdata
      }).then((response) => {
        if (response?.status === 403) {
          alert("Unvalid Client-ID!");
        } else if (response?.status === 200) {
          // retrieving the URL of the image
          // just uploaded to Imgur
          response.json().then((jsonResponse) => {
            alert(`URL: ${jsonResponse.data?.link}`);
          });
          alert("Upload completed succesfully!");
        } else {
          console.error(response);
        }
      });
    } else {
      alert("Rezind and compressed image missing!");
    }
  };*/
  
  //FUNCION COMPRIMIR IMAGEN
  function compressImage(imgToCompress, quality) {
    // showing the compressed image
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    const originalWidth = imgToCompress.width;
    const originalHeight = imgToCompress.height;
    
  

    //const canvasWidth = originalWidth * resizingFactor;
    //const canvasHeight = originalHeight * resizingFactor;
    
    const canvasWidth =800;
    const canvasHeight = originalHeight*800/originalWidth;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.drawImage(
      imgToCompress,
      0,
      0,
  
    // originalWidth * resizingFactor,
      //originalHeight * resizingFactor,
      800,
      originalHeight * 800/originalWidth,

    );
  
    // reducing the quality of the image
    canvas.toBlob(
      
      (blob) => {
        
        if (blob) {
          
          compressedImageBlob = blob;
          //compressedImage.src = URL.createObjectURL(compressedImageBlob);
          //document.querySelector("#size").innerHTML = bytesToSize(blob.size);
        }
      },
      "image/jpeg",
      quality
    );
  }
  
  
  function fileToDataUri(field) {
    return new Promise((resolve) => {    //devuelve una promesa
              const reader = new FileReader();    //creando objeto que lle archivos
              reader.addEventListener("load", () => {   //ejecutar cunado se carget
                            resolve(reader.result);   //
                          });
              reader.readAsDataURL(field);// lee el archivo pasado field un aves finalizado lo pasa a load arriba
    });
  }

  /*
  // source: https://stackoverflow.com/a/18650828
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  
    if (bytes === 0) {
      return "0 Byte";
    }
  
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }
*/
  
  
  export{compressImage};
  export{originalImage};
  export{compressedImageBlob}

