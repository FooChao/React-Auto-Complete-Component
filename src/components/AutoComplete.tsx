import React, { useState, useEffect} from 'react';
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon


interface AutocompleteProps<T extends object | string> {
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
   

const Autocomplete  =<T extends object | string,> ({ 
    description, 
    disabled, 
    filterOptions, 
    label, 
    multiple, 
    onChange, 
    onInputChange, 
    options, 
    placeholder, 
    renderOption, 
    value 
  }: AutocompleteProps<T>) : JSX.Element =>  {
    const [isOpen, setIsOpen] = useState(false);
    const [inputWidth, setInputWidth] = useState<number | null>(null);
    const [selected, setSelected] = useState<T[]>(Array.isArray(value) ? value : [value]);
    const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { x, y, refs, strategy } = useFloating({
        placement: 'bottom-start', // Position the floating UI below the input
        middleware: [offset(0), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const handleOptionClick = (option : T) => {
        if (multiple) { // we assume when people put multiple, it is actually multiple
            const previousSelected : T[] = selected as T[];
            if (previousSelected.includes(option)){
                setSelected(previousSelected.filter(current =>
                        current !== option
                    )
                );
            } else {
                setSelected([...previousSelected,option]);
                
            }
            //upadate global variable
            onChange(selected);  
        } else {
            setSelected([option]);
            //upadate global variable
            onChange(option);  
        }
        
    }

    let handler : number | undefined;

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement> )  => {
        if (handler) {
            clearTimeout(handler);
            setIsLoading(false)
        } 
        const inputValue = e.target.value;
        handler = setTimeout(() => handleInputChangeHelper(inputValue) , 1000);
        
    }

    const handleInputChangeHelper = (inputValue : string)  => {
        setIsLoading(true);
        if (filterOptions) {
            setFilteredOptions(filterOptions(options,inputValue))
        } else {
            setFilteredOptions(options.filter(item => {
                if (inputValue === "") {
                    return false;
                }
                let displayedString : string;
                if (typeof item === 'string') {
                    displayedString = item;
                } else {
                    displayedString = item.toString();
                }                
                return displayedString.startsWith(inputValue);
            }));
        }
        onInputChange(inputValue);
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    }

    useEffect(() => {
        if (refs.reference.current) {
            const referenceElement = refs.reference.current as HTMLInputElement;
            const width = referenceElement.clientWidth;
            setInputWidth(width);
        }
    }, [refs.reference.current, isOpen]); // Make sure this runs when the input ref changes or when `isOpen` changes

    
  
    return (
        <div className = "container flex flex-col bg-white justify-between mx-auto mt-64 px-2 py-5 rounded-md max-w-64">    
            <h1 className='bg-white mx-0'> {description} </h1>
            <div className='relative flex items-center'>
                <input 
                type='text' 
                className= 'mx-0 border-gray-300 border-2 rounded-md px-3 py-2 w-full pl-8' 
                disabled = {disabled} 
                placeholder= {placeholder} 
                onFocus={()=>setIsOpen(true)} 
                onBlur={()=>setIsOpen(false)} 
                onChange={(e) => handleInputChange(e)}
                ref = {refs.setReference}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faSearch} />
                </div>
                {/* Show loading spinner conditionally */}
                {isLoading && (
                    <div className="absolute right-2">
                    <ClipLoader size={20} color={"#123abc"} loading={isLoading} />
                    </div>
                )}
            
        
            </div>        
            
            {/* Floating element */}
            {isOpen && (
                
                <div
                ref={refs.setFloating}
                style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    width: inputWidth ? `${inputWidth}px` : '240px',
                }}
                className="absolute min-w-60 z-50 bg-white border border-gray-300 shadow-lg rounded-md mt-1 p-2"
                >
                {(filteredOptions? filteredOptions.length === 0 : false) && (
                    <div
                    className="p-2 hover:bg-blue-100 cursor-pointer rounded"
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur event when clicking inside the dropdown
                    >
                        No match detected.
                    </div>
                )}
                {filteredOptions.map((option, index) => (
                    <div
                    key={index}
                    className="p-2 hover:bg-blue-100 cursor-pointer rounded flex flex-row"
                    onClick={() => handleOptionClick(option)}
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur event when clicking inside the dropdown
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(option) }
                            className="h-4 w-4 my-auto mr-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        
                            {renderOption 
                                ? renderOption(option) 
                                : (typeof option === "string" ? <h1 className='my-auto'>{option}</h1> : <h1 className='my-auto'>{option.toString()}</h1>)}
                                           
                    </div>
                
                ))}
                </div>
            )}
            <h1 className='bg-white'> {label} </h1>
        </div>
    )
}

export default Autocomplete