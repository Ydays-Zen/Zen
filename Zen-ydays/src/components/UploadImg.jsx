// import { useState, useEffect } from "react";
// import { storage } from "../db/firebase-config.jsx";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid";
// import { UserContext } from "../context/userContext.jsx";
// import { useContext } from "react";

// const UploadImg = () => {
//   const { currentUser } = useContext(UserContext);

//   const [file, setFile] = useState(null);
//   // const [imgList, setImgList] = useState([]);
//   const setImgList = useState([]);

//   const uploadImg = () => {
//     if (file == null) return;

//     const imgRef = ref(
//       storage,
//       `images/${currentUser.uid}/${file.name + v4()}`
//     );

//     uploadBytes(imgRef, file).then((snapshot) => {
//       console.log("Uploaded img");
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImgList((prev) => [...prev, url]);
//       });
//     });
//   };

//   // useEffect(() => {
//   //   if (!currentUser) return;

//   //   const userImgListRef = ref(storage, `images/${currentUser.uid}/`);

//   //   listAll(userImgListRef).then((res) => {
//   //     res.items.forEach((itemRef) => {
//   //       getDownloadURL(itemRef).then((url) => {
//   //         setImgList((prev) => [...prev, url]);
//   //       });
//   //     });
//   //   });
//   // }, [currentUser]);

//   return (
//     <div>
//       <input
//         type="file"
//         name=""
//         id=""
//         onChange={(event) => {
//           setFile(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadImg}>Upload Img</button>

//       {/* {imgList.length > 0 ? (
//         [...new Set(imgList)].map((img, index) => (
//           <img src={img} alt="" key={index} />
//         ))
//       ) : (
//         <h1>No images</h1>
//       )} */}
//     </div>
//   );
// };

// export default UploadImg;