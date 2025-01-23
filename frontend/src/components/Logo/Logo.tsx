import { NavLink } from "react-router";
import AddHomeIcon from "@mui/icons-material/AddHome";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <NavLink to="/" className={styles.logo}>
      <AddHomeIcon className={styles.logoIcon} />
      Nitrix rent
    </NavLink>
  );
};
