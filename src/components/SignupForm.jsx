/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

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
import { authContext } from '../contexts/getContexts.js';

const SignupForm = () => {
  const inputRef = useRef();
  const [signupFailed, setSignupFailed] = useState(false);
  const auth = useContext(authContext);
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => inputRef.current.focus(), []);

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row p-5 justify-content-around align-items-center">
              <div>
                <img src={signupImage} className="rounded-circle" alt={t('signup_page.header')} />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={yup.object({
                  username: yup.string()
                    .required(t('errors.validation_errors.required'))
                    .min(3, t('errors.validation_errors.username_min_max'))
                    .max(20, t('errors.validation_errors.username_min_max')),
                  password: yup.string()
                    .required(t('errors.validation_errors.required'))
                    .min(6, t('errors.validation_errors.password_min')),
                  confirmPassword: yup.string()
                    .required(t('errors.validation_errors.required'))
                    .oneOf([yup.ref('password')], t('errors.validation_errors.password_match')),
                })}
                onSubmit={async (values) => {
                  setSignupFailed(false);
                  try {
                    const { data } = await axios.post(routes.signupPath(), values);
                    auth.logIn(data);
                    history.push(routes.root);
                  } catch (err) {
                    if (err.response.status === 409) {
                      setSignupFailed(true);
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
                  <FormikForm className="w-50">
                    <h1 className="text-center mb-4">{t('signup_page.header')}</h1>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        isInvalid={signupFailed || errors.username}
                        name="username"
                        id="username"
                        placeholder={t('errors.validation_errors.username_min_max')}
                        autoComplete="username"
                        {...getFieldProps('username')}
                      />
                      <Form.Label htmlFor="username">{t('signup_page.username')}</Form.Label>
                      {touched.username && errors.username ? <div className="invalid-tooltip">{errors.username}</div> : null}
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                      <Form.Control
                        isInvalid={signupFailed || (touched.password && errors.password)}
                        name="password"
                        id="password"
                        type="password"
                        placeholder={t('errors.validation_errors.password_min')}
                        autoComplete="new-password"
                        {...getFieldProps('password')}
                      />
                      <Form.Label htmlFor="password">{t('signup_page.password')}</Form.Label>
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
                        placeholder={t('errors.validation_errors.required')}
                        autoComplete="new-password"
                        {...getFieldProps('confirmPassword')}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('signup_page.confirm_password')}</Form.Label>
                      {touched.confirmPassword && errors.confirmPassword ? <div className="error invalid-tooltip">{errors.confirmPassword}</div> : null}
                      {signupFailed ? <div className="invalid-tooltip">{t('errors.signup_error')}</div> : null}
                    </Form.Floating>
                    <Button disabled={isSubmitting} variant="outline-primary" className="w-100" type="submit">{t('signup_page.signup_button')}</Button>
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
