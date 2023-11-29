import { useContext } from 'react';
import { UserContext } from "../../context/userContext.jsx";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../../db/firebase-config.jsx";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Private = () => {
  const [file, setFile] = useState(null);
  const [imgList, setImgList] = useState([]);
  const imgListRef = ref(storage, "images/");

  const { currentUser } = useContext(UserContext);

  const location = useLocation();
  if (!currentUser) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  const uploadImg = () => {
    if (file == null) return;

    const imgRef = ref(storage, `images/${file.name + v4()}`);

    uploadBytes(imgRef, file).then((snapshot) => {
      console.log("Uploaded img");
      getDownloadURL(snapshot.ref).then((url) => {
        setImgList((prev) => [...prev, url]);
      });
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    listAll(imgListRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImgList((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h5>Private</h5>
      <Outlet />

      <input
        type="file"
        name=""
        id=""
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
      />
      <button onClick={uploadImg}>Upload Img</button>

      {imgList.map((url) => (
        <img src={url} alt={url} key={url + v4()} />
      ))}
    </div>
  );
};

export default Private;
