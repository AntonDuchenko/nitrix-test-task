import { Grid2 } from "@mui/material";
import styles from "./AppartmentsList.module.scss";
import { AppartmentItem } from "./AppartmentsItem/AppartmentItem";
import { Appartment } from "../../../types";
import { useEffect, useState } from "react";

const CART_KEY = "favoritesAppartments";

interface AppatmentsListProps {
  appartments: Appartment[] | undefined;
}

export const AppartmentsList: React.FC<AppatmentsListProps> = ({
  appartments,
}) => {
  const [favorites, setFavorites] = useState<string[] | null>(null);

  useEffect(() => {
    const cart = localStorage.getItem(CART_KEY);
    setFavorites(cart ? JSON.parse(cart) : []);
  }, []);

  useEffect(() => {
    if (favorites) localStorage.setItem(CART_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Grid2
      className={styles.appartmentsList}
      container
      wrap="wrap"
      spacing={2}
      columns={{ xs: 1, sm: 8, md: 12 }}
    >
      {appartments?.map((appartment) => (
        <Grid2 key={appartment._id} size={{ xs: 1, sm: 4, md: 4, lg: 3 }}>
          <AppartmentItem
            item={appartment}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};
