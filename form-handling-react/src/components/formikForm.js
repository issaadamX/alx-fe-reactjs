import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const onSubmit = (values, { resetForm }) => {
    alert('Registration successful!');
    resetForm();
  };

  return (
    <div>
      <h2>User Registration with Formik</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
