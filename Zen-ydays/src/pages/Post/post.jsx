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
    if (!image) return;

    const imgRef = ref(
      storage,
      `images/${currentUser.uid}/${image.name + v4()}`
    );

    try {
      await uploadBytes(imgRef, image);
      console.log("Uploaded img");

      // Obtenez le chemin du fichier après le téléchargement
      const url = await getDownloadURL(imgRef);

      // Mettez à jour l'URL de l'image avec un callback
      setImageUrl((prevUrl) => {
        console.log("Updated Image URL:", url);
        return url;
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image :", error);
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
      await uploadImg();

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
      setImageUrl("");
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
            setImage(event.target.files[0]);
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
