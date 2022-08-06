import {initializeApp} from 'firebase/app'
import {getFirestore, collection,getDoc, getDocs, addDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";

import{compressedImageBlob} from './imgload.js';

const firebaseConfig = {
    apiKey: "AIzaSyBjUVcRXPy-f8RyxU51NQwBuwYesivJJO8",
    authDomain: "german-35b54.firebaseapp.com",
    projectId: "german-35b54",
    storageBucket: "german-35b54.appspot.com",
    messagingSenderId: "4589564832",
    appId: "1:4589564832:web:b2cfab4d1118665c6b2ac5"
  };

const app = initializeApp(firebaseConfig)



//----------------------MAPA---------------------------+
// creara variable max_pos_args
var map = L.map('map',{closePopopOnClick:false,zoomControl:false}).setView([-16.5245, -68.0968], 13);

//añadir mapa a map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map);
L.control.zoom({position: 'bottomleft'}).addTo(map);

//----------------------firebase---------------------------+
// Create a root reference storege
const storage = getStorage();

//init getfirestore
const db =getFirestore()
//collection
const colRef=  collection(db,'venta')
//getcollectio 
getDocs(colRef)
    .then((snapshot)=>{
      let itemventa=[]
      snapshot.docs.forEach((doc)=>{
        itemventa.push({...doc.data(), id: doc.id})
      })
      //plotear anuncios
      itemventa.forEach(xx=>{
        L.marker([xx.x,xx.y],{id:'germantitulo'}).addTo(map)
        //primera funsion 
        .on('click',function(e) {
      
              let ref1=ref(storage,xx.idimage);
              getDownloadURL(ref1)

              .then((url)=>{
                let img=document.getElementById('imagencard');
                img.setAttribute('src',url);
              })
              .catch((error)=>{alert(error);});
              
              let div =document.getElementById('card1');
              div.style.display='block';
        })
        //poner tooltip
        .bindTooltip(xx.precio,{permanent:true, sticky:true ,offset:([0,-40]),direction:"top"}).openTooltip();

     });
    })
    .catch(err=>{
      console.log(err.message)
    })

//boton cerrar iamgenes
let gg=document.getElementById('btnsalir');
gg.onclick=function(){
  let div =document.getElementById('card1');
          div.style.display='none';
  let img=document.getElementById('imagencard');
  img.setAttribute('src',"./img/loading7.gif");
};


//PONER LOS DATOS DE CORDENADA DE UN CLICK EN UN POPUD EN UN POPUP
var popup = L.popup();
function onMapClick(e) {
    popup
         .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
         .setContent("Has hecho click en la coordenada:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) // Sets the HTML content of the popup.
         .openOn(map); // Adds the popup to the map and closes the previous one. 
         
         document.getElementById("formGroupExampleInput").value= e.latlng.lat
         document.getElementById("formGroupExampleInput2").value= e.latlng.lng     
               }
 map.on('dblclick', onMapClick);

 //firebase add

const addcasaventa=document.querySelector('.addcasaventa')
addcasaventa.addEventListener('submit', (e)=>{
  e.preventDefault()
      //cargar datos
      let idimage = Math.random().toString(16).slice(2);
      addDoc(colRef,{
        x:addcasaventa.formGroupExampleInput.value,
        y:addcasaventa.formGroupExampleInput2.value,
        precio:addcasaventa.formGroupExampleInput3.value,
        idimage:idimage+'.jpg'
      })
      //SUBIR IMEGENES storage(imagenes) 
      const file1=document.getElementById("formGroupExampleInput4");
      const file=file1.files[0];
      console.log(file,"german222",compressedImageBlob);
      //compressImage(originalImage,0.3)
      
      const storageRef = ref(storage,idimage+'.jpg');
      
      uploadBytes(storageRef, compressedImageBlob)
  .then((docid)=>{
    console.log(docid);
    addcasaventa.reset();
  })
})







