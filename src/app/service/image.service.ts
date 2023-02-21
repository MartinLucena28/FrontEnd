import { Injectable } from '@angular/core';
import {Storage, ref, uploadBytes, list} from '@angular/fire/storage'
import { getDownloadURL } from '@firebase/storage';
import { async } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string= "";

  constructor(private storage: Storage) { }

 public uploadImage($event: any, name: String){
  const file =$event.target.files[0]
const imgRef = ref(this.storage,`imagen/`+ name) 
uploadBytes(imgRef, file)
.then(_response =>{this.getImage()})
.catch(error => console.log(error))
 }
getImage(){
  const imagesRef = ref(this.storage, 'imagen')
  list(imagesRef)
  .then(async response =>{
    for(let item of response.items){
      this.url =await getDownloadURL(item);
    
    }
  })
  .catch(error => console.log(error))
}
}
