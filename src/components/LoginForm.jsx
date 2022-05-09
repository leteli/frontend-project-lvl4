/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LoginForm = () => (
  <>
    <h1>Войти</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={yup.object({
        username: yup.string()
          .required(),
        password: yup.string()
          .required(),
      })}
      onSubmit={() => {}}
    >
      <Form>
        <TextInput
          label="Username"
          name="username"
          type="text"
          placeholder="Ваш ник"
        />
        <TextInput
          label="Password"
          name="password"
          type="text"
          placeholder="Пароль"
        />

        <button type="submit">Войти</button>
      </Form>
    </Formik>
  </>
);

export default LoginForm;
