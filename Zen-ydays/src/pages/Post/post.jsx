import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { firestore, storage } from "../../db/firebase-config.jsx";
import { collection, addDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const bookRef = collection(firestore, "Books");

  const uploadImg = async () => {
    if (!image) return "";
  
    const imgRef = ref(storage, `images/${currentUser.uid}/${image.name + v4()}`);
  
    try {
      await uploadBytes(imgRef, image);
      console.log("Uploaded img");
  
      // Obtenez le chemin du fichier après le téléchargement
      const url = await getDownloadURL(imgRef);
      console.log("Image URL:", url);
  
      // Retournez l'URL de l'image pour l'utiliser dans le formulaire
      return url;
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handle submit reached");

    if (!currentUser) {
      console.log("Vous devez être connecté pour poster un livre.");
      return;
    }

    if (!title || !resume || !image || !tags || !content) {
      console.log("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    if (!image) {
      console.log("Veuillez sélectionner une image.");
      return;
    }

    try {
      // Attendre que l'image soit téléchargée
      const imageUrl = await uploadImg();

      // Maintenant imageUrl devrait être mis à jour
      await addDoc(bookRef, {
        title,
        resume,
        image: imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()),
        date: new Date(),
        content,
        like: 0,
        userId: currentUser.uid,
      });

      setTitle("");
      setResume("");
      setImage(null);
      setTags("");
      setContent("");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  return (
    <div>
      <h2>Poster un Livre</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Résumé:</label>
        <textarea
          placeholder="Résumé"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        ></textarea>

        <label>Image (URL):</label>
        {/* <input
          type="file"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /> */}

        <input
          type="file"
          name=""
          id=""
          onChange={(event) => {
            // Utilisez FileReader pour lire le contenu du fichier
            const selectedFile = event.target.files[0];

            // Mise à jour de l'état de l'image
            setImage(selectedFile);

            // Vous pouvez également afficher l'aperçu de l'image si nécessaire
            const reader = new FileReader();
            reader.onload = (e) => {
              // e.target.result contient l'URL de l'image en base64
              const imageUrl = e.target.result;
              console.log("Image Preview URL:", imageUrl);
            };
            reader.readAsDataURL(selectedFile);
          }}
        />

        <label>Tags (séparés par des virgules):</label>
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label>Contenu:</label>
        <input
          type="text"
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Poster le Livre</button>
      </form>
    </div>
  );
};

export default Post;
