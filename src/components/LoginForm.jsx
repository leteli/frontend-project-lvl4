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
import loginImage from '../../assets/login.jpg';
import useAuth from '../contexts/auth.jsx';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const inputRef = useRef();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm my-3">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="Войти" />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={yup.object({
                  username: yup.string()
                    .required('Это обязательное поле'), // i18n
                  password: yup.string()
                    .required('Это обязательное поле'),
                })}
                onSubmit={async (values) => {
                  setAuthFailed(false);
                  try {
                    const { data } = await axios.post(routes.loginPath(), values);
                    auth.logIn(data);
                    history.push('/');
                  } catch (err) {
                    setAuthFailed(true);
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
                  <FormikForm className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        isInvalid={authFailed || errors.username}
                        name="username"
                        id="username"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        {...getFieldProps('username')}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      {touched.username && errors.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        isInvalid={authFailed || (touched.password && errors.password)}
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Пароль"
                        autoComplete="password"
                        {...getFieldProps('password')}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      {touched.password && errors.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                      {authFailed ? <div className="invalid-tooltip">Неверное имя пользователя или пароль</div> : null}
                    </Form.Floating>
                    <Button disabled={isSubmitting} variant="outline-primary" className="w-100" type="submit">Войти</Button>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-2">Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
