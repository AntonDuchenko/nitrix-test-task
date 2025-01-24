import { useState } from "react";
import { Logo } from "../Logo/Logo";
import styles from "./Header.module.scss";

import { Button } from "@mui/material";
import { CreaeteModal } from "../../pages/Appartments/CreateModal/CreateModal";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <Button onClick={handleOpen} variant="contained">
          Add appartment
        </Button>

        <CreaeteModal open={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
