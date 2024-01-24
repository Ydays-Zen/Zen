import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { firestore } from "../db/firebase-config";
import "./styles/category.css";

const btnValue = "";

const Category = () => {
  const { setBtnValue } = useCategory();
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
  }, []);

  const handleClick = (tags) => {
    // Utilisez setBtnValue pour mettre à jour la valeur dans le contexte
    setBtnValue(tags);
  };

  return (
    <>
      <div className="category">
        <div>
          <h2>Category</h2>

          {categories.map((category) => (
            <div className="categoryButton" key={category.id}>
              <button
                onClick={() => handleClick(category.tags)}
                id={category.tags}
              >
                {category.tags}
              </button>
            </div>
          ))}
          <p>{btnValue}</p>
        </div>
      </div>
    </>
  );
};

export default Category;
