import React from "react";
import PropTypes from "prop-types";
import { Grid, useFormControl } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";

FormInput.propTypes = {};

function FormInput(props) {
  const { form, name, label, required } = props;
  const { errors, formState } = form;

  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        // control={form.control}  // OR use this way or add {...form} into the FormProvider of React-Hooks-Form

        as={TextField}
        //Under will use for TextField of Material-UI
        name={name}
        label={label}
        required={required}
        fullWidth
      ></Controller>
    </Grid>
  );
}

export default FormInput;
