import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal(props) {

  return (
    <>
      <Modal show={props.isShowModalDelete} onHide={props.handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModalDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.handleAction}>
            {props.contentActionBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;