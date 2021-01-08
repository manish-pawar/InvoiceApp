import React, {useState, useEffect} from 'react'
import ItemSearch from './ItemSearch';
import Modal from "react-modal";
import InvoiceComp from './InvoiceComp';
import useCurrentWidth from './hooks/useCurrentHeight';

function InvoceList({backFunc}) {
    
    let iList =JSON.parse(localStorage.getItem('Ilistst')) 
    const [items, setItems] = useState([]);
    const [invoItem, setInvoItem] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [itemSearch, setItemSearch] = useState("");
    const [modalInvoice, setModalInvoice] = useState(false);
    
    const [statusSearch, setStatusSearch] = useState("");
    
    const [deleteId, setDeleteId] = useState(null);
    
    const [updateId, setUpdateId] = useState(null);
    
    const [invoId, setInvoId] = useState(null);
    
    const [invoIdMod, setInvoIdMod] = useState(null);


    function searchFunc(arr ,s ){
    
        let r =  [];
        arr.forEach((child , index ) => {
            let di = child.items.filter((item) => item.name.match(s));
            if(di.length > 0){
                r.push(child);
            }
        });
        return r;
      };
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
              height: "600px",
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
    

    useEffect(() => {
        if(iList){
                
            const data = searchFunc(iList, itemSearch);
            console.log(itemSearch);
            console.log(data);
            if (data.length > 0) {
            setItems(data);
                }
        }

            setLoading(false);
        }, [itemSearch]);
    useEffect(() => {
        if(iList){
            const data = iList.filter((item) => item.status.match(statusSearch));
            console.log(statusSearch);
            console.log(data);
            if (data.length > 0) {
            setItems(data);
            }
        }
         setLoading(false);
    }, [statusSearch]);  
    useEffect(() => {
        if(iList && deleteId >= 0 && deleteId){
            const data = iList.filter((item) => item.id !== deleteId );
            console.log(data)
            if (data.length > 0) {
            setItems(data);
            }else{
                setItems([]);
            }
            
            localStorage.setItem("Ilistst" ,JSON.stringify(data));
            console.log(deleteId);
        }
    }, [deleteId]); 
    useEffect(() => {
        if(iList && updateId >= 0 && updateId){
            let data = []
            iList.forEach((child , index ) => {
                if(child.id === updateId){
                    console.log(child.status);
                    child.status = "Paid";
                    console.log(child.status);
                }
            });
            data = iList;
            console.log(data);
            if (data.length > 0) {
            setItems(data);
            }
            
            localStorage.setItem("Ilistst" ,JSON.stringify(data));
            console.log(updateId);
        }
        console.log(updateId);
    }, [updateId]); 

    const backf = () => {
        backFunc(false);
    }
    useEffect(() => {
        if(invoIdMod ) setModalInvoice(true);
    }, [invoIdMod]);
    useEffect(() => {
        if(iList && invoId >= 0 && invoId){
            const data = iList.filter((item) => item.id === invoId );
            if (data.length > 0) {
            setInvoItem(invoId);
            }
            setInvoIdMod(invoId)
            console.log(invoItem);
        }
    }, [invoId]);
    
    return (
        <div>
          <button className="form-s2" onClick={backf}>Go back</button> 
          <h5 className="text-center">Filter your invoices</h5>
          <div className="searchBox">
                  <ItemSearch
                    getQuery={(q) => {
                      setItemSearch(q);
                    }}
                  />
                  <select name="food-opt" id="food-o"  onChange={(e) => {setStatusSearch(e.target.value)}}>
                                    <option value="Paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                      
                    </select>
                </div>
          {
              (iList) ? ((iList.length > 0 ) ? <ul className="iul">
              {    
                 
                  items.map((data , index) => {
                      return(
                              <li>
                                  
                                  <h5 className="sumdes1">Invoice-{data.id}</h5> 
                                  <div className="listofi">
                                  <p>{data.status} bill amount - ${data.bill}</p>
                                  
                                  {(data.status === "Paid")?<button className="form-s2  " onClick ={() => setInvoId(data.id)}>Invoice</button> : <button className="form-s2 edit"  onClick={() => setUpdateId(data.id)}>Pay</button>}
                                  <button className="form-s2 delete" onClick={() => setDeleteId(data.id)}>Delete</button> 
                                  </div>
                                  
                                  <p className="sumdes">You ordered- {data.items.map(d => {return(<span>{d.name}, </span>)})}</p>
                              </li>
                      )})
              }
            </ul>:
                <div className="alertBox">
                <h5>Oopps !! Empty invoice list  </h5>
                </div>
            
            ):
            <div className="alertBox">
                <h5>Oopps !!You dont have any invoices </h5>
                </div>
          }

<Modal isOpen={modalInvoice} onRequestClose={() => setModalInvoice(false)}
         style={settings
        }
        >
           <div className="bg">
              
            <InvoiceComp
                idata={invoItem}
              closeModal={setModalInvoice}/>
            </div>
        </Modal>
          
        </div>
    )
}

export default InvoceList
