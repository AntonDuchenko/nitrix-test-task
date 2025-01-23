import { Grid2 } from "@mui/material";
import styles from "./AppartmentsList.module.scss";
import { AppartmentItem } from "./AppartmentsItem/AppartmentItem";
import { Appartment } from "../../../types";

interface AppatmentsListProps {
  appartments: Appartment[] | undefined;
}

export const AppartmentsList: React.FC<AppatmentsListProps> = ({
  appartments,
}) => {
  return (
    <Grid2 className={styles.appartmentsList} container wrap="wrap" spacing={2} columns={{ xs: 1, sm: 8, md: 12 }}>
      {appartments?.map((appartment) => (
        <Grid2 key={appartment.id} size={{ xs: 1, sm: 4, md: 4, lg: 3 }}>
          <AppartmentItem item={appartment} />
        </Grid2>
      ))}
    </Grid2>
  );
};
