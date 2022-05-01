import useStore from "../../contex/hooks/useStore";

const Alert = () => {
  const store = useStore();
  setTimeout(() => {
    store?.State.setAlert(null);
  }, 6000);

  if (!store?.State.alert) {
    return null;
  }
  return (
    <div className='alert-container'>
      <p>{store?.State.alert}</p>
    </div>
  );
};

export default Alert;
