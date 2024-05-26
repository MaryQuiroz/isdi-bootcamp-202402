import { Modal, ModalHeader, ModalBody} from "flowbite-react";

export const ModalComponent = ({ show, onClose, form, title }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{form}</ModalBody>
    </Modal>
  );
};
