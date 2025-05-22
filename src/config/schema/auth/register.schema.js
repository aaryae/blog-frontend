import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  contactNumber: yup.string().required('Contact number is required'),
  address: yup.string().required('Address is required'),
  description: yup.string().max(250, 'Max 250 characters'),
  acceptTerms: yup.bool().oneOf([true], 'You must accept the terms'),
});
