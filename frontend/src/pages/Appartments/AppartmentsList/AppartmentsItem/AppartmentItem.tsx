import { Appartment } from "../../../../types";
import styles from "./AppartmentsItem.module.scss";
import BedIcon from "@mui/icons-material/Bed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDeleteAppartmentMutation } from "../../../../services/appartments";
import { useAppDispatch } from "../../../../app/reduxHooks";
import { setEditingAppartment } from "../../../../components/features/editingAppartment";
import { toastError } from "../../../../utils/toastError";
import { toastSuccess } from "../../../../utils/toastSuccess";

interface AppartmentItemProps {
  setFavorites: React.Dispatch<React.SetStateAction<string[] | null>>;
  favorites: string[] | null;
  item: Appartment;
}

export const AppartmentItem: React.FC<AppartmentItemProps> = ({
  item,
  favorites,
  setFavorites,
}) => {
  const { _id, title, description, price, rooms, photo_url } = item;
  const [deleteAppartment, { error }] = useDeleteAppartmentMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await deleteAppartment(_id).unwrap();

    if (error) {
      toastError("Something went wrong. Please try again later.");
    }

    toastSuccess("Appartment deleted successfully");
  };

  const handleEdit = () => {
    dispatch(setEditingAppartment(item));
  };

  const handleFavorite = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setFavorites((favorites) => {
      if (favorites) {
        if (favorites?.includes(_id)) {
          return favorites.filter((id) => id !== _id);
        } else {
          return [...favorites, _id];
        }
      } else {
        return [_id];
      }
    });
  };

  return (
    <div className={styles.appartmentItem}>
      {favorites?.includes(_id) ? (
        <FavoriteIcon
          onClick={handleFavorite}
          className={styles.favoriteIcon}
        />
      ) : (
        <FavoriteBorderOutlinedIcon
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
        <ModeEditIcon
          onClick={handleEdit}
          className={styles.editIcon}
          fontSize="large"
        />
        <DeleteForeverOutlinedIcon
          sx={{
            color: "red",
          }}
          onClick={handleDelete}
          fontSize="large"
          className={styles.deleteIcon}
        />
      </div>
    </div>
  );
};
