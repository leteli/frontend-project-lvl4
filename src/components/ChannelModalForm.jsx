import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { selectors, addNewChannel, renameChannel } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const ChannelForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []);

  const channelNames = useSelector(selectors.selectAll)
    .map((channel) => channel.name);

  const closeModal = () => dispatch(modalsActions.closeModal());

  const { type, channel } = useSelector((state) => state.modals);

  const onAdd = (name) => {
    dispatch(addNewChannel({ removable: true, name }));
  };
  const onRename = (name) => dispatch(renameChannel({ id: channel.id, name }));

  const title = type === 'adding' ? 'Добавить канал' : 'Переименовать канал';
  const handler = type === 'adding' ? onAdd : onRename;

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string()
        .required('Обязательное поле')
        .notOneOf(channelNames, 'Должно быть уникальным'),
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
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button onClick={closeModal} type="button" variant="secondary" className="me-2">Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChannelForm;
