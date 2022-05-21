import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Methods } from "../../pages/checkout/payment";

type Props = {
  setmethods: React.Dispatch<React.SetStateAction<Methods>>;
  methods: Methods;
};
type Type = "showCashOn" | "showCredit" | "showRocket" | "showBkash";

const PaymentMethods = ({ methods, setmethods }: Props) => {
  function handleMethods(type: Type) {
    const modifiedMethods = methods;
    let m: Type;
    for (m in modifiedMethods) {
      if (m === type) {
        modifiedMethods[m] = true;
      } else {
        modifiedMethods[m] = false;
      }
    }
    setmethods({ ...modifiedMethods });
  }

  return (
    <div className='payment-methods'>
      <div
        onClick={() => {
          handleMethods("showCredit");
        }}
        className='item'
      >
        <FontAwesomeIcon icon={faCreditCard} className='text-2xl mb-2' />
        <p>Credit/Debit Card</p>
      </div>
      <div
        onClick={() => {
          handleMethods("showRocket");
        }}
        className='item'
      >
        <Image
          height={50}
          width={50}
          src='https://i.ibb.co/x1dQ7w2/OSS-i-Whp8-Hi8-b09dedee68e947f9bde1f49182777d7f.webp'
          alt=''
        />
        <p>Rocket</p>
      </div>
      <div
        onClick={() => {
          handleMethods("showBkash");
        }}
        className='item'
      >
        <Image
          height={50}
          width={50}
          src='https://i.ibb.co/CnZQ9n9/TB14-FT1-Jp-OWBu-Njy0-Fi-XXXFx-VXa-400-400.png'
          alt=''
        />
        <p>Bkash</p>
      </div>
      <div
        onClick={() => {
          handleMethods("showCashOn");
        }}
        className='item'
      >
        <Image
          height={50}
          width={50}
          src='https://i.ibb.co/tCckKMK/TB1utb-r8j-TBKNj-SZFw-XXc-G4-XXa-80-80.png'
          alt=''
        />
        <p>Cash On Delivary</p>
      </div>
    </div>
  );
};

export default PaymentMethods;
