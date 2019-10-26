import React from 'react';
import logo from './logo.svg';
import './App.css';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
     data: {},
     free: [],
     paid: [],
     search: ''
    }
  }
  componentDidMount(){
   
  fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences',
  {
   method: 'GET',
   headers: {
    'Content-Type':'application/json',
  },
      
  }).then(response => {
    response.json().then(res => {
      this.setState({
        data: res,
        free: res.free,
        paid: res.paid
      })
    })
  },err => {
    console.log(err)
  });
}

onSerachChange =(e) => {
  this.setState({
     search: (e.target.value)
  })
}

onSearchClick = (e) => {
  const search = this.state.search
  // console.log(search)
  if(search) {
    const { free, paid } = this.state.data
    const freeNew = free.filter(item => {
      if(`${item.confName}${item.city}`.indexOf(`${search}`) >= 0) {
        return item
      }
    })
    const paidNew = paid.filter(item => {
      if(`${item.confName}${item.city}`.indexOf(`${search}`) >= 0) {
        return item
      }
    })
    // console.log(freeNew, paidNew)
    this.setState({
      free: freeNew,
      paid: paidNew
    })
  } else {
    this.setState({
      free: this.state.data.free,
      paid: this.state.data.paid
    })
  }
}


render(){
  const { free, paid } = this.state
  return (
    <div>
          <div className="search-position-wrapper">
              
              <input onChange= {this.onSerachChange} className="search-wrapper" type="text" placeholder="search name or city" name="search" ></input>
              <button className="button-wrapper" onClick={this.onSearchClick}>search</button>
          </div>
            <div className="container-wrapper"> 
             {free && free.map((item, x) => {
          return(
              <div key={x} className="container">
                <img className = "image-wrapper" src = "https://storage.googleapis.com/konfhub-bd9c9.appspot.com/5178.jpg?Expires=4715579787&GoogleAccessId=firebase-adminsdk-r3qh4%40konfhub-bd9c9.iam.gserviceaccount.com&Signature=VC8XdMeIGVi6oAHwWlCApO4MVNlB9lV41kLrlmTzg%2FrIvQzQ9FPPRGEKoIFWcCHwQ6EsLvqQlHe8SCQBu60xPwx%2FGhT3FuRvRA2C8%2BBGcXgQHpf6m6FlCTxwMbaZ0PpzCcZdZtCkXBJmZlOVc8CbZ3VHZahCiUEClS5YxoArePt5ygE1uVPOkV0Qk%2FQgZdyrZF0z0xDSYERqyQKWf20VE4FI%2BrlaOKR7wFBwBrT%2FE4bhCy7TDnPxHV29wB4Md0Zp58ODXmkqRpXExnO%2BsLpS8jevfq2HRGNE3NNRYj4EEvTax8w4pArwDapxGXJRoVwa1S%2BjLJqx5obpCz%2FNrWWzCQ%3D%3D"/>
                <span>Name:{item.confName}</span>
                <span>City: {item.city}</span>
                <span>Date:{item.confStartDate}</span>
                <span>EntryType:{item.entryType}</span>
                <span>URL:{item.confRegUrl}</span>
              </div>
             )
      })}
      {paid && paid.map((item, y) => {
        return(
          <div key={y} className="container">
            <img className = "image-wrapper" src = "https://storage.googleapis.com/konfhub-bd9c9.appspot.com/5178.jpg?Expires=4715579787&GoogleAccessId=firebase-adminsdk-r3qh4%40konfhub-bd9c9.iam.gserviceaccount.com&Signature=VC8XdMeIGVi6oAHwWlCApO4MVNlB9lV41kLrlmTzg%2FrIvQzQ9FPPRGEKoIFWcCHwQ6EsLvqQlHe8SCQBu60xPwx%2FGhT3FuRvRA2C8%2BBGcXgQHpf6m6FlCTxwMbaZ0PpzCcZdZtCkXBJmZlOVc8CbZ3VHZahCiUEClS5YxoArePt5ygE1uVPOkV0Qk%2FQgZdyrZF0z0xDSYERqyQKWf20VE4FI%2BrlaOKR7wFBwBrT%2FE4bhCy7TDnPxHV29wB4Md0Zp58ODXmkqRpXExnO%2BsLpS8jevfq2HRGNE3NNRYj4EEvTax8w4pArwDapxGXJRoVwa1S%2BjLJqx5obpCz%2FNrWWzCQ%3D%3D"/>
            <span>Name:{item.confName}</span>
            <span>City: {item.city}</span>
            <span>Date:{item.confStartDate}</span>
            <span>EntryType:{item.entryType}</span>
            <span>URL:{item.confRegUrl}</span>
          </div>
        )
      })}
     </div>
    </div>
  
  );
}

}

export default App;
