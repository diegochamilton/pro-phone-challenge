import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import styles from "./imageDescription.module.scss";
import { useParams } from "react-router-dom";
import { apiKey } from "../../config";
import {
  BiCommentDetail as Comment,
  BiLike as Like,
  BiUserCircle as User,
  BiDownload as Download,
} from "react-icons/bi";
import { AiOutlineEye as View } from "react-icons/ai";

const ImageDescription = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const publicFields = ["user", "views", "comments", "downloads", "likes"];

  const icons = {
    user: <User className={styles.icon} />,
    views: <View className={styles.icon} />,
    comments: <Comment className={styles.icon} />,
    downloads: <Download className={styles.icon} />,
    likes: <Like className={styles.icon} />,
  };

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=${apiKey}&id=${id}`)
      .then(({ data }) => {
        setImage(data.hits[0]);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((err) => {
        setError("Oops, something went wrong. :(");
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      {error && !image && <span>{error}</span>}
      <div className={styles.content}>
        <img src={image.webformatURL} className={styles.photo} />
        <div className={styles.details}>
          {publicFields.map((field, i) => {
            return (
              <div key={i} className={styles.field}>
                {icons[field]}
                <div className={styles.info}>{image[field]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageDescription;
