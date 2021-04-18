const numberInput = document.getElementById('numberInput');
const ajaxbtn = document.getElementById('ajaxbtn');
const fetchbtn = document.getElementById('fetchbtn');
const asyncbtn = document.getElementById('asyncbtn');

const fact = document.querySelector('#fact');

const factText = document.getElementById('factText');
const alert = document.getElementById('alert');



if (numberInput.value ===""){
    fact.style.display= "none";
}


ajaxbtn.addEventListener('click', ajaxCallback);
fetchbtn.addEventListener('click', fetchCallback);
asyncbtn.addEventListener('click', asyncCallback);



function ajaxCallback(){
    fact.className = 'card';
    
    fact.className += ' bg-primary text-white';

    // init UI
    numberInput.value = "";
    hideFacts();
    factText.innerText= "";
    numberInput.addEventListener('input', getFactAjax);
}


function fetchCallback() {
    fact.className = 'card';

    fact.className += ' bg-success text-white';

    // init UI
    numberInput.value = "";
    hideFacts();
    factText.innerText= "";
    
    numberInput.addEventListener('input', getFactFetch);

}

function asyncCallback() {
    fact.className = 'card';

    fact.className += ' bg-warning text-dark';

    // init UI
    numberInput.value = "";
    hideFacts();
    factText.innerText= "";
    numberInput.addEventListener('input', getFactAsyncAwait);

}



function getFactAjax(){
    numberInput.removeEventListener('input', getFactFetch);
    numberInput.removeEventListener('input', getFactAsyncAwait);


    // Get the value of the input so that we get the fact of the number
    const number = numberInput.value;
    // Create xhr object
    const xhr = new XMLHttpRequest();

    // Open
    xhr.open("GET", `http://numbersapi.com/${number}`, true);

    // Fetch
    xhr.onload = function(){
        if(this.status === 200){
            if (number === null){
                hideFacts();
                showAlert();
            } else {
                hideFacts();
                fact.style.display= "block";
                factText.innerText= this.responseText;
            }
        }
    }

    // Send
    xhr.send();

}


function getFactFetch(){
    numberInput.removeEventListener('input', getFactAsyncAwait);
    numberInput.removeEventListener('input', getFactAjax);

    // Get the value of the input so that we get the fact of the number
    const number = numberInput.value;
    // with fetch all we have to do is write the word fetch and inside whetever we want to fetch
    fetch(`http://numbersapi.com/${number}`)
        // fetch returns promises so we have to use .then 
        .then(res => res.text())
        .then(data => {
            console.log(data);
            if (number === null){
                hideFacts();
                showAlert();
                
            } else {
                hideFacts();
                fact.style.display= "block";
                factText.innerText= data;
            }
        })
        // let's catch an error
        .catch(err => console.log(err));
}


function getFactAsyncAwait(){
    numberInput.removeEventListener('input', getFactFetch);
    numberInput.removeEventListener('input', getFactAsyncAwait);

    // async function
    async function AsyncAwait (){
    // Get the value of the input so that we get the fact of the number
    const number = numberInput.value;

    // await the response of the fetch call
    const response = await fetch (`http://numbersapi.com/${number}`);
    console.log(response);
    // We only proceed once its resolved
    const data = await response.text();

    // we only proceed once second promise is resolved
    if (number === null){
        fact.style.display= "none";
        hideFacts();
        showAlert();
        
    } else {
        hideFacts();
        fact.style.display= "block";
        factText.innerText= data;
    }
    }
    AsyncAwait().then(facts => console.log(facts));
}


function hideFacts(){
    fact.style.display= "none";
}

function showAlert(){
    alert.style.display = "block";
    setTimeout(function(){
        alert.remove();
    }, 1000);
}