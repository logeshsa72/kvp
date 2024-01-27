import validator from 'validator';
import React from "react";
import { MultiSelect } from "react-multi-select-component";


export const handleOnChange = (event, setValue) => {
    const inputValue = event.target.value;
    const inputSelectionStart = event.target.selectionStart;
    const inputSelectionEnd = event.target.selectionEnd;

    const upperCaseValue = inputValue.toUpperCase();

    const valueBeforeCursor = upperCaseValue.slice(0, inputSelectionStart);
    const valueAfterCursor = upperCaseValue.slice(inputSelectionEnd);

    setValue(valueBeforeCursor + inputValue.slice(inputSelectionStart, inputSelectionEnd) + valueAfterCursor);

    // Set the cursor position to the end of the input value
    setTimeout(() => {
        event.target.setSelectionRange(valueBeforeCursor.length + inputValue.slice(inputSelectionStart, inputSelectionEnd).length, valueBeforeCursor.length + inputValue.slice(inputSelectionStart, inputSelectionEnd).length);
    });
};

export const MultiSelectDropdown = ({ name, selected, setSelected, options, readOnly = false }) => {
    return (
        <div className={`m-1 grid grid-cols-1 md:grid-cols-3 items-center z-0 md:my-0.5 md:py-3 data `}>
            <label className='md:text-start flex' >{name}</label>
            <MultiSelect
                className='input-field focus:outline-none md:col-span-2 border border-gray-500 rounded'
                options={options}
                value={selected}
                onChange={readOnly ? () => { } : setSelected}
                labelledBy="Select"
            />
        </div>
    );
};

export const TextInput = ({ name, type, value, setValue, readOnly, className, required = false, disabled = false }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-0.5 md:px-1 data gap-1'>
            <label className={`md:text-start flex ${className}`}>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input type={type} disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-2 border-gray-500 border rounded' value={value} onChange={(e) => { type === "number" ? setValue(e.target.value) : handleOnChange(e, setValue) }} readOnly={readOnly} />
        </div>
    )
}

export const LongTextInput = ({ name, type, value, setValue, className, readOnly, required = false, disabled = false }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 items-center md:my-0.5 md:px-1 data gap-1'>
            <label className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input type={type} disabled={disabled} required={required} className={className} value={value} onChange={(e) => { type === "number" ? setValue(e.target.value) : handleOnChange(e, setValue) }} readOnly={readOnly} />
        </div>
    )
}

export const DisabledInput = ({ name, type, value, className = "" }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 items-center md:my-0.5 md:px-1 data gap-1 ${className}`}>
            <label className='md:text-start flex'>{name}</label>
            <input type={type} className='input-field focus:outline-none md:col-span-2 border border-gray-500 rounded' value={value} disabled />
        </div>
    )
}

export const LongDisabledInput = ({ name, type, value, className }) => {
    return (
        <div className={`grid grid-flow-col gap-4 items-center md:my-0.5 md:px-1 data ${className}`}>
            <label className='md:text-start flex'>{name}</label>
            <input type={type} className={`h-6 border border-gray-500 rounded`} value={value} disabled />
        </div>
    )
}

export const TextArea = ({ name, value, setValue, readOnly, required = false, disabled = false }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:items-center md:my-1 md:px-1 data'>
            <label className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <textarea name={name} disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-2 border border-gray-500 rounded' cols="30" rows="2" value={value} readOnly={readOnly}></textarea>
        </div>
    )
}

export const DropdownInput = ({ name, options, value, setValue, defaultValue, className, readOnly, required = false, disabled = false }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-3 items-center gap-10 md:my-1 md:px-1 data'>
            <label className={`md:text-start flex ${className}`}>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <select defaultValue={defaultValue} id='dd' required={required} name="name" className='input-field border border-gray-500 md:col-span-2 col-span-1 rounded' value={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly}>
                <option value="Select" hidden>Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >
                    {option.show}
                </option>)}
            </select>
        </div>
    )
}

export const LongDropdownInput = ({ name, options, value, setValue, defaultValue, className, readOnly, required = false, disabled = false }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-flow-col gap-14 items-center md:my-1 md:px-1 data'>
            <label className={`md:text-start`}>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <select defaultValue={defaultValue} id='dd' required={required} name="name" className={`border w-72 border-gray-500 h-6 rounded ${className}`} value={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly}>
                <option value="Select" hidden>Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >
                    {option.show}
                </option>)}
            </select>
        </div>
    )
}

export const RadioButton = ({ label, value, onChange, readOnly, className }) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <input type="radio" checked={value} onChange={onChange} />
            <label>
                {label}
            </label>
        </div>
    );
};


export const DropdownInputWithoutLabel = ({ options, value, setValue, readOnly, required = false, disabled = false }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-1 md:px-1 data'>
            <select required={required} name="name" className='input-field md:col-span-2 border col-span-1 rounded' value={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly}>
                <option value="Select" hidden>Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >{option.show}</option>)}
            </select>
        </div>
    )
}


export const CurrencyInput = ({ name, value, setValue, readOnly, required = false, disabled = false }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-1 md:px-1 data'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input type="number" disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-2 border rounded' min="1" step="any" id='id' value={value} onChange={(e) => { handleOnChange(e); }} readOnly={readOnly} />
        </div>
    )
}

const RequiredLabel = ({ name }) => <p>{`${name}`}<span className="text-red-500">*</span> </p>



export const DateInput = ({ name, value, setValue, readOnly, required = false, type = "date", disabled = false }) => {

    return (
        <div className='grid grid-cols-2 items-center gap-10 md:my-1 md:px-1 data'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input type={type} disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-1 border border-gray-500 form-border-color rounded' id='id' value={value} onChange={(e) => { setValue(e.target.value); }} readOnly={readOnly} />
        </div>
    )
}

export const LongDateInput = ({ name, value, setValue, readOnly, className, required = false, type = "date", disabled = false }) => {

    return (
        <div className='grid grid-flow-col item-center justify-center gap-12 w-56 items-center md:px-1 data'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input type={type} disabled={disabled} required={required} className={`${className} focus:outline-none border border-gray-500 form-border-color rounded h-6`} id='id' value={value} onChange={(e) => { setValue(e.target.value); }} readOnly={readOnly} />
        </div>
    )
}

export const CheckBox = ({ name, value, setValue, readOnly, className, required = false, disabled = false }) => {
    const handleOnChange = (e) => {
        setValue(!value);
    }
    return (
        <div className='items-center md:my-1 md:px-1 data'>
            <label htmlFor="id" className={`md:text-start items-center ${className}`}>
                <input type="checkbox" required={required} className='mx-2 py-2' checked={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly} />
                {name}
            </label>
        </div>
    )
}



export const validateEmail = (data) => {
    return validator.isEmail(data);
}

export const validateMobile = (data) => {
    let regMobile = /^[6-9]\d{9}$/;
    return regMobile.test(data);
}

export const validatePan = (data) => {
    let regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    return regpan.test(data);
}

export const validatePincode = (data) => {
    return data.toString().length === 6;
}