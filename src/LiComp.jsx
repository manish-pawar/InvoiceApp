import React, { useState,useEffect} from 'react'

function LiComp({closeModal,manAddedD}) {

   let arril = JSON.parse(localStorage.getItem('addedIList'));
    console.log(arril);

    useEffect(() => {
        
        console.log("hi");
    }, []);
    let ps = document.getElementsByTagName("span");
    let sl = document.getElementsByTagName("select");
    let mnbl = document.getElementsByClassName("ibtm");
    let adbl = document.getElementsByClassName("ibtp");
    const decrementCount = (i, c) => {
        console.log(arril[i]);
        let ad = arril[i];
        
        console.log(ad.item_count);
        if(ad.item_count < 2){
            console.log("dece");
        }else{
        ad.item_count = ad.item_count - 1;
        ps[i].innerHTML = ad.item_count;
        console.log(arril);
        }

        localStorage.setItem("addedIList", JSON.stringify(arril));
      }
    const incrementCount = (i, c) => {
        console.log(arril[i]);
        let ad = arril[i];
        
        console.log(ad.item_count);
        if(ad.item_count > 4 ){
            console.log("extended")
        }else{
            ad.item_count = ad.item_count + 1;
            ps[i].innerHTML = ad.item_count;
            console.log(arril);
        }
        localStorage.setItem("addedIList", JSON.stringify(arril));
      }
      const changePref = (i, v) => {
          console.log(v);
          console.log(arril[i]);
        let ad = arril[i];
        
        console.log(ad.item_qaun);
    
        ad.item_qaun = v
        sl[i].value = v;
        console.log(arril);
        localStorage.setItem("addedIList", JSON.stringify(arril));

      }
      const closeModalLP = (f) => {
          closeModal(f);
      }
      function amountCalculator(arr  ){
        let a = 0
        arr.forEach((child , index ) => {
            a = a + child.item_count * child.price;
            console.log(a);
            console.log(child.item_count * child.price);
            console.log(child.item_count );
            console.log(child.price);
        });
        return a;
      }
      const onProceed = () => {
        console.log("adding Invoice")
        
    
        
        let iList= JSON.parse(localStorage.getItem('Ilistst'));
        console.log(iList);
    
        if(iList && iList.length > 0){
          console.log('have user detail');
            let ammoun = amountCalculator(arril);
            console.log(ammoun);
            let len = iList.length;
            let lastI = iList[len - 1].id;
            console.log(lastI);
            let u = {id: lastI + 1 ,items: arril, status: "unpaid", bill: ammoun}
            
            iList.push(u);
            
            localStorage.setItem("Ilistst" ,JSON.stringify(iList));
            
            localStorage.setItem("addedIList", JSON.stringify([]));
            manAddedD([]);
          
    
        }
        else{
            
            let ammoun = amountCalculator(arril);
            console.log(ammoun);
          let u = [
            {id:1, items: arril, status: "unpaid", bill: ammoun}
          ]
          localStorage.setItem("Ilistst" ,JSON.stringify(u));
          localStorage.setItem("addedIList", JSON.stringify([]));
          
          manAddedD();
          
      window.location.reload();
        };
        closeModalLP(false);
    
        
      }
    return (
        <>
                
              <button type="submit" className="form-s2" onClick={() => closeModalLP(false)}>close</button> 
                <ul className="dlist">
                   
                   {
                arril.map((data , index) => {
                      
                          console.log(JSON.parse(localStorage.getItem('addedIList')));
                          console.log(data.item_count); 
                          return(
                              <li>
                                <p className="dname">{data.name} </p> <div><button className="ibt ibtm"
                                onClick={() => {  
                                    decrementCount(index);
                                    } }
                                >-</button><span>{data.item_count}</span><button className="ibt ibtp" onClick={() => {  
                                    incrementCount(index);
                                    } }>+</button></div> 
                                  
                                   <div className="dname"> 
                                       
                                  <select name="food-opt" id="food-o"  onChange={(e) => {changePref(index, e.target.value)}}>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                      
                                  </select></div>
                                    
                                </li>
                          );
                        })}


                </ul>
                
          <button className="form-s2" onClick={onProceed}>Proceed</button> 
        </>
    )
}

export default LiComp




// { addedDatasId.map((data , index)=> {
                      
//     console.log(JSON.parse(localStorage.getItem('addedIList')));
//     let arrd = addedDatas
//     console.log(addedDatasId);
//     console.log(addedDatas);
//     return(
//         <li>
//           <p className="dname">{addedDatas[index].name} </p> <div> <button className="ibt">-</button>{addedDatas[index].item_count}<button className="ibt" onClick={() => setAddedData(...addedDatas,  addedDatas[index].item_count = addedDatas[index].item_count + 1 )}>+</button></div> 
            
              
//             <select name="food-opt" id="food-o">
//               <option value="small">Small</option>
//               <option value="medium">Medium</option>
//               <option value="large">Large</option>

//             </select>
              
//           </li>
//     );
//   })}