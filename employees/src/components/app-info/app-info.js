import './app-info.css'

const AppInfo = (props) => {
    const {lengthEmployees, nameBonusEmployee} = props;
    return (
        <div className="app-info">
            <h1>Total number of employees: {lengthEmployees}</h1>
            <h2>The bonus goes to: <span>{nameBonusEmployee}</span></h2>
        </div>
    )
}

export default AppInfo