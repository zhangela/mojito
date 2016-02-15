import {
  Modal,
  Button
} from 'react-bootstrap';


LoginModal = React.createClass({
    hide() {
        loginStore.hideModal();
    },

    render() {
        return (
        <Modal show={true} onHide={this.hide}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginUI />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
    }
});