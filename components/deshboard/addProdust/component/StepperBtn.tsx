import { Button } from "@mui/material";
import React, { Dispatch } from "react";

type Props = {
  step: number;
  setStep: Dispatch<React.SetStateAction<number>>;
  loading?: boolean;
};

const StepperBtn = ({ step, setStep, loading }: Props) => {
  return (
    <div className='mt-3'>
      {step > 0 && (
        <Button
          style={{ width: "100px", marginRight: "10px" }}
          variant='outlined'
          type='button'
          onClick={() => setStep((prev) => prev - 1)}
        >
          go back
        </Button>
      )}

      <Button
        disabled={loading}
        style={{ width: "130px" }}
        variant='outlined'
        type='submit'
      >
        {step === 3 ? "Add Product" : "Next"}
      </Button>
    </div>
  );
};

export default StepperBtn;
