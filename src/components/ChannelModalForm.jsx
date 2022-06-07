/* eslint-disable import/no-cycle */
import React, { useRef, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { selectors } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';
import { socketContext } from '../index.js';

const ChannelForm = () => {
  const chatApi = useContext(socketContext);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const channelNames = useSelector(selectors.selectAll)
    .map((channel) => channel.name);

  const closeModal = () => dispatch(modalsActions.closeModal());

  const { type, channel } = useSelector((state) => state.modals);

  const onAdd = (name) => {
    try {
      chatApi.addNewChannel({ removable: true, name });
      toast.success(t('chat_page.added'));
    } catch (err) {
      toast.error(t('errors.network_error'));
    }
  };

  const onRename = (name) => {
    try {
      chatApi.renameChannel({ id: channel.id, name });
      toast.success(t('chat_page.renamed'));
    } catch (err) {
      toast.error(t('errors.network_error'));
    }
  };

  const title = type === 'adding' ? t('chat_page.add_header') : t('chat_page.rename_header');
  const handler = type === 'adding' ? onAdd : onRename;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(t('errors.validation_errors.required'))
        .notOneOf(channelNames, t('errors.validation_errors.channel_unique')),
    }),
    onSubmit: ({ name }) => {
      handler(name);
      closeModal();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className="h4">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              isInvalid={formik.touched.name && formik.errors.name}
              ref={inputRef}
              onChange={formik.handleChange}
              className="mb-2"
              name="name"
              id="name"
              value={formik.values.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('chat_page.channel_name')}</Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button onClick={closeModal} type="button" variant="secondary" className="me-2">{t('chat_page.cancel')}</Button>
              <Button type="submit">{t('chat_page.send')}</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelForm;
