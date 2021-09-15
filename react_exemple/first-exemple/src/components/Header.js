import Buttons from './Buttons'

const Header = ({title, onAdd, showAdd}) => {
    
    return (
        <header className="header">
            <h1>Task tracker {title}</h1>
            <Buttons color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} 
            onClick={onAdd} />
            {/* <Buttons color="blue" text="from" /> */}
            {/* <Buttons color="red" text="Mars" /> */}
        </header>
    )
}

export default Header
