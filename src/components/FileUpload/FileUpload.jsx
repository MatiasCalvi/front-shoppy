import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import productsActions from "../../redux/actions/productsActions";

export default function FileUpload({}) {
  const [value, setValue] = useState(0); //para definir el % de carga
  const [picture, setPicture] = useState(null); //para definir la URL de la imagen
  const dispatch = useDispatch();
  const { fotoCargada } = productsActions;
  const handleUpload = (event) => {
    //función manejadora de la carga
    const file = event.target.files[0]; //el elemento cero o el/los que sean
    const storageRef = ref(getStorage(), "events/" + file.name); //para indicar la carpeta raiz
    const task = uploadBytesResumable(storageRef, file, {
      contentType: "image/png",
    });
    task.on(
      "state_changed", //para configurar la carga
      (snapshot) =>
        setValue(100 * (snapshot.bytesTransferred / snapshot.totalBytes)),
      (error) => console.log(error.message),
      async () => setPicture(await getDownloadURL(task.snapshot.ref))
    );
  };



  return (
    <>
      <input type="file" onChange={handleUpload} />{" "}
      {/*/input de carga de archivo/*/}
      <input type="hidden" name="file" id={picture} />{" "}
      {/*/input cuyo id será la
      url del archivo/*/}
      <progress value={value} max="100" name="file" />{" "}
      {/*/barra porcentual de
      carga/*/}
    </>
  );
}
