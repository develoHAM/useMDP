import { useState } from "react";
import { calendarActions } from "../../../store/calendar";
import { useDispatch } from "react-redux";

export default function TodoListLi({todo,firstIndex,secondIndex}){
    const [ visible, setVisible ] = useState(false);
    const dispatch = useDispatch();

    const divHandleClick = () => {
        setVisible( prev => !prev )
        dispatch(calendarActions.setSelect([firstIndex,secondIndex]))

    }

    const liHandleClick = (thirdIndex) => {
        dispatch(calendarActions.setSelect([firstIndex,secondIndex,thirdIndex]))
    }

    return (
        <>
            <div onClick={divHandleClick}>{(secondIndex === 0) ? 'todo' : (secondIndex === 1) ? 'doing' : 'done'}</div>
            { visible && <ul>
                { todo.map( (plan,index) => <li key={index} onClick={()=>liHandleClick(index)}>{plan.title}</li>)}
            </ul>
            }
        </>
    )
}