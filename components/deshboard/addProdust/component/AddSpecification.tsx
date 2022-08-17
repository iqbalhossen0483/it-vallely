import { Button } from "@mui/material";
import React from "react";
import Input from "../../../shared/utilitize/Input";
import { Specification } from "./Features";

type Props = {
  handleSpecifications(e: React.KeyboardEvent<HTMLDivElement>): void;
  specifications: Specification;
  setSpecifications: React.Dispatch<React.SetStateAction<Specification>>;
};

const AddSpecification = (props: Props) => {
  const { handleSpecifications, specifications, setSpecifications } = props;
  
  return (
    <div className='specification-container'>
      <Input
        label='Heading'
        style={{
          display: `${!specifications.showInput ? "none" : "block"}`,
        }}
        value={specifications.inputValue}
        onKeyDown={(e) => handleSpecifications(e)}
        onChange={(e) =>
          setSpecifications((prev) => {
            return {
              showInput: prev.showInput,
              inputValue: e.target.value,
              arr: prev.arr,
            };
          })
        }
      />
      <Button
        type='button'
        onClick={() =>
          setSpecifications((prev) => {
            return {
              showInput: !prev.showInput,
              inputValue: prev.inputValue,
              arr: prev.arr,
            };
          })
        }
        variant='outlined'
      >
        More Features
      </Button>
    </div>
  );
};

export default AddSpecification;
