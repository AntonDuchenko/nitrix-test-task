import { Grid2, TextField } from "@mui/material";
import { AppartmentItem } from "./AppartmentsItem/AppartmentItem";
import { Appartment, SortEnum } from "../../../types";
import { useEffect, useMemo, useState } from "react";
import { SortSelect } from "../SortSelect/SortSelect";
import styles from "./AppartmentsList.module.scss";
import { useDebounce } from "../../../hooks/useDebounce";
import { useNavigate } from "react-router";
import qs from "qs";

const CART_KEY = "favoritesAppartments";

interface AppatmentsListProps {
  appartments: Appartment[] | undefined;
}

export const AppartmentsList: React.FC<AppatmentsListProps> = ({
  appartments,
}) => {
  const [favorites, setFavorites] = useState<string[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const debauncedQuery = useDebounce(query, 1000);
  const navigation = useNavigate();
  const searchParams = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const visibleList = useMemo(() => {
    if (appartments) {
      let filteredAppartments = [...appartments];

      if (debauncedQuery) {
        filteredAppartments = filteredAppartments?.filter((appartment) =>
          appartment.title.toLowerCase().includes(debauncedQuery.toLowerCase())
        );
      }

      if (sortDirection) {
        filteredAppartments = filteredAppartments?.sort((a, b) => {
          switch (sortDirection) {
            case SortEnum.Cheapest:
              return a.price - b.price;
            case SortEnum.Biggest:
              return b.rooms - a.rooms;
            case SortEnum.Alphabetically:
              return a.title.localeCompare(b.title);

            default:
              return 0;
          }
        });
      }

      return filteredAppartments;
    }
  }, [appartments, debauncedQuery, sortDirection]);

  useEffect(() => {
    const cart = localStorage.getItem(CART_KEY);
    setFavorites(cart ? JSON.parse(cart) : []);
  }, []);

  useEffect(() => {
    if (favorites) localStorage.setItem(CART_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const params = {
      sort: sortDirection ? sortDirection : null,
      query: query ? query : null,
    };

    const queryString = qs.stringify(params, {
      skipNulls: true,
    });

    navigation({ search: queryString });
  }, [query, navigation, sortDirection]);

  useEffect(() => {
    if (searchParams.sort) {
      setSortDirection(searchParams.sort as string);
    }

    if (searchParams.query) {
      setQuery(searchParams.query as string);
    }
  }, [searchParams.query, searchParams.sort]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className={styles.params}>
        <TextField
          id="outlined-basic"
          size="small"
          value={query}
          onChange={handleChange}
          sx={{ width: 260 }}
          label="Look for appartment"
          variant="outlined"
        />
        <SortSelect
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      <Grid2
        container
        wrap="wrap"
        spacing={2}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {visibleList &&
          visibleList?.length > 0 &&
          visibleList?.map((appartment) => (
            <Grid2 key={appartment._id} size={{ xs: 1, sm: 4, md: 4, lg: 3 }}>
              <AppartmentItem
                item={appartment}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </Grid2>
          ))}
      </Grid2>
    </>
  );
};
