import { useFormik } from "formik";
import { DeliveryDataInfo } from "../../../../data/collections/deliveryData";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { CSSProperties } from "react";
import PaymentPopup from "../PaymentPopUp";
import { useNavigate } from "react-router-dom";

interface Props {
  deliveryInfo: DeliveryDataInfo;
  setDeliveryInfo: any;
  paymentModalOpen: boolean;
  setPaymentModal: any;
}

const validationSchema = yup.object({
  // number: yup.number().required("Please enter number").min(10),
  number: yup
    .string()
    .typeError("Not a valid phone number. Example: 0738986845")
    .max(10, "Not a valid phone number. Example: 0738986845")
    .matches(/([0-9]{10})/, "Not a valid phone number. Example: 0738986845")
    .required("Phone number date is required"),
});

function Swish(props: Props) {
  const navigate = useNavigate();

  const closeModal = () =>
    setTimeout(() => {
      props.setPaymentModal(false);
      navigate("/PurchaseComplete");
    }, 5000);
  const formik = useFormik({
    initialValues: {
      number: props.deliveryInfo.number,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));

      let newObject = props.deliveryInfo;
      newObject.paymentMethod = "Swish";
      props.setDeliveryInfo(newObject);
      console.log(props.deliveryInfo);
      props.setPaymentModal(true);
      console.log(props.paymentModalOpen);
      closeModal();
      
    },
  });
  return (
    <div style={swishForm}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={textFieldStyle}
          fullWidth
          id="number"
          name="number"
          label="Phone Number"
          value={formik.values.number}
          onChange={formik.handleChange}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
        />
        <Button
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Complete purchase
        </Button>
      </form>
    </div>
  );
}

export default Swish;

const swishForm: CSSProperties = {
  width: "30%",
};

const textFieldStyle: CSSProperties = {
  marginBottom: "1rem",
};
