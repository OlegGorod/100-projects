import { Component } from 'react'
import './search-panel.css'

class SearchPanel extends Component {
  
    onUpdateSearch = (e) => {
        const value = e.target.value;
        this.props.onUpdateSearch(value)
    }

    render() {
        return (
            <input type="text"
                onChange={this.onUpdateSearch}
                className="form-control search-input"
                placeholder='Find employee' />
        )
    }

}

export default SearchPanel
