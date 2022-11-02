import React from 'react';
import ModalContent, { ModalBody, ModalFooter, ModalHeader } from './component/modal/ModalContent';
import Button from './component/button/Button';

function Modal(props, ref) {
      const { value, show, setShow } = props;

      return (
            <div>
                  <ModalContent
                        show={show}
                        setShow={setShow}
                        // hideCloseButton
                  >
                        <ModalHeader>
                              <h2>Modal header</h2>
                        </ModalHeader>
                        <ModalBody>
                              <p style={{ textAlign: 'justify' }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Deserunt maxime dolorem asperiores laboriosam ad delectus ea.
                                    Tempora tempore repellendus laudantium fugiat saepe mollitia
                                    eius illo possimus laborum consequuntur, tenetur neque. {value}
                              </p>
                        </ModalBody>
                        <ModalFooter>
                              <Button onClick={() => setShow(false)}>Close</Button>
                        </ModalFooter>
                  </ModalContent>
            </div>
      );
}

export default Modal;
