import CheckIcon from "@mui/icons-material/Check";
import "./styles.scss";

AboutList.propTypes = {};

function AboutList(props) {
  return (
    <div className="about">
      <h2 className="about__title">Chương trình theo dõi hóa đơn Chi nhánh</h2>
      <div className="about__info info">
        <h5 className="info__content">
          <CheckIcon className="info__icon" />
          <span className="info__key">Phiên bản</span>
          <span className="info__value info__version">: 1.0.0</span>
        </h5>
        <h5 className="info__content">
          <CheckIcon className="info__icon" />
          <span className="info__key">Bản quyền</span>
          <span className="info__value">
            : BIDV - Chi nhánh Quận 7 Sài Gòn || năm 2023
          </span>
        </h5>
      </div>
    </div>
  );
}

export default AboutList;
