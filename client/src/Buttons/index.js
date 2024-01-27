import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faClose, faUserPlus, faEdit, faTrashCan, faPlusCircle, faRefresh, faEye, faEyeSlash, faImages, faCartPlus } from "@fortawesome/free-solid-svg-icons";


export const AddNewButton = ({ onClick, disabled = false }) => {

    return (
        <button className='text-green-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()} disabled={disabled}>
            {<FontAwesomeIcon icon={faUserPlus} />} Add New
        </button>
    )
}

export const New = ({ name, setFormHidden }) => {
    return (
        <button className='text-green-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => { setFormHidden(false); }}>
            {<FontAwesomeIcon icon={faPlusCircle} />} Add {name}
        </button>
    )
}

export const GenerateButton = ({ onClick, hidden }) => {
    return (
        <button className='text-green-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => { onClick(); }} hidden={hidden}>
            {<FontAwesomeIcon icon={faRefresh} />} Generate
        </button>
    )
}

export const Delete = ({ onClick }) => {
    return (
        <button className='text-red-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faTrashCan} />}
        </button>
    )
}

export const NewButton = ({ onClick }) => {
    return (
        <button className='text-green-600 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => { onClick(); }}>
            {<FontAwesomeIcon icon={faUserPlus} />} New
        </button>
    )
}

export const EditButton = ({ onClick }) => {
    return (
        <button className='text-yellow-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faEdit} />} Edit
        </button>
    )
}

export const EditButtonOnly = ({ onClick }) => {
    return (
        <button className='text-yellow-500 px-2 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faEdit} />}
        </button>
    )
}

export const SaveButton = ({ onClick }) => {
    return (
        <button className='text-blue-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faSave} />} Save
        </button>
    )
}

export const CloseButton = ({ onClick }) => {
    return (
        <button className='text-orange-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faClose} />} Close
        </button>
    )
}

export const DeleteButton = ({ onClick }) => {
    return (
        <button className='text-red-500 py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faTrashCan} />} Delete
        </button>
    )
}



export const CloseButtonOnly = ({ onClick }) => {
    return (
        <button className='text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => onClick()}>
            {<FontAwesomeIcon icon={faClose} />}
        </button>
    )
}


