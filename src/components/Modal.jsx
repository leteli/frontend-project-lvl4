import React from 'react';
import { useSelector } from 'react-redux';

import ChannelModalForm from './ChannelModalForm.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  const Component = type === 'remove' ? RemoveChannelModal : ChannelModalForm;
  return (
    <Component />
  );
};

export default Modal;
