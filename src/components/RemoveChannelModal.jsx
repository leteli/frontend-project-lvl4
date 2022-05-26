import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { selectors, actions as channelActions } from '../slices/channelsSlice.js';
import { actions as modalActions } from '../slices/modalsSlice.js';
import useSocket from '../contexts/sockets.js';

const RemoveChannelModal = () => {
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channel } = useSelector((state) => state.modals);
  const generalChannelId = useSelector(selectors.selectAll)
    .find((ch) => ch.name === 'general').id;
  console.log(generalChannelId);

  const closeModal = () => dispatch(modalActions.closeModal());
  console.log(channel);

  const onRemove = () => {
    toast.promise(
      socketApi.removeChannel(channel),
      {
        success: t('chat_page.removed'),
        error: t('errors.network_error'),
      },
    );
    dispatch(channelActions.setCurrentChannel(generalChannelId));
    closeModal();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={closeModal}>
        <Modal.Title className="h4">{t('chat_page.remove_header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('chat_page.remove_confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={closeModal} variant="secondary" className="me-2">{t('chat_page.cancel')}</Button>
          <Button onClick={onRemove} variant="danger">{t('chat_page.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
