import React from 'react';
import useCurrentWidth from './hooks/useCurrentHeight';
function InvoiceChildComp({item,itemColor}) {
    var sty = {}
    if(useCurrentWidth() < 600 ){
        sty = {
            ul:{
                listStyle: "none",
                background: itemColor,
                width: 308,
                padding: 10,
                marginTop: 30,
            },
            li:{
                margin: 10,
                border: "1px solid  #e02a24",
                padding: 10,
                borderBottomRightRadius:10,
                width: 270,
                height: 50,
                color: "#243c52",
                display: "flex",
                background: "#fff",
                justifyContent:" space-evenly",
            }

        }
    }
    else{
        sty = {
            ul:{
                listStyle: "none",
                background: itemColor,
                width: 778,
                padding: 10,
                marginTop: 30,
            },
            li:{
                margin: 10,
                border: "1px solid  #e02a24",
                padding: 10,
                borderBottomRightRadius:10,
                width: 720,
                color: "#243c52",
                display: "flex",
                background: "#fff",
                justifyContent:" space-evenly",
            },
            pe:{
                fontSize: 10,
            }

        }

    }
    return (
        <>
        {(item)  ? <>
         <ul className="" style={sty.ul}>

                
            {
                item.items.map((data , index) => {
                    
                        return(
                            <li style={sty.li}>
                                <p style={{fontSize: 13}}>{data.name} </p> <div>
                                <span style={{fontSize: 13}}>units-{data.item_count}</span></div> 
                                
                                <div style={{fontSize: 13}}> 
                                    Meal size- {data.item_qaun}
                                </div>
                                    
                                </li>
                        );
                        })
            }


            </ul>
            <p className="text-center">your bill amount is- ${item.bill}</p>
            </>:<h1>loading..</h1>}
        </>
    )
}

export default InvoiceChildComp



