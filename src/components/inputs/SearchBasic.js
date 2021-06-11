import _ from 'lodash'
import React from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import './SearchBasic.css'

const initialState = {
    loading: false,
    results: [],
    value: {title: ''},
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return { ...state, loading: true, value: action.query }

        case 'SET_RESULTS': {
            // const re = new RegExp(_.escapeRegExp(state.value), 'i')
            // const isMatch = (result) => re.test(result.title)

            return { ...state, loading: false, results:  action.results, }
        }
        case 'UPDATE_SELECTION':
            const  selectedItem = _.find(state.results, r => r.title === action.selection.title  );
            return { ...state, value:  selectedItem }

        default:
            throw new Error()
    }
}


const  SearchBasic = ({options, getSearchedSources, input, onSelect, label, hasError}) =>  {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const { loading, results, value } = state


    React.useEffect(() => {
        console.log('options###', options)
        if(options.length > 0 ) {
            const re = new RegExp(_.escapeRegExp(state.value), 'i')
            const isMatch = (result) => re.test(result.title);
            const res =_.filter(options, isMatch)
            if(res.length > 0) dispatch({type: 'SET_RESULTS', results: res})
        }
    } ,[options]);

    React.useEffect(() => {
        if(input) input.onChange(value.id);
        if (onSelect) onSelect(value)
    }, [value]);

    const timeoutRef = React.useRef();
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({ type: 'START_SEARCH', query: data.value })
        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({ type: 'CLEAN_QUERY' })
                return
            }
            getSearchedSources(data.value);

        }, 1000)
    }, [])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const renderResults = ({title, price,image, description, ...props}) => {
        const img = image ? <div className={'image'}><img src={image}/></div> : '';
        return (
            <div className={'result'} >
                {img}
                <div className={'content'}>
                    <div className={'title'}>{title}</div>
                    <div className={'price'}>{price}</div>
                    <div className={'description'}>{description}</div>
                </div>
            </div>
        );
    }

    return (
                <div className={`ui field  ${hasError ? 'error' : ''}`}>
                    <label>{label || ''}</label>
                    <Search
                        loading={loading}
                        onResultSelect={(e, data) =>
                            dispatch({ type: 'UPDATE_SELECTION', selection: data.result })
                        }
                        fluid
                        resultRenderer={renderResults}
                        noResultsMessage={<span >بدون نتیجه</span>}
                        onSearchChange={handleSearchChange}
                        results={_.map(results, r => _.pick(r , ['title', 'description', 'image', 'price']))}
                        value={value.title}
                    />
                    {hasError? <div style={{marginTop: '1rem'}} className="ui  red basic label">
                        لطفاً مقداری وارد کنید
                    </div> : ''}
                </div>
    )
}


export default SearchBasic;