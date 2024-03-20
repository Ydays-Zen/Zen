import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { firestore } from "../db/firebase-config";

const Script = () => {
  const fetchData = async () => {
    try {
      const booksRef = collection(firestore, "Books");

      const querySnapshot = await getDocs(booksRef);
      const booksData = [];

      for (const doc of querySnapshot.docs) {
        const bookData = doc.data();
        const bookUid = doc.id;

        const commentsRef = collection(firestore, "Comments");
        const bookCommentsQuery = query(
          commentsRef,
          where("bookUid", "==", bookUid)
        );
        const commentsSnapshot = await getDocs(bookCommentsQuery);

        const bookWithComments = {
          ...bookData,
          id: bookUid,
          comments: commentsSnapshot.docs.map((commentDoc) =>
            commentDoc.data()
          ),
        };

        booksData.push(bookWithComments);
      }

      //   setBooksList(booksData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>Script</h2>
      <p>Script</p>
    </div>
  );
};

export default Script;
