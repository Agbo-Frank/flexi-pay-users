import React, { useState } from "react";
import { CloseEyesIcon, ExclamationIcon, EyesIcon } from "./icons";
import{ IAutoComplete, IDateInput, IInputProps, ISelectInput } from './interface'
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export function FormInput({ Icon, type, name, label, formik }: IInputProps): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  let [error, setError] = useState<boolean>(false)

  let [password, setPassword] = useState('password')
  let [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <div className="relative w-full">
        <div 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`flex justify-between bg-white items-center rounded-xl border border-solid ${focus ? 'border-primary-blue' : formik.touched[name] && formik.errors[name] ? 'border-crimson' : 'border-grey-1000'} py-3 px-5 mb-4`}>
            <input 
            type={type === 'password' ? password : type} 
            name={name} 
            placeholder={label}
            className="w-full" 
            {...formik.getFieldProps(name)}
            /> 
            {
              type === 'password' ?
              <div onClick={() => {
                  setPassword(state => {
                    if(state === 'password'){
                      return 'text'
                    }
                    else{
                      return 'password'
                    }
                  })
                  setSeePassword(state => !state)
                }}>
                {
                  seePassword ?
                  <EyesIcon size="17" color={focus ? '#1900FE' : formik.touched[name] && formik.errors[name] ? '#FF5000': '#C4C4C4'}/>:
                  <CloseEyesIcon size="17" color={focus ? '#1900FE' : formik.touched[name] && formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
                }
              </div>:
              <>
                {
                  Icon &&
                  <Icon  size='14' color={focus ? '#1900FE' : formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
                }
              </>
            }
        </div>
        {
          formik.touched[name] && formik.errors[name] ?
          <div className={`absolute flex space-x-1 items-center text-crimson text-sm px-2 py-0 bg-white -translate-y-7 translate-x-4`}>
            <ExclamationIcon size="10" color="#FF5000" />
            <small className="block w-full whitespace-nowrap">{formik.errors[name]}</small>
          </div>:
          null
        }
    </div>
  );
}

export function SelectInput ({ label, data, name, onChange, formik }: ISelectInput){
  return(
      <div className="mb-4 w-full">
          <FormControl fullWidth size="medium">
          <InputLabel id={name}>{label}</InputLabel>
              <Select
                  id={name}
                  displayEmpty
                  name={name}
                  sx={{borderRadius: 3}}
                  {...formik.getFieldProps(name)}
                  label={label}
                  onChange={e => {
                    formik.handleChange(e)
                    if(onChange){
                      onChange(`${e.target.value}`)
                    }
                  }}
                  placeholder={label}
              >
                  {/* <MenuItem 
                    value="" 
                    disabled 
                    key={data?.length} 
                    sx={{color: '#C3C3C3'}}
                    className="text-[#C3C3C3]"
                    >
                      { label }
                  </MenuItem> */}
                  {
                    data?.map((d, idx) => <MenuItem value={d.value} key={idx}>{d.label}</MenuItem>)
                  }
              </Select>
          </FormControl>
      </div>
  )
}

export function DateInput({label, name, formik}: IDateInput){
  const [value, setValue] = React.useState<Date | null>(null);
  return(
    <div className="mb-4 w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          disableFuture
          inputFormat="yyyy-MM-dd"
          renderInput={(params) => <TextField 
            {...params} 
            sx={{borderRadius: 3}}
            name={name}
            {...formik.getFieldProps(name)}/>}
        />
      </LocalizationProvider>
    </div>
  )
}


export function AutoComplete ({ label, data, name, onChange, formik, size="large", loading = false, getOptions }: IAutoComplete){
  return(
    <div className="relative mb-4 w-full">
        <FormControl fullWidth size="medium">
          <Autocomplete
            disablePortal
            id={name}
            name={name}
            options={data}
            loading={loading}
            // onClose={onClose}
            isOptionEqualToValue={(option, value) => option === value}
            inputValue={formik.values[name]}
            {...formik.getFieldProps(name)}
            onChange={(e, v: any) => {
              formik.handleChange(e)
              if(onChange){
                onChange(v)
              }
            }}              
            sx={{
              '& fieldset': {
                borderRadius: 2,
                borderWidth: 1,
                borderColor: formik.touched[name] && formik.errors[name] ? '#FF5000' : '#C4C4C4'
              }, 
            }}
            size={size}
            getOptionLabel={getOptions}
            renderInput={(params) => <TextField {...params} name={name} placeholder={ label }/>}
          />
        </FormControl>
        {
          formik.touched[name] && formik.errors[name] ?
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-2 translate-x-3`}>
            {formik.errors[name]}
          </p>:
          null
        }
    </div>
  )
}

export default FormInput;