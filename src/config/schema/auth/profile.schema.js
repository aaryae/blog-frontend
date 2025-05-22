import * as yup from 'yup'

export const updateProfileSchema = yup.object().shape({
  firstname: yup.string().required('First name is required').min(2, 'Too short!'),
  lastname: yup.string().required('Last name is required').min(2, 'Too short!'),
  contactNumber: yup.string().required('Contact number is required'),
  address: yup.string().required('Address is required'),
  description: yup.string().max(250, 'Description must be at most 250 characters'),
})

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup.string().required('New password is required').min(6, 'Min 6 chars'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Confirm password is required'),
})
