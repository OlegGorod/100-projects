import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Muslim', salary: 800, rise: true, increase: false, id: 1 },
                { name: 'Antonio', salary: 3000, rise: false, increase: true, id: 2 },
                { name: 'Christina', salary: 5000, rise: false, increase: false, id: 3 },
                { name: 'David', salary: 1500, rise: false, increase: true, id: 4 },
                { name: 'Peter', salary: 700, rise: true, increase: false, id: 5 },
                { name: 'Tracy', salary: 4000, rise: false, increase: true, id: 6 },
                { name: 'Bob', salary: 900, rise: true, increase: false, id: 7},
                { name: 'Molvar', salary: 500, rise: false, increase: true, id: 8},
               
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 8;
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }


    onToggleIncrease = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, increase: !item.increase }
                } return item
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, rise: !item.rise }
                } return item
            })
        }))
    }

    onSearch = (items, term) => {
        if (items.length === 0) {
            return items
        }
        return items.filter(elem => {
            return (elem.name.indexOf(term) > -1)
        })
    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }

    onFilterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(elem => elem.rise)
            case 'moreThan1000':
                return items.filter(elem => elem.salary > 1000)
            default:
                return items;
        }
    }
    

    addItem = (name, salary) => {
        if (name && salary) {
            const newItem = {
                name,
                salary,
                increase: false,
                rise: false,
                id: this.maxId++
            }
            this.setState(({ data }) => {
                const newArr = [...data, newItem];

                return {

                    data: newArr
                }
            });
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    render() {
        const { data, term, filter } = this.state;
        const bonusEmployee = this.state.data.filter(item => item.increase);
        const searchName = this.onSearch(data, term);
        const visibleData = this.onFilterPost(searchName, filter);
        let bonusGuys = []
        bonusGuys = bonusEmployee.map(item => item.name);
        const nameBonusEmployee = bonusGuys.join(', ');
        const lengthEmployees = this.state.data.length;
        return (
            <div className="app">
                <AppInfo
                    nameBonusEmployee={nameBonusEmployee}
                    lengthEmployees={lengthEmployees} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
                </div>

                <EmployeesList
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                    data={visibleData}
                    onDelete={this.deleteItem} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        );
    }
}

export default App;