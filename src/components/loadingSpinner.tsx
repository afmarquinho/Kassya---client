export const LoadingSpinner = () => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-20 flex justify-center items-center`}
    >
      <div
        className={`bg-white dark:bg-slate-900 px-8 font-medium text-base flex justify-center items-center`}
      >
        <div className="lds-ellipsis h-10">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
