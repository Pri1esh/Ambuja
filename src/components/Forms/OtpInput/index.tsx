import { IOtpInput } from '@interfaces';
import { useDeviceType } from '@utils';
import { Modal, Offcanvas } from 'react-bootstrap';
import styles from './OtpInput.module.scss';
import OTPFields from './otpFields';

const OtpInput = (props: IOtpInput) => {
  const { isModalOpen = false, show = false, setShow } = props;
  const { deviceType } = useDeviceType();

  return isModalOpen ? (
    <>
      {deviceType !== 'desktop' ? (
        <Offcanvas
          className={styles.offCanvas}
          placement={'bottom'}
          show={show}
          onHide={() => {
            if (setShow) setShow(false);
          }}
          backdrop="static"
        >
          <Offcanvas.Body>
            <OTPFields compData={props} />
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <Modal
          backdrop="static"
          show={show}
          onHide={() => {
            if (setShow) setShow(false);
          }}
        >
          <Modal.Body>
            <OTPFields compData={props} />
          </Modal.Body>
        </Modal>
      )}
    </>
  ) : (
    <OTPFields compData={props} />
  );
};
export default OtpInput;
