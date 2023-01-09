import { useEffect, useRef } from 'react';
import './modal.scss';

const ModalContent = (props) => {
      const modalRef = useRef();

      useEffect(() => {
            const clickOutsideContent = (e) => {
                  if (e.target === modalRef.current) {
                        props.setShow(false);
                  }
            };
            window.addEventListener('click', clickOutsideContent);
            return () => {
                  window.removeEventListener('click', clickOutsideContent);
            };
      }, [props]);

      return (
            <div ref={modalRef} className={`modal ${props.show ? 'active' : ''}`}>
                  <div className="modal__content">
                        {!props.hideCloseButton && (
                              <span onClick={() => props.setShow(false)} className="modal__close">
                                    &times;
                              </span>
                        )}
                        {props.children}
                  </div>
            </div>
      );
};

export default ModalContent;

export const ModalHeader = (props) => {
      return (
            <div className="modal__header border-b-2 font-bold text-[20px] flex justify-between items-center">
                  {props.children}
            </div>
      );
};

export const ModalBody = (props) => {
      return <div className="modal__body">{props.children}</div>;
};

export const ModalFooter = (props) => {
      return <div className="modal__footer flex justify-end">{props.children}</div>;
};
