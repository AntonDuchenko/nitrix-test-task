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
import { useEffect, useState } from "react";
import { toastSuccess } from "../../../utils/toastSuccess";
import { toastError } from "../../../utils/toastError";
import ImageEnum from "../../../ImageEnum";
import classNames from "classnames";

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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
    setFile(null);
    setPreview(null);

    if (editingAppartment) {
      dispatch(setEditingAppartment(null));
    }
  };

  const handleOnSubmit = async (data: IFormInput) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("rooms", data.rooms.toString());

    if (file) {
      formData.append("image", file);
    }

    console.log(formData);

    if (editingAppartment) {
      formData.append("_id", editingAppartment._id);

      await updateAppartment(formData).unwrap();
      toastSuccess("Appartment edited successfully");
    } else {
      await createAppartment(formData).unwrap();

      if (error) {
        toastError("Something went wrong. Please try again later.");
      }

      toastSuccess("Appartment created successfully");
    }
    handleOnClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
    }
  };

  return (
    <Modal open={open || !!editingAppartment}>
      <div className={styles.modal}>
        <div className={styles.title}>
          {editingAppartment ? "Edit" : "Create"} appartment
        </div>

        <CloseIcon onClick={handleOnClose} className={styles.closeIcon} />

        <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
          <div className={styles.addIcon}>
            <input
              type="file"
              accept="image/*"
              className={styles.addInput}
              onChange={handleFileChange}
            />
            <img
              src={preview ? preview : ImageEnum.AddIcon}
              className={classNames({
                [styles.image]: preview,
              })}
            />
          </div>
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
