const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "350px" }}
    >
      <div
        className="spinner-border"
        style={{ height: "3rem", width: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
