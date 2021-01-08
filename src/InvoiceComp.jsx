import React,{useState,useEffect, useRef } from 'react';
import InvoiceChildComp from './InvoiceChildComp';

function InvoiceComp({closeModal, idata}) {
    let iList =JSON.parse(localStorage.getItem('Ilistst')) ;
    const [itemInvo, setItemInvo] = useState(null);
    
    const [itemCol, setItemCo] = useState("#e02a24");
    const [itemColSeter, setItemCoSeter] = useState(null);
    const componentRef = useRef();
    const handlePrint = () => {
        window.print();
    }
    let Colors = [
       
        "#162b3d","#e02a24","#0f70c5"
    ]

    useEffect(() => {
        if(iList){
                
            const data = iList.filter((item) => item.id === idata );
            setItemInvo(data[0]);
        }
        }, []);

     useEffect(() => {
       console.log(itemColSeter);
       setItemCo(Colors[itemColSeter]);
    }, [itemColSeter]);
    const closeModalLP = (f) => {
        closeModal(f);
    }
    console.log(itemInvo)
    return (
        <>
                
              <button type="submit" className="form-s2" onClick={() => closeModalLP(false)}>close</button>
              <button type="submit" className="form-s2 edit ml-3" onClick={handlePrint}>Print</button>
              
                {(idata && itemInvo )? <div>
                    <InvoiceChildComp  item={itemInvo} itemColor={itemCol}/>
                <div className="ColorBox">
                    <p>change color of invoice </p>
                <button  className="colorbtn c1 " onClick={() => {setItemCoSeter(0)}}></button>
                <button  className="colorbtn c2" onClick={() => {setItemCoSeter(1)}}></button>
                <button className="colorbtn c3" onClick={() => {setItemCoSeter(2)}}></button>
                </div>
                
                </div>: <h1>loading...</h1> }
              
        </>
    )
}

export default InvoiceComp
