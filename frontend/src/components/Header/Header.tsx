import { Logo } from "../Logo/Logo";
import styles from "./Header.module.scss";

import { Button } from "@mui/material";

export const Header = () => {
  return (
    <div className={styles.header}>
      <Logo />

      <Button variant="contained">Add appartment</Button>
    </div>
  );
};
