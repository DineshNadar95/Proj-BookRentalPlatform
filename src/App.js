import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './firebase/Auth'
import MyBooks from "./components/Mybooks.component"
import AddBook from "./components/Addbook.component"
import RentalList from "./components/RentalList.component"
import EditBookInfo from './components/EditBookInfo.component'
import HelpPage from './components/HelpPage.component'
import ProfilePage from './components/ProfilePage.component'
// import LogOut from './components/LogOut.component'
import rentalConfirm from './components/rentalConfirm'
import ProfileUpdate from './components/profileUpdate.component'
/////
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Account from './components/Account';
import Changepassword from './components/Changepassword';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Forgotpassword from './components/Forgotpassword';
// import MyRentedBooks from './components/MyRentedBooks'
import AddUser from './components/SignupDetails';
// import SignOut from './components/Signout'
import Image from './components/Image'
import RentedBooks from "./components/MyRentedBooks";
// import PrivateRouteSignupDetails from './components/PrivateRouteSignupDetails'
import BooksList from './components/BooksList';
import BookView from './components/BookView';
import SocialSignupDetails from './components/SocialSignupDetails';
import ChatRoom from './components/ChatRoom';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <header >
            {/* <Landing/>   */}
            <Navigation />
          </header>
          <div >
            <Switch>
              <Route path="/" exact component={Landing} />
              <PrivateRoute exact path="/chat" component={ChatRoom} />

              <PrivateRoute path="/profilePage" exact component={ProfilePage} />
              <Route path="/helpPage" exact component={HelpPage} />
              <PrivateRoute path="/editBook/:id" exact component={EditBookInfo} />
              <PrivateRoute path="/rentalList" exact component={RentalList} />
              <PrivateRoute path="/addBook" exact component={AddBook} />
              <PrivateRoute path="/myBooks" exact component={MyBooks} />
              <PrivateRoute path="/rentalConfirm/:bid/:sid" exact component={rentalConfirm} />
              <PrivateRoute path="/Image" exact component={Image} />
              <PrivateRoute path="/profileUpdate/:id" exact component={ProfileUpdate} />

              <Route path='/signin' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/changepassword' component={Changepassword} />
              <PrivateRoute path='/home' component={Home} />
              <PrivateRoute path='/account' component={Account} />
              <PrivateRoute path='/signupdetails' component={AddUser} />
              <PrivateRoute path='/rentedbooks' component={RentedBooks} />

              <Route exact path="/books" component={BooksList} />
              <Route exact path="/book/:id" component={BookView} />
              {/* <PrivateRoute path='/signout' component={SignOut} /> */}
              <PrivateRoute path='/SocialSignupDetails' component={SocialSignupDetails} />
              <Route path="*" exact component={Landing} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    );
  }
}

export default App;