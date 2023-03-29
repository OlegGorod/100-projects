import EmployeeListItem from "../employees-list-item/employees-list-item";
import "./employees-list.css";

const EmployeeList = (props) => {
  const elements = props.data.map(item => {
    const { id, ...itemProps } = item
    return (
      <EmployeeListItem
        key={id}
        {...itemProps}
        onToggleIncrease={() => props.onToggleIncrease(id)}
        onToggleRise={() => props.onToggleRise(id)}
        onDelete={() => props.onDelete(id)}
      />
    )
  })

  return (
    <ul className="app-list list-group">
      {elements}
    </ul>
  )
}

export default EmployeeList


