import {Modal, Button} from 'react-bootstrap'
import { Register } from './RegisterMail';


export const ModalRegister = (props) => {
    return (
        <div>
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Cross Ft. Ajusco
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Crea una cuenta:</h4>
              {/* Aquí inicimos sesión */}
                    <Register />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
}