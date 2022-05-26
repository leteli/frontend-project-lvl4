/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
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
import { toast } from 'react-toastify';

import routes from '../routes.js';
import loginImage from '../../assets/login.jpg';
import useAuth from '../contexts/auth.jsx';

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const history = useHistory();
  const inputRef = useRef();
  const { t } = useTranslation();

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
                    .required(t('errors.validation_errors.required')),
                  password: yup.string()
                    .required(t('errors.validation_errors.required')),
                })}
                onSubmit={async (values) => {
                  setAuthFailed(false);
                  try {
                    const { data } = await axios.post(routes.loginPath(), values);
                    auth.logIn(data);
                    history.push('/');
                  } catch (err) {
                    if (err.response.status === 401) {
                      setAuthFailed(true);
                    } else {
                      toast.error(t('errors.network_error'));
                    }
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
                    <h1 className="text-center mb-4">{t('login_page.header')}</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        isInvalid={authFailed || errors.username}
                        name="username"
                        id="username"
                        placeholder={t('login_page.username')}
                        autoComplete="username"
                        {...getFieldProps('username')}
                      />
                      <Form.Label htmlFor="username">{t('login_page.username')}</Form.Label>
                      {touched.username && errors.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                    </Form.Floating>
                    <Form.Floating className="mb-4">
                      <Form.Control
                        isInvalid={authFailed || (touched.password && errors.password)}
                        name="password"
                        id="password"
                        type="password"
                        placeholder={t('login_page.password')}
                        autoComplete="password"
                        {...getFieldProps('password')}
                      />
                      <Form.Label htmlFor="password">{t('login_page.password')}</Form.Label>
                      {touched.password && errors.password ? <div className="invalid-tooltip">{errors.password}</div> : null}
                      {authFailed ? <div className="invalid-tooltip">{t('errors.login_auth_error')}</div> : null}
                    </Form.Floating>
                    <Button disabled={isSubmitting} variant="outline-primary" className="w-100" type="submit">{t('login_page.login_button')}</Button>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span className="me-2">{t('login_page.footer_text')}</span>
                <a href="/signup">{t('login_page.footer_signup_link')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
