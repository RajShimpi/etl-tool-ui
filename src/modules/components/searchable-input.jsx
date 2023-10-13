import "../components/component.css";

import React, { useEffect, useState } from 'react';

import _ from 'lodash';

const SearchableInput = (props) => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState(props.itemVal);
    const [counter, setCounter] = useState(0);
    const [isSelected, setSelected] = useState(false);
    const change = (e) => {
        setQuery(e.target.value);
        if (!e.target.value) {
            props.callback({ value: "" }, props.name);
        }
    }

    useEffect(() => {
        if (isSelected) {
            setData([]);
        } else {
            let dt = props.data?.filter(post =>
                post.label.toLowerCase().includes(query.toLowerCase())
            );
            dt = _.take(dt, 20);
            setData(dt);
        }

    }, [query, isSelected])



    useEffect(() => {
        if (!props.itemVal) {
            setQuery('');
            setSelected(false);
            return;
        }
        var item;
        if (props.name === 'manager') {
             item = props.data?.find(x => x.uniqueVal === String(props.itemVal));
        } else {
             item = props.data?.find(x => x.value === props.itemVal);
        }
        if (item) {
            setQuery(item.uniqueVal ? item.uniqueVal : item.label);
            setSelected(true);
        } else {
            setQuery('');
            setSelected(false);
        }
    }, [props.itemVal, props.data])

    // useEffect(() => {
    //     let obj = props.data?.find(x => x.value === String(props.itemVal));
    //     if(!obj) {
    //         setQuery('');
    //     }
    //     else {
    //         setQuery(obj.label);
    //     }

    //   }, [props.data]);

    const keyDown = (e) => {

        if (e.keyCode === 8 || e.keyCode === 46) {
            setSelected(false);
            props.callback({ value: "" }, props.name);
            setQuery('');
        }
        if (e.keyCode === 40) {
            setCounter(counter + 1);
        } if (e.keyCode === 38) {
            setCounter(counter - 1);
        }
        if (e.keyCode === 13 || e.keyCode === 9) {
            if (data.length > 0 && query) {
                setQuery(data[counter].uniqueVal ? data[counter].uniqueVal : data[counter].label);
                setSelected(true);

                if (!!data[counter])
                    props.callback(data[counter], props.name);
            }
            // else {
            //     if(e.keyCode === 9 && !isSelected) {
            //         setQuery('');
            //     }
            // }
        }
        if (e.key === 'Escape') {
            setData([]);
        }
    }

    const blur = (e) => {

        if (!isSelected)
            setQuery('');
    }

    const mouseClick = (e, item) => {
        if (!item)
            return;
        setQuery(item.uniqueVal ? item.uniqueVal : item.label);
        setSelected(true);
        props.callback(item, props.name);
    }

    return (
        <div className='search-list-parent'>
            <div className="form-group">
                <span className="has-float-label">
                    <input key={'searchable' + props.id} type={props.type} className="form-control" id={props.id} placeholder=' '
                        onBlur={(e) => blur(e)}
                        name={props.name} value={query} autoComplete={'off'}
                        onChange={(e) => change(e)} onKeyDown={(e) => keyDown(e)} onMouseDown={(e) => (e)} required={props.isRequired} ></input>
                    <label htmlFor={props.id}>{props.label}{(props.isRequired || props.showAsterisk) && <span style={{ color: 'red' }}>*</span>}</label>
                    <span className="form-label search-icon-newuser">
                        <button className="input-group-append search-icon-newuser btn btn-outline-secondary bg-white border-0 border ms-n5 mt-1" type="button">
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </span>
            </div>
            <div className="search-list">
                {query === '' || (query && query.length <= 2) ? [] :
                    data.map((post, index) => (
                        index === data.length - 1 ?
                            <div className={index === counter ? "color-box" : "box-last"} key={index} onMouseDown={(e) => mouseClick(e, post)}>
                                {post.label}
                            </div>

                            : <div className={index === counter ? "color-box" : "box"} key={index} onMouseDown={(e) => mouseClick(e, post)}>
                                {post.label}
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchableInput;