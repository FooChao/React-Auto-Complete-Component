import React, { useState } from 'react'

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
  useState  
  return (
    <div className = "container flex flex-col bg-white justify-between mx-auto mt-64 px-2 py-5 rounded-md max-w-64">    
        <h1 className='bg-white mx-0'> {description} </h1>        
        <input type='text' className='mx-0 border-gray-300 border-2 rounded-md ' placeholder= {placeholder}/>
        <h1 className='bg-white'> {label} </h1>
    </div>
  )
}

export default Autocomplete