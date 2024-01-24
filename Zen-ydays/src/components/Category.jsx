import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../db/firebase-config";
import { useState, useEffect } from "react";
import "./styles/category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRef = collection(firestore, "Category");
        const querySnapshot = await getDocs(categoryRef);

        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []); // Le tableau de dépendances vide assure que le code s'exécute une seule fois après le montage

  return (
    <>
      {/* <img className="logo" src="../../public/logo_zen.png" alt="Logo" /> */}

      <div className="category">
        <div>
          <h2>Category</h2>

          {categories.map((category) => (
            <div className="categoryButton" key={category.id}>
              <button> {category.tags}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
