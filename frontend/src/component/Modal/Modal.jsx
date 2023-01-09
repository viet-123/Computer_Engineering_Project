import React from 'react';
import ModalContent, { ModalBody, ModalFooter, ModalHeader } from './component/modal/ModalContent';
import Button from './component/button/Button';

function Modal(props, ref) {
      const { show, setShow, image } = props;
      return (
            <div>
                  <ModalContent
                        show={show}
                        setShow={setShow}
                        // hideCloseButton
                  >
                        <ModalHeader>
                              <h2>Image Details</h2>
                        </ModalHeader>
                        <ModalBody>
                              <div className="w-100 flex flex-col">
                                    <div className="px-[20px] w-100">
                                          <img src={image[0]} className="w-100" alt="#" />
                                    </div>
                                    <div className="flex flex-row px-[20px] w-100 mt-1">
                                          <img src={image[1]} className="w-3/6 pr-1" alt="#" />
                                          <img src={image[2]} className="w-3/6" alt="#" />
                                    </div>
                              </div>
                        </ModalBody>
                        <ModalFooter>
                              <Button onClick={() => setShow(false)}>Close</Button>
                        </ModalFooter>
                  </ModalContent>
            </div>
      );
}

export default Modal;
