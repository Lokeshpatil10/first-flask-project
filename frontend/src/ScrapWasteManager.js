import React from 'react';
import axios from 'axios';
import './ScrapWasteManager.css'

class ScrapWasteManager extends React.Component {
  state = {
    pincode: '',
    managers: [],
    error: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/managers',{'pincode': this.state.pincode}).then(
        res => {
          if (Object.keys(res.data).length===0)
          {
            this.setState({managers: [], error: 'No Managers Found.'})
          }
          else
          {
            this.setState({managers: res.data, error: ''})
          }
        }).catch(err=>{
          this.setState({managers: [], error: 'No Managers Found.'})
          console.error('Error fetching managers:', err);
      });
  }

  render()
  {
    return (
      <div id='container'>
        <div id='header'>
          Scrap Waste Manager
        </div>
        <div id='form'>
          <form onSubmit={this.handleSubmit}>
            <input id='input' type="text" value={this.state.pincode} onChange={(e) => this.setState({pincode: e.target.value})} />
            <button id ='button' type="submit">Search</button>
          </form>
        </div>
        <div id='display'>
          <p>{this.state.error}</p>
          {this.state.managers.map((manager)=>{
              return <p id='info' key={manager.phone}><br/>Name: {manager.name}<br/>Contact No. {manager.phone}<br/></p>
          })}
        </div>
      </div>
    );
  }
};

export default ScrapWasteManager;
