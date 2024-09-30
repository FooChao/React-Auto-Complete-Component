import React from 'react'

interface AutocompleteProps<T> {
    description: string;
    disabled: boolean;
    filterOptions?: (options: Array<T>, inputValue: string) => Array<T>;
    label: string;
    loading: boolean;
    multiple: boolean;
    onChange: (value: T | Array<T>) => void;
    onInputChange: (inputValue: string) => void;
    options: Array<T>;  
    placeholder: string;
    renderOption?: (option: T) => React.ReactNode;
    value: T | Array<T>;
  }
  
  

const Autocomplete  =<T,> ({ 
    description, 
    disabled, 
    filterOptions, 
    label, 
    loading, 
    multiple, 
    onChange, 
    onInputChange, 
    options, 
    placeholder, 
    renderOption, 
    value 
  }: AutocompleteProps<T>) : JSX.Element =>  {
  return (
    <div className = {loading ? "" : "container flex bg-blue-500 justify-between mx-auto mt-64"}>test</div>
  )
}

export default Autocomplete