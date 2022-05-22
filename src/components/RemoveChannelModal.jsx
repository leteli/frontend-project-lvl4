import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { removeChannel, selectors, actions as channelActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalsSlice.js';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();

  const { channel } = useSelector((state) => state.modals);
  const generalChannelId = useSelector(selectors.selectAll)
    .find((ch) => ch.name === 'general').id;
  console.log(generalChannelId);

  const closeModal = () => dispatch(modalActions.closeModal());
  console.log(channel);

  const onRemove = () => {
    dispatch(removeChannel(channel));
    dispatch(channelActions.setCurrentChannel(generalChannelId));
    closeModal();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className="h4">Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={closeModal} variant="secondary" className="me-2">Отменить</Button>
          <Button onClick={onRemove} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
