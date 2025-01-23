import { Loader } from "../../components/Loader/Loader";
import { useGetAppartmentsQuery } from "../../services/appartments";
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
        "No appartments"
      )}
    </>
  );
};
