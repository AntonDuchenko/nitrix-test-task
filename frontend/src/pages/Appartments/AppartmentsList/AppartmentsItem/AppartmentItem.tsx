import { Appartment } from "../../../../types";
import styles from "./AppartmentsItem.module.scss";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";

interface AppartmentItemProps {
  item: Appartment;
}

export const AppartmentItem: React.FC<AppartmentItemProps> = ({ item }) => {
  const { title, description, price, rooms, photo_url } = item;

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.appartmentItem}>
      {isFavorite ? (
        <FavoriteIcon
          onClick={handleFavorite}
          type="button"
          className={styles.favoriteIcon}
        />
      ) : (
        <FavoriteBorderOutlinedIcon
          type="button"
          onClick={handleFavorite}
          className={styles.favoriteIcon}
        />
      )}

      {photo_url ? (
        <img src={photo_url} alt="" />
      ) : (
        <div className={styles.image}></div>
      )}

      <span className={styles.price}>${price}/month</span>
      <span className={styles.title}>{title}</span>

      <p className={styles.description}>{description}</p>

      <span className={styles.rooms}>
        <BedIcon
          sx={{
            color: "#ffffff",
          }}
          className={styles.bedIcon}
        />
        {rooms} rooms
      </span>

      <div className={styles.actions}>
        <ModeEditIcon className={styles.editIcon} fontSize="large" type="button" />
        <DeleteForeverOutlinedIcon
          sx={{
            color: "red",
          }}
          type="button"
          fontSize="large"
          className={styles.deleteIcon}
        />
      </div>
    </div>
  );
};
