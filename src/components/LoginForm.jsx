/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';

import routes from '../routes.js';
import loginImage from '../../assets/login.jpg';
import useAuth from '../contexts/auth.jsx';
import { actions } from '../slices/usersSlice.js';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();

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
                    localStorage.setItem('userId', JSON.stringify(data));
                    dispatch(actions.addUser(data.username));
                    auth.logIn();
                    console.log('success');
                    history.push('/');
                  } catch (err) {
                    setAuthFailed(true);
                    console.log(err.message); // debug
                  }
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <TextInput
                      className={cn('form-control', {
                        'is-invalid': authFailed,
                      })}
                      label="Ваш ник"
                      name="username"
                      type="text"
                      placeholder="Ваш ник"
                    />
                  </div>
                  <div className="form-floating mb-4">
                    <TextInput
                      className={cn('form-control', {
                        'is-invalid': authFailed,
                      })}
                      label="Пароль"
                      name="password"
                      type="text"
                      placeholder="Пароль"
                    />
                    <div className="invalid-feedback">Неверное имя пользователя или пароль</div>
                  </div>
                  <Button variant="outline-primary" className="w-100" type="submit">Войти</Button>
                </Form>
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
