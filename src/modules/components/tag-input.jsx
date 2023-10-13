import React, { useEffect, useState } from 'react';

const TagInput = (props) => {
    // const [value, SetValue] = useState('');
    const [tags, setTags] = useState([])
    const [tagName, setTagName] = useState("")
    const [isChange, setIsChange] = useState(false)
    const [error, setError] = useState('')
    const change = (e, callback) => {
        setTagName(e.target.value.trim());
        // callback(e, "input");
    }

    const addTag = (tag) => {
        if (tag !== "") { // Check empty tag
            if (!tags.includes(tag)) { // Check if same tag already added
                if (!tag.includes(' ')) { // Check if tag name contains a space
                    setError('')
                    setTags([...tags, tag])
                    setTagName('')
                } else {
                    setError('Tag should not contains space')
                }
            } else {
                setError('Tag already added')
            }
        } else {
            setError('Tag name is required')
        }
    }


    const onKeyDownHandler = (e) => {
        if (e.which === 32) { // SpaceBar clicked
            addTag(e.target.value.trim())
            setIsChange(!isChange)
        } else if (e.which === 13) { // enter clicked
            addTag(e.target.value.trim())
            setIsChange(!isChange)
        } else if (tagName.length <= 0) {
            if (e.which === 8) { // backspace clicked
                const tagsA = tags.slice(0, -1)
                setTags(tagsA)
                setTagName('')
                setError('')
                setIsChange(!isChange)
            }
        }
    }

    const removeTagHandle = (id) => {
        tags.splice(id, 1)
        setTags(tags)
        setIsChange(!isChange)
    }

    useEffect(() => {
        setTags(tags)
        props.onTagsChange(tags)
    }, [isChange])

    useEffect(() => {
        setTags(!!props.itemVal ? props.itemVal : [])
    }, [props.itemVal])

    const blur = (e) => {

    }

    return (
        <div key={props.primaryKey + 'div'} style={{ width: '-webkit-fill-available' }} >
            <div className="form-group mb-3">
                <span className="has-float-label">
                    <div className="tag-container">
                        <ul className={`${props.className && 'big-size-tag'}`}>
                            {!!tags && tags.map((optionEle, index) => (
                                <li key={optionEle + index}>{optionEle}<i className="fa fa-times" onClick={() => { removeTagHandle(index) }}></i></li>
                            ))}
                            <input type="textarea"
                                onKeyDown={(e) => onKeyDownHandler(e)} onChange={(e) => change(e)} value={tagName} placeholder='Add a tag' />
                        </ul>
                    </div>
                </span>
            </div>
            {error && <label className="text-danger error-message error-label">{error}</label>}
        </div >
    )
}

export default TagInput;