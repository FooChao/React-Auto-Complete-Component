import React from 'react';
import Autocomplete from './components/AutoComplete';

const App = () => {

  let description : string = "Test Description";
  let disabled : boolean = false;
  //filtered options are optional so not defined here
  let label : string = "Test Label";
  let loading : boolean = false;
  let multiple : boolean = true;
  let onChange = () => {
    // Do absolutely nothing
  };
  let onInputChange = (inputValue : String) : void => {
    //DO ablsolutely nothing
  };
  let options : string[] = ["aa", "ab", "b", "c"];
  let placeholder : string = "Type to begin seaching";
  // renderoption is optional so will not include
  let renderOption = (option : any) : JSX.Element => {
    return <div>Hi</div>;
  }
  let value : string[] = ["aa"];




  return (
    <Autocomplete 
      description = {description} 
      disabled = {disabled}
      label = {label}
      loading = {loading}
      multiple = {multiple}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      placeholder={placeholder}
      renderOption={renderOption}
      value = {value}
    />
  )
}

export default App
