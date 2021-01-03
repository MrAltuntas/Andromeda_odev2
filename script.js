let suggestions = [
    "ornek1",
    "ornek2"
];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");

let linkTag = searchWrapper.querySelector("a");
let webLink;

// input box ve önerilenlerin dışına tıklandığında kapanması için
window.addEventListener('click', function(e){
	
	if (searchWrapper.contains(e.target)){
  	console.log("iceri tiklandi")
  } else{
    searchWrapper.classList.remove("active");
  }
})

// inputboxa tıklanışdığında önerilenlerin gözükmesi için
function show(){
    let emptyArray = [];
    emptyArray = suggestions.map((data)=>{
        // verileri li tagına koy
        return data = '<li>'+ data +'</li>';
    });

    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);

    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        // geçmişte belirenlere onclik özelliği koyuyor
        allList[i].setAttribute("onclick", "select(this)");
    }
}

// inputboxa yazı yazıldığında çalışıyor
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //kullanıcının girdiği veri
    let emptyArray = [];

    if(userData){
        icon.onclick = ()=>{ // search iconuna tıklandığında yapılacaklar
            webLink = "https://www.google.com/search?q=" + userData;
            linkTag.setAttribute("href", webLink);
            console.log(userData);
            console.log(webLink);
            suggestions.push(userData); // suggestions arrayimize search iconuna tıklandıktan sonra ekleme yapıyoruz
            linkTag.click();
        }

        emptyArray = suggestions.filter((data)=>{
            //önerilerde gösterilicekleri userData ile başlayanlar şeklinde seçiyoruz
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });

        emptyArray = emptyArray.map((data)=>{
            return data = '<li>'+ data +'</li>';
        });

        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");

        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); 
    }
}

function select(element){
    let selectData = element.textContent;
    console.log(selectData)
    inputBox.value = selectData;

    icon.onclick = ()=>{
        webLink = "https://www.google.com/search?q=" + selectData;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }

    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }
    else{
        listData = list.join('');
    }
    
    suggBox.innerHTML = listData;
}
