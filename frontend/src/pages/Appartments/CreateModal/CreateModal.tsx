import Modal from "@mui/material/Modal";
import styles from "./CreateModal.module.scss";
import { Controller, useForm } from "react-hook-form";
import { IFormInput } from "../../../types";
import {
  useCreateAppartmentMutation,
  useUpdateAppartmentMutation,
} from "../../../services/appartments";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { setEditingAppartment } from "../../../components/features/editingAppartment";
import { useEffect } from "react";
import { toastSuccess } from "../../../utils/toastSuccess";
import { toastError } from "../../../utils/toastError";

interface CreaeteModalProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreaeteModal: React.FC<CreaeteModalProps> = ({
  open,
  setIsOpen,
}) => {
  const [createAppartment, { isLoading, error }] =
    useCreateAppartmentMutation();
  const [updateAppartment, { isLoading: isLoadingUpdate }] =
    useUpdateAppartmentMutation();
  const editingAppartment = useAppSelector(
    (state) => state.appartment.editingAppartment
  );
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      rooms: 0,
    },
  });

  useEffect(() => {
    if (editingAppartment) {
      setValue("title", editingAppartment.title);
      setValue("description", editingAppartment.description);
      setValue("price", editingAppartment.price);
      setValue("rooms", editingAppartment.rooms);
    }
  }, [editingAppartment]);

  const handleOnClose = () => {
    reset();
    setIsOpen(false);

    if (editingAppartment) {
      dispatch(setEditingAppartment(null));
    }
  };

  const handleOnSubmit = async (data: IFormInput) => {
    if (editingAppartment) {
      await updateAppartment({
        _id: editingAppartment._id,
        title: data.title,
        description: data.description,
        price: data.price,
        rooms: data.rooms,
      }).unwrap();
      toastSuccess("Appartment edited successfully");
    } else {
      await createAppartment({
        title: data.title,
        description: data.description,
        price: data.price,
        rooms: data.rooms,
      }).unwrap();

      if (error) {
        toastError("Something went wrong. Please try again later.");
      }

      toastSuccess("Appartment created successfully");
    }
    handleOnClose();
  };

  return (
    <Modal open={open || !!editingAppartment}>
      <div className={styles.modal}>
        <div className={styles.title}>
          {editingAppartment ? "Edit" : "Create"} appartment
        </div>

        <CloseIcon onClick={handleOnClose} className={styles.closeIcon} />

        <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <TextField
            fullWidth
            error={!!errors.title}
            label="Appartment name"
            variant="standard"
            {...register("title", {
              required: "Title is required",
              setValueAs: (value) => value.trim(),
              maxLength: {
                value: 90,
                message: "Title cannot exceed 90 characters",
              },
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long",
              },
            })}
            helperText={errors.title?.message}
          />

          <TextField
            fullWidth
            type="text"
            error={!!errors.description}
            label="Description"
            variant="standard"
            maxRows={4}
            {...register("description", {
              required: "Description is required",
              setValueAs: (value) => value.trim(),
              maxLength: {
                value: 335,
                message: "Title cannot exceed 335 characters",
              },
              minLength: {
                value: 10,
                message: "Title must be at least 10 characters long",
              },
            })}
            helperText={errors.description?.message}
          />

          <TextField
            error={!!errors.price}
            type="number"
            variant="standard"
            label="Price"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 100,
                message: "Price must be at least 100",
              },
            })}
            helperText={errors.price?.message}
          />

          <FormControl error={!!errors.rooms}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Rooms count
            </FormLabel>
            <Controller
              name="rooms"
              control={control}
              rules={{ required: "Rooms count is required" }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                </RadioGroup>
              )}
            />
            {errors.rooms && (
              <FormHelperText>{errors.rooms.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            disabled={isLoading || isLoadingUpdate}
            variant="contained"
            type="submit"
          >
            {editingAppartment ? "Save" : "Create"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
