import { NavLink } from "react-router";
import styles from "./Header.module.scss";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Button } from "@mui/material";

export const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <AddHomeIcon className={styles.logoIcon} />
        Nitrix rent
      </NavLink>

      <Button variant="contained">Add appartment</Button>
    </div>
  );
};
