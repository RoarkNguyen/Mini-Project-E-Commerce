import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

AddressForm.propTypes = {};

function AddressForm(props) {
  const { checkoutToken, next } = props;
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const form = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));
  console.log("aaaaaaaaaaaaaaa", options);
  console.log("shippingCountries", shippingCountries);
  console.log("shippingCountry", shippingCountry);
  console.log("shippingSubdivisions", shippingSubdivisions);
  console.log("shippingSubdivision", shippingSubdivision);
  console.log("shippingOptions", shippingOptions);
  console.log("shippingOption", shippingOption);

  //////// Fetch DATA on commerce
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    // setShippingCountries(Object.keys(countries)[0]); //// I don't understand and undergo :)))))))
  };
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    console.log("dit cu ban kho vcl", subdivisions);
    setShippingSubdivisions(subdivisions);
    // setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  ///////////// USE Effect
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput form={form} name="firstName" label="First Name" />
            <FormInput form={form} name="lastName" label="Last Name" />
            <FormInput form={form} name="address1" label="Address" />
            <FormInput form={form} name="email" label="Email" />
            <FormInput form={form} name="city" label="City" />
            <FormInput
              required
              form={form}
              name="zip"
              label="ZIP / Postal code"
            />
            {/* /////////////   Country  */}
            <Grid>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([code, name]) => ({ id: code, label: name }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>

            {/* ///////////  Subdivisions  */}
            <Grid>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                defaultValue=""
                value={shippingSubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.length &&
                  subdivisions.map((subdivision) => (
                    <MenuItem key={subdivision.id} value={subdivision.id}>
                      {subdivision.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            {/* ///////////  Subdivisions  */}
            <Grid>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((sO) => ({
                    id: sO.id,
                    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} variant="outlined" to="/cart">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default AddressForm;
