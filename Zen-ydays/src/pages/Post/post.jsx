import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import { firestore } from '../../db/firebase-config.jsx';
import { collection, addDoc } from 'firebase/firestore';




const Post = () => {
  const { currentUser } = useContext(UserContext); // Utilisez le contexte d'authentification pour obtenir l'utilisateur connecté
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Déplacez cette déclaration ici
  const [resume, setResume] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  const bookRef = collection(firestore, "Books");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si l'utilisateur est connecté
    if (!currentUser) {
      console.log('Vous devez être connecté pour poster un livre.');
      return;
    }

    //valider les champs du formulaire ici
    if (!title || !resume || !image || !tags || !content) {
      console.log('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    // Enregistrez le livre dans la collection 'books'
    await addDoc(bookRef, {
      title,
      resume,
      image,
      tags: tags.split(',').map(tag => tag.trim()), // Convertit les tags en tableau
      date: new Date(),
      content,
      like: 0, // Initialiser le nombre de likes à 0
      userId: currentUser.uid, // Enregistrez l'ID de l'utilisateur connecté
    });

    // Effacez les champs du formulaire après la soumission
    setTitle('');
    setResume('');
    setImage('');
    setTags('');
    setContent('');
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
        <input
          type="text"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
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