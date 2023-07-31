import { getIn } from "formik";

export const getFormikError = (formik: any, field: string) => {
  return getIn(formik.errors, field);
};

export const hasFormikError = (formik: any, field: string) => {
  return Boolean(getIn(formik, field) && getIn(formik.touched, field));
};
