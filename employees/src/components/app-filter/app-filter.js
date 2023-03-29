import './btn-group.css'

const AppFilter = (props) => {
    const buttonsData = [
        { label: 'All employees', name: 'all' },
        { label: 'Salary over 1000 $', name: 'moreThan1000' },
        { label: 'Rising', name: 'rise' }
    ]
    
    const buttons = buttonsData.map(({name,label}) => {
        const active = props.filter === name;
        const style = active ? 'btn-light' : 'btn-outline-light'
        return (
            <button type="button"
                key={name}
                onClick={() => props.onFilterSelect(name)}
                className={`btn ${style}`}>
                {label}
            </button>
        )
    })


    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter