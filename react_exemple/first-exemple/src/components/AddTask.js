import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [remainder, setRemainder] = useState(false)
    const onSubmit = (e)=>{
        e.preventDefault()
        if(!text){
            alert("Please add text")
            return
        }
        onAdd({ text, day, remainder })
        setText('')
        setDay('')
        setRemainder(false)
    }
    return (
        <form className="form" method="POST" onSubmit={onSubmit}>
            <div className="form__control ">
                <label>Task</label>
                <input type="text" placeholder="add Task"
                value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form__control">
                <label>Day and Time</label>
                <input type="text" placeholder="add day and time"
                value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form__control">
                <label>Set Remainder</label>
                <input type="checkbox"
                value={remainder} checked={remainder} onChange={(e) => setRemainder(e.currentTarget.checked)} />
            </div>

            <input className="btn btn__block" type="submit" value="Save Task" />
        </form>
    )
}

export default AddTask
