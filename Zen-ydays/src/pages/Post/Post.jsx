import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { v4 } from "uuid";
import Menu from "../../components/Menu.jsx";
import Nav from "../../components/Nav.jsx";
import NavBar from "../../components/NavBar.jsx";
import { UserContext } from "../../context/userContext.jsx";
import { firestore, storage } from "../../db/firebase-config.jsx";
import "./post.css";

const Post = () => {
  const { currentUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);

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
      canvas.toBlob(resolve, "image/jpeg"); // Specify the MIME type of the image
    });

    // Update the image state with the new Blob
    setImage(imgBlob);
  };

  const bookRef = collection(firestore, "Books");

  const uploadImg = async () => {
    if (!image) return "";

    const imgRef = storage.ref(
      `images/${currentUser.uid}/${image.name + v4()}`
    );

    try {
      await imgRef.put(image);
      console.log("Uploaded img");

      // Get the file path after upload
      const url = await imgRef.getDownloadURL();
      console.log("Image URL:", url);

      // Return the image URL to use in the form
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.log("You must be logged in to post a book.");
      return;
    }

    if (!title || !resume || !image || !tags || !content) {
      console.log("Please fill out all form fields.");
      return;
    }

    try {
      // Wait for image to be uploaded
      const imageUrl = await uploadImg();

      // Now imageUrl should be updated
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
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Nav />
      <Menu />
      <NavBar />
      <div className="body_post">
        <div className="post">
          <header className="Head_post">
            <h2>Post</h2>
            <p>Get started and write your own story!</p>
          </header>
          <hr />
          <form onSubmit={handleSubmit} className="formulaire_post">
            <label>Titre:</label>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Tags:</label>
            <select value={tags} onChange={(e) => setTags(e.target.value)}>
              <option value="">Catégorie</option>
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Horreur">Horreur</option>
              <option value="Aventure">Aventure</option>
              <option value="Drame">Drame</option>
              <option value="Comédie">Comédie</option>
            </select>

            <label>Image (URL):</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
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
                />
              </div>
            )}

            <label>Résumé:</label>
            <textarea
              placeholder="Résumé"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            ></textarea>

            <label>Contenu:</label>
            <textarea
              type="text"
              placeholder="Contenu"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button type="submit" className="btn_post_book">
              Poster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
