function Loading() {
  return (
    <>
    <div className="loading-overlay d-flex align-items-center justify-content-center flex-column gap-4">
      <div className="loading-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="fs-4 text-center text-white">Please Wait...</p>
    </div>
    </>
  );
}

export default Loading;
