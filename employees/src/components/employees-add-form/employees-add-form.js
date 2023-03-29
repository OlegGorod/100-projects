import { Component } from "react";
import "./employees-add-form.css";

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }



    render() {
        const { name, salary } = this.state;
        return (
            <div className="app-add-form">
                <h3>Add new employee</h3>
                <form
                    onSubmit={this.onSubmit}
                    className="add-form d-flex">
                    <input type="text"
                        onChange={this.onValueChange}
                        name="name"
                        value={name}
                        className="form-control new-post-label"
                        placeholder="What's his name" />
                    <input type="number"
                        onChange={this.onValueChange}
                        name="salary"
                        value={salary}
                        className="form-control new-post-label"
                        placeholder="Salary?" />

                    <button type="submit"
                        className="btn btn-outline-light">Add</button>
                </form>
            </div>

        )
    }
}

export default EmployeesAddForm


