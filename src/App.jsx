import React , {useState, useEffect} from 'react';
import Modal from "react-modal";

import './App.css';
import LoImage from "./images/03-pre-work-visualisation.png";

import { datas } from "./Data"; 
import LiComp from './LiComp';
import InvoceList from './InvoceList';
import useCurrentWidth from "./hooks/useCurrentHeight";

function App() {
  const [userdata, setUserData] = useState({ email: '', pass:'',pass1:'' });
  const [addedCount, setAddedCount] = useState(0);
  const [addedDatas, setAddedData] = useState([]);
  const [addedDatasId, setAddedDataID] = useState([]);
  const [userpdata, setUserpData] = useState({ name: '', addr:'' });
  const [formSignIn, setFormSignIn] = useState(false);
  const [usergrant, setUsergrant] = useState(false);
  
  const [modalAddData, setModalAddData] = useState(false);
  
  const [toggleView, setToggleView] = useState(false);
  
  const [toggleView1, setToggleView1] = useState(false);
  var settings ={}
  if(useCurrentWidth() < 600 ){
    settings = {
      overlay:{
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(38, 36, 51, 0.36),
            rgba(21, 20, 26, 0.48) 31%
          )`,
          
          zIndex: 1999,
      },
      content:{
          position:"fixed",
          height: "500px",
          width:"330px",
          background:"#fff",
          margin:"auto",
          border: "none",
          zIndex: 1999,
          padding:10, 
      }
  }
 }
 else{
    settings = {
      overlay:{
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(38, 36, 51, 0.36),
            rgba(21, 20, 26, 0.48) 31%
          )`,
          
          zIndex: 1999,
      },
      content:{
          position:"fixed",
          height: "600px",
          width:"800px",
          background:"#fff",
          margin:"auto",
          border: "none",
          zIndex: 1999,
          padding:10, 
      }
  }
 };

  let useristhere =JSON.parse(localStorage.getItem('user'));
  
  let userhaveaccess =JSON.parse(localStorage.getItem('usermailcheck'));
  let addedIlists = JSON.parse(localStorage.getItem('addedIList'));
  // let usergrant = false;
  console.log(typeof useristhere);
  const onClickToggle = () => {
      setFormSignIn(!formSignIn);
      let subt=  document.getElementById('subtn');
      if(formSignIn){
       subt.classList.add('scrt');
      }
      else{
       subt.classList.remove('scrt');
      }
      
  }
  useEffect(() => {
        localStorage.setItem("addedIList", JSON.stringify(addedDatas));
  }, [addedDatas]);


  function userFinder(arr ,e,p ){
    
    let r =  false;
    arr.forEach((child , index ) => {
        if(child.mail === e && child.pass === p)
        {
          r = true
        }
    
    });
    return r;
  }
  function userFinder1(arr , m ){
    
    let r =  false;
    arr.forEach((child , index ) => {
        if(child.mail === m)
        {
          r = true
        }
    
    });
    return r;
  }

  const onAddedData = (e) => {
    if(formSignIn){
      let users= JSON.parse(localStorage.getItem('userlist1'));
      console.log(users);

      if(users){
        console.log('have user');
        let e =userdata.email;
        let p = userdata.pass;

        let result = userFinder(users, e, p);

        console.log(result);
        if(!result) {
            
            let u1 = 
            {
              mail: userdata.email,
              pass: userdata.pass
            };
          users.push(u1);
          
          localStorage.setItem("userlist1" ,JSON.stringify(users));
        }

      }
      else{
        let u = [
          {
            mail: userdata.email,
            pass: userdata.pass
          }
        ]
        console.log(u);
        localStorage.setItem("userlist1" ,JSON.stringify(u));
      }
      let userd= JSON.parse(localStorage.getItem('userdlist'));
      console.log(userd);
      
      let m = JSON.parse(localStorage.getItem("usermail"));
      if(userd){
        let result1 = userFinder1(userd, m);

        if(result1) {
            
            setUsergrant(true);
        };

      }
      setToggleView(true);
    }
    else{
      
      let users= JSON.parse(localStorage.getItem('userlist1'));
      console.log(users);

      let e =userdata.email;
      let p = userdata.pass;

      let result = userFinder(users, e, p);

      if(result) {
          
        localStorage.setItem("user" ,JSON.stringify(result));
        localStorage.setItem("usermail", JSON.stringify(userdata.email));
      };

      

    }
  }
  const onAddedDetail = (e) => {
    e.preventDefault();
    console.log("adding")
    
    console.log(JSON.parse(localStorage.getItem("usermail")));
    let maile = JSON.parse(localStorage.getItem("usermail"));

    
    let userd= JSON.parse(localStorage.getItem('userdlist'));
    console.log(userd);

    if(userd){
      console.log('have user detail');
          let u1 = 
          {
            mail:maile,
            name: userpdata.name,
            addr: userpdata.addr,
            
          };
        userd.push(u1);
        
        localStorage.setItem("userdlist" ,JSON.stringify(userd));
      

    }
    else{
      let u = [
        {
          mail: maile,
          name: userpdata.name,
          addr: userpdata.addr,
        }
      ]
      console.log(u);
      localStorage.setItem("userdlist" ,JSON.stringify(u));
    }
    setUsergrant(true);

    
  }
  const reloadFunc = () => {
    window.location.reload();

  }
  const logoutFunc = () => {
    localStorage.setItem("user" ,JSON.stringify(false));
    localStorage.setItem("usermailcheck", JSON.stringify(false));
    window.location.reload();
  }

  const addedToCart = (i) => {
      console.log(datas[i]);
      let d= datas[i];
      d["item_count"] = 1;
      d["item_qaun"] = "small";
      setAddedData([...addedDatas, d]);
      setAddedDataID([...addedDatasId, i]);
      setAddedCount(addedDatas.length + 1);
  }
  const incrementCount = (i, c) => {
    console.log(addedDatas[i]);
    let ad = addedDatas[i];
    
    console.log(ad.item_count);

    ad.item_count = c + 1;
    // setAddedData(addedDatas[i] = ad );
    console.log(typeof addedDatas);
  }
 
  const SignInForm = (
    <div className="login-box">
    <div className="lo-img-box">
        <button className="tbtn" onClick={onClickToggle}>click here to {!formSignIn? "Sign Up": "Sign In" }</button>
        <img src={LoImage} className="lo-img" alt="lo-image"/>
    </div>
    <div className="form-box">
          <h3 className="sign-in-text">{formSignIn? "SignUp": "SignIn" }</h3>
          <form onSubmit={onAddedData} >
          <small id="email" className="form-text text-muted">Email</small>
          <input type="text" className="form-c" placeholder="Enter your mail"
          value={userdata.email}  
          onChange={  e => setUserData( { ...userdata , email: e.target.value})}/>  
          
          <small id="password" className="form-text text-muted">Password</small>
          <input type="password" className="form-c" placeholder="Enter your password"
          value={userdata.pass}  
          onChange={  e => setUserData( { ...userdata , pass: e.target.value})}/> 

          {
            formSignIn &&
            <>
            <small id="passwordC" className="form-text text-muted">Confirm Password</small>
            <input type="password" className="form-c" placeholder="Confirm your password"
            value={userdata.pass1}  
            onChange={  e => setUserData( { ...userdata , pass1: e.target.value})}/> </>
          }


          <button type="submit" className="form-s scrt" id="subtn">{formSignIn? "SignUp": "Sign in" }</button> 
          </form>
    </div>

  </div>
  );
    

  const InvoiveBox = (
    <div className="product-box">
        <h1>{userhaveaccess? (!usergrant&& "Add your info"): "Order"}</h1>
        <div className="icons">
          <button type="submit" className="form-s2" onClick={() => setToggleView1(true)}>Invoices</button> 
          <button type="submit" className="form-s2" onClick={logoutFunc}>logout</button> 
          {
            (addedCount > 0) && 
            <button type="submit" className="form-s2"  onClick ={() => setModalAddData(true)} >Order - {addedCount}</button> 
          }
        </div>
        {userhaveaccess?( !usergrant &&
           <form onSubmit={onAddedDetail} >
           <small id="email" className="form-text text-muted">Name</small>
           <input type="text" className="form-c1" placeholder="Enter name"
           value={userpdata.name}  
           onChange={  e => setUserpData( { ...userpdata , name: e.target.value})}/>  

           <small id="email" className="form-text text-muted">Address</small>
           <input type="text" className="form-c1" placeholder="Your adrress?"
           value={userpdata.addr}  
           onChange={  e => setUserpData( { ...userpdata , addr: e.target.value})}/> 
           
          
 
 
           <button type="submit" className="form-s1"  >Submit</button> 
           </form>)
        :
        <div className="items">
        {
          datas.map(data => {
            return(
                <div className="item" key={data.id}>
                    <h5>{data.name}</h5>
                    <p>{data.description}</p>
                    <p>Price:- {data.price} , ratings: -{ data.rating}</p>
                    {
                      (addedDatasId.includes(data.id))?
                        <button type="submit" className="ibtn" >Added</button> :
                        <button type="submit" className="ibtn" onClick={() => addedToCart(data.id)}>Add</button> 

                    }
                </div>
            );
          })
        }
      </div>
        }
        
        

      </div>
  )


  return (
    <div className="App">
        {toggleView1 ? <InvoceList backFunc={setToggleView1} />: 
       <>{useristhere? InvoiveBox : SignInForm}
        <Modal isOpen={modalAddData} onRequestClose={() => setModalAddData(false)}
         style={
            settings
        }
        >
           <div className="bg">
              
            <LiComp addedItems={addedDatas}
             manAddedD={() => {reloadFunc()}}
              closeModal={setModalAddData}/>
            </div>
        </Modal></>}
    </div>
  );
}

export default App;
