import { Loader } from "../../components/Loader/Loader";
import ImageEnum from "../../ImageEnum";
import { useGetAppartmentsQuery } from "../../services/appartments";
import styles from "./Appartments.module.scss";
import { AppartmentsList } from "./AppartmentsList/AppartmentsList";

export const AppartmentsPage = () => {
  const { data, isLoading } = useGetAppartmentsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data && data?.length > 0 ? (
        <AppartmentsList appartments={data} />
      ) : (
        <img
          src={ImageEnum.EmptyList}
          alt="Empty list image"
          className={styles.emptyImage}
        />
      )}
    </>
  );
};
