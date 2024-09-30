import React, { useState} from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';

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
    const [inputValue, setInputValue] = useState('');  
    const [isOpen, setIsOpen] = useState(false);

    const { x, y, refs, strategy, update } = useFloating({
        placement: 'bottom-start', // Position the floating UI below the input
        middleware: [offset(4), flip(), shift()],
        whileElementsMounted: autoUpdate,
      });

      const handleOptionClick = (option : any) => {
        console.log(option);
      }
  
    return (
        <div className = "container flex flex-col bg-white justify-between mx-auto mt-64 px-2 py-5 rounded-md max-w-64">    
            <h1 className='bg-white mx-0'> {description} </h1>        
            <input type='text' className= 'mx-0 border-gray-300 border-2 rounded-md' disabled = {disabled} placeholder= {placeholder} onFocus={()=>setIsOpen(true)} ref = {refs.setReference}/>
            {/* Floating element */}
            {isOpen && options.length > 0 && (
                <div
                ref={refs.setFloating}
                style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                }}
                className="absolute min-w-60 z-50 bg-white border border-gray-300 shadow-lg rounded-md mt-1 p-2"
                >
                {options.map((option, index) => (
                    <div
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer rounded"
                    onClick={() => handleOptionClick(option)}
                    >
                    {renderOption ? renderOption(option) : 'option.toString()'}
                    </div>
                
                ))}
                </div>
            )}
            <h1 className='bg-white'> {label} </h1>
        </div>
    )
}

export default Autocomplete