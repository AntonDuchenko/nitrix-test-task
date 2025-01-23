import { Button } from "@mui/material";
import {
  useCreateAppartmentMutation,
  useDeleteAppartmentMutation,
  useGetAppartmentsQuery,
  useUpdateAppartmentMutation,
} from "../../services/appartments";
import styles from "./Appartments.module.scss";

export const AppartmentsPage = () => {
  const [createAppartment] = useCreateAppartmentMutation();
  const [deleteAppartment] = useDeleteAppartmentMutation();
  const [updateAppartment] = useUpdateAppartmentMutation();

  const { data, isLoading } = useGetAppartmentsQuery();

  const handleOnSubmit = async () => {
    await createAppartment({
      title: "test23235",
      description: "test124324235",
      price: 10004,
      rooms: 3,
    }).unwrap();
  };

  const handleOnUpdate = async () => {
    if (data) {
      await updateAppartment({
        ...data[0],
        title: "new title",
        price: 1234124,
      }).unwrap();
    }
  };

  const handleOnDelete = async () => {
    if (data) {
      await deleteAppartment(data[0].id).unwrap();
    }
  };

  return (
    <div className={styles.appartments}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {/* <Button onClick={handleOnSubmit}>Add appartment</Button>
          <Button onClick={handleOnDelete}>Delete appartment</Button>
          <Button onClick={handleOnUpdate}>Update appartment</Button> */}
          {/* {data?.map((appartment) => (
            <div key={appartment.id}>{appartment.title}</div>
          ))} */}
        </>
      )}
    </div>
  );
};
