/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from 'react-bootstrap';

import routes from '../routes.js';
import signupImage from '../../assets/signup.jpg';
import useAuth from '../contexts/auth.jsx';

const SignupForm = () => {
  const inputRef = useRef();
  const [signupFailed, setSignupFailed] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row p-5 justify-content-around align-items-center">
              <div>
                <img src={signupImage} className="rounded-circle" alt="Регистрация" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={yup.object({
                  username: yup.string()
                    .required('Обязательное поле')
                    .min(3, 'От 3 до 20 символов')
                    .max(20, 'От 3 до 20 символов'),
                  password: yup.string()
                    .required('Обязательное поле')
                    .min(6, 'Не менее 6 символов'),
                  confirmPassword: yup.string()
                    .required('Обязательное поле')
                    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
                })}
                onSubmit={async (values) => {
                  setSignupFailed(false);
                  try {
                    const { data } = await axios.post(routes.signupPath(), values);
                    auth.logIn(data);
                    history.push('/');
                  } catch (err) {
                    setSignupFailed(true);
                    console.log(err.message);
                  }
                }}
              >
                {({
                  touched,
                  errors,
                  getFieldProps,
                  isSubmitting,
                }) => (
                  <FormikForm className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        isInvalid={signupFailed || errors.username}
                        name="username"
                        id="username"
                        placeholder="От 3 до 20 символов"
                        autoComplete="username"
                        {...getFieldProps('username')}
                      />
                      <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                      {touched.username && errors.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        isInvalid={signupFailed || (touched.password && errors.password)}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Не менее 6 символов"
                        autoComplete="new-password"
                        {...getFieldProps('password')}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      {touched.password && errors.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        isInvalid={
                          signupFailed || (touched.confirmPassword && errors.confirmPassword)
                        }
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        placeholder="Пароли должны совпадать"
                        autoComplete="new-password"
                        {...getFieldProps('confirmPassword')}
                      />
                      <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                      {touched.confirmPassword && errors.confirmPassword ? <div className="error invalid-tooltip">{errors.confirmPassword}</div> : null}
                      {signupFailed ? <div className="invalid-tooltip">Такой пользователь уже существует</div> : null}
                    </Form.Floating>
                    <Button disabled={isSubmitting} variant="outline-primary" className="w-100" type="submit">Зарегистрироваться</Button>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;