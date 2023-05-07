import React from 'react';
import {CSSObjectWithLabel, SingleValue} from 'react-select';
import Creatable from 'react-select/creatable';

import './CustomSelect.scss';

type Props = {
  value?: SingleValue<{label: string; value: string}>;
  onChange?: (newValue: SingleValue<{label: string; value: string}>) => void;
  options?: {label: string; value: string}[];
  placeholder?: string;
  createLabel?: string;
};

const customStyles = {
  control: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,

    borderRadius: '0',

    '::focus': {
      borderColor: 'black',
    },
  }),

  menu: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,

    marginTop: '2px',
    borderRadius: '0',
  }),

  menuList: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,

    margin: '0',
    padding: '0',
    overflow: 'overlay',

    '::-webkit-scrollbar': {
      width: '20px',
    },

    '::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },

    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#d6dee1',
      borderRadius: '20px',
      border: '6px solid transparent',
      backgroundClip: 'content-box',
    },

    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#a8bbbf',
    },
  }),

  option: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
  }),
};

export const CustomSelect = ({value, onChange, options = []}: Props) => {
  return (
    <Creatable
      styles={customStyles}
      className="custom-select"
      value={value}
      isClearable
      onChange={onChange}
      options={options}
      formatCreateLabel={(value) => `Create Directory "${value}"`}
    />
  );
};
