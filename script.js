const create = (function(){
    //create element
    const ele = function(ele) {
        return document.createElement(ele)
    }
    // Insert Text into element
    const text = function(ele , type , text){
        let element = "";
        if(type === "content"){
            element = ele.textContent = text
        }else if(type === "innert"){
            element = ele.innerText = text
        }
        return element;
    }
    // Set multi attributes in single Object to element
    const setAttr = function (ele , attributes){
        for(const key in attributes){
            ele.setAttribute(key , attributes[key])
        }
    }

    return {
        ele,
        text,
        setAttr
    }
})()


const DOM = {
    input : document.getElementById("input"),
    addButton : document.getElementById("add"),
    error : document.getElementById("errorMsg"),
    container : document.getElementById("list"),
}

const insertAndDisplay = (function (){
    const keys = localStorage.length;

    const displayData = function() {
        const allData = Object.entries(localStorage);
        
        const deleteItem =  function(data){
            localStorage.removeItem(data);
            window.location.reload();
        }

        allData.forEach(data => {
            //DOM Creator
            const item = create.ele("li");
            create.setAttr(item, {
                class : data[0]
            })
            //||||||||||||||||||||||||||||||||||||||||||||
            const textSpan = create.ele("span");
            create.setAttr(textSpan, {
                class : "itemTextContainer"
            })
            create.text(textSpan , 'content' , data[1]);
            //||||||||||||||||||||||||||||||||||||||||||||
            const buttonSpan = create.ele("span");
            create.setAttr(buttonSpan, {
                class : "itemButtonsContainer"
            })
            const button = create.ele('button');
            create.text(button , "content" , "Delete")
            buttonSpan.appendChild(button);
            //||||||||||||||||||||||||||||||||||||||||||||

            item.appendChild(textSpan);
            item.appendChild(buttonSpan)

            DOM.container.appendChild(item)
            //||||||||||||||||||||||||||||||||||||||||||||

            button.addEventListener("click" , () => deleteItem(data[0]))
        })
    }
    
    const insertToStorage = function (){
        
        if(DOM.input.value){
            // insert data to local Storage
            localStorage.setItem(`item_${keys}` , DOM.input.value)
            window.location.reload()
        }else{
            // error message
            DOM.error.textContent = "You must insert data!";
            DOM.error.style.display = "block";
            setTimeout(()=> {
                DOM.error.textContent = "";
                DOM.error.style.display = "none";
            } ,2000)
        }
    }



    return {
        insertToStorage,
        displayData
    }
})()

DOM.addButton.addEventListener("click" , insertAndDisplay.insertToStorage)
window.addEventListener("load" , insertAndDisplay.displayData);












// const input = document.getElementById("input");
// const button = document.getElementById("add");
// const listContainer = document.getElementById("listContainer");

// const displayItem = (text , num) => {
//     text.forEach(note => {
//         const item = document.createElement('li');
//         item.setAttribute("class" , "item");
//         item.setAttribute("id" , "item_"+numberOfKey);
//         const spanText = document.createElement("span");
//         spanText.setAttribute("class" , "itemTextContainer");
//         spanText.textContent = note;
//         item.appendChild(spanText);
//         const spanButton = document.createElement("span");
//         const btn = document.createElement("button");
//         btn.textContent = "Delete";
//         spanButton.setAttribute("class" , "itemButtonsContainer");
//         spanButton.appendChild(btn);
//         item.appendChild(spanButton);
//         listContainer.appendChild(item);      
//     })
// }

// const setInputData = () => {
//     let numberOfKey = localStorage.getItem("numberOfKey");
//     const arr = JSON.parse(localStorage.getItem("list"));
//     if(input.value){
//         localStorage.setItem("numberOfKey" , numberOfKey++)
//         arr.push(input.value);
//         localStorage.setItem("list" ,JSON.stringify(arr))
//         window.location = "./";
//     }else{
//         console.log("please insert Data")
//     }
// }

// button.addEventListener("click" , setInputData);
// displayItem(JSON.parse(localStorage.getItem("list")))
