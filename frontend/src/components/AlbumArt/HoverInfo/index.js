import './HoverInfo.css';
const HoverInfo = ({ className, text }) => {
  return (
    <>
      <div className="hover-info with-arrow">
        <div className={className}>
          <span className={className}>{text}</span>
        </div>
        <div className="arrow"></div>
      </div>
    </>
  );
};

export default HoverInfo;
