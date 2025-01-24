import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./SortSelect.module.scss";
import { SortEnum } from "../../../types";

interface SortSelectProps {
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  sortDirection,
  setSortDirection,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof sortDirection>) => {
    const {
      target: { value },
    } = event;
    setSortDirection(value);
  };
  const sort = [SortEnum.Cheapest, SortEnum.Biggest, SortEnum.Alphabetically];

  return (
    <FormControl fullWidth size="small" sx={{ width: 260, marginBottom: 2 }}>
      <InputLabel id="demo-simple-select-label">Sort</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortDirection}
        label="Sort"
        className={styles.item}
        onChange={handleChange}
      >
        {sort.map((item) => (
          <MenuItem key={item} className={styles.item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
