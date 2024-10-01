import React from 'react';
import Autocomplete from './components/AutoComplete';

const App = () => {

  let description : string = "Test Description";
  let disabled : boolean = false;
  //filtered options are optional so not defined here
  let label : string = "Test Label";
  //let loading : boolean = false; //removed
  let multiple : boolean = true;
  let onChange = (value: any | Array<any>) : void => {
    //either change global variable or link to backend
  };
  let onInputChange = (inputValue : String) : void => {
    //either change global variable or link to backend
  };
  let options : string[] = ["aa", "ab", "b", "c"];
  let placeholder : string = "Type to begin seaching";
  let renderOption = (option : any) : JSX.Element => {
    return <div my-auto>{option}</div>;
  }
  let value : string[] = ["aa"];
  let isSynchronous : boolean = false;

  return (
    <Autocomplete 
      description = {description} 
      disabled = {disabled}
      label = {label}
      multiple = {multiple}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      placeholder={placeholder}
      renderOption={renderOption}
      value = {value}
      isSynchronous = {isSynchronous}
    />
  )
}

export default App
