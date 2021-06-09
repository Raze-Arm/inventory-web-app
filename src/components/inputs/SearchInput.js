import React ,{useState, useEffect} from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchInput.css';
import _ from "lodash";

const debouncedSearch = _.throttle((onSearch, value) => onSearch(value), 1000,{ leading: false });


function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}

const SearchInput = ({hasError, ...props}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    useEffect(() => {
        setSuggestions(props.options)
    }, [props.options]);


    const onChange = (event, { newValue, method }) => {
        setValue(newValue);
        if(props.input) props.input.onChange(newValue);
    };

    const  onSuggestionsFetchRequested = ({ value }) => {
        debouncedSearch(props.onSearchChange, value)
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, {suggestionValue}) => {
        if(props.input) {
            const id = _.find(suggestions, {name: suggestionValue})?.id;
            props.input.onChange(id);

        }
        if(props.onSelect) props.onSelect(_.find(suggestions, {name: suggestionValue}));
    }

    const inputProps = {
        placeholder: props.placeholder,
        value,
        onChange: onChange,

    };

    const renderInput = (inputProps) => {
        return (
            <div key={props.label}  className={`field ${hasError ? 'error' : ''}` }>
                <label>{props.label}</label>
                <input  key={props.label}  {...inputProps} onBlur={() => props.input?.onBlur()}   />
                {hasError? <div className="ui pointing red basic label">
                    لطفاً مقداری وارد کنید
                </div> : ''}
            </div>
        );
    }


        return (<Autosuggest
                    suggestions={suggestions}
                    onSuggestionSelected={onSuggestionSelected}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderInputComponent={renderInput}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />
        );
}

export default SearchInput;