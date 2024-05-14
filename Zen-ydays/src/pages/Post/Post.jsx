import { addDoc, collection } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import AvatarEditor from "react-avatar-editor";

import { UserContext } from "../../context/userContext.jsx";
import { firestore, storage } from "../../db/firebase-config.jsx";
import "./post.css";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import HeaderAll from "../../layout/HeaderAll";

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [imageUrl] = useState("");
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
    const [validation, setValidation] = useState("");

    const handleScaleChange = (e) => {
      const newScale = parseFloat(e.target.value);
      setScale(newScale);
    };

    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    };

    const handleSave = async (e) => {
      e.preventDefault();
      if (!editor) return;

      const canvas = editor.getImage();
      const imgBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg"); // Spécifiez le type MIME de l'image
      });

      // Mettre à jour l'état de l'image avec le nouveau Blob
      setImage(imgBlob);
    };

    const bookRef = collection(firestore, "Books");

    const uploadImg = async () => {
      if (!image) return "";

      const imgRef = ref(
        storage,
        `images/${currentUser.uid}/${image.name + v4()}`
      );

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

    useEffect(() => {
      console.log("Nouvelle URL dans useEffect :", imageUrl);
    }, [imageUrl]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Handle submit reached");
      setValidation("");

      if (!currentUser) {
        console.log("Vous devez être connecté pour poster un livre.");
        setValidation("Vous devez être connecté pour poster un livre.");
        return;
      }

      if (!title || !resume || !image || !tags || !content) {
        console.log("Veuillez remplir tous les champs du formulaire.");
        setValidation("Veuillez remplir tous les champs du formulaire.");
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
        <HeaderAll />
        <div className="body_post">
          <h2>Poster un Livre</h2>
          <form>
            <div>
              <label>Titre:</label>
              <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Résumé:</label>
              <textarea
                placeholder="Résumé"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Contenu:</label>
              {/* <input
                type="text"
                placeholder="Contenu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              /> */}
              <textarea
                placeholder="Contenu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div>
              {" "}
              <label>Image (URL):</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image && (
                <div>
                  <AvatarEditor
                    ref={(ed) => setEditor(ed)}
                    image={image}
                    width={150}
                    height={200}
                    border={20}
                    scale={scale}
                    onZoomChange={handleScaleChange}
                    style={{ backgroundColor: "white" }}
                  />

                  <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.01"
                    value={scale}
                    onChange={handleScaleChange}
                  />
                  <button onClick={handleSave}>Enregistrer</button>
                </div>
              )}
            </div>

            <div>
              <label>Tags:</label>
              <select value={tags} onChange={(e) => setTags(e.target.value)}>
                <option value="">Choisir un tag</option>
                <option value="Fiction">Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Horreur">Horreur</option>
                <option value="aventure">Aventure</option>
                <option value="Drame">Drame</option>
                <option value="Comédie">Comédie</option>
              </select>
            </div>

            <p>{validation}</p>

            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                marginTop: "20px",
              }}
            >
              Poster le Livre
            </button>
          </form>
        </div>

        {/* Aperçu du livre  
      <div className="book-preview">
        <h2>Aperçu du Livre</h2>
        {preview && (
          <div>
            <h3>{preview.title}</h3>
            <p>{preview.resume}</p>
            <img src={preview.imageUrl} alt="Aperçu du livre"/>
            <p>{preview.tags.join(", ")}</p>

          </div>
        )}

    </div>*/}
      </div>
    );
};

export default Post;
