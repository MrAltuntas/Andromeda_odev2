let suggestions = [
    "ornek1",
    "ornek2"
];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const box = searchWrapper.querySelectorAll('.autocom-box');

let linkTag = searchWrapper.querySelector("a");
let webLink;

// input box ve önerilenlerin dışına tıklandığında kapanması için
window.addEventListener('click', function(e){
	
	if (searchWrapper.contains(e.target)){
  	console.log("iceri tiklandi")
  } else{
    white_space_remove();
    searchWrapper.classList.remove("active");
  }
})

// öneri kutusu kapandığında geriye kalan beyaz bölgeyi kapatıyor
function white_space_remove(){
    box.forEach(e => { 
        e.style.height = '0px';
   });
}

// kapanan öneri kutusunun tekrar açılabilmesi için eski haline getiriyor
function normal_height(){
    box.forEach(e => { 
        e.style.height = 'auto';
   });
}

// inputboxa tıklanışdığında önerilenlerin gözükmesi için
function show(){
    let emptyArray = [];
    emptyArray = suggestions.map((data)=>{
        // verileri li tagına koy
        return data = '<li>'+'<i id="suggestion_icon" class="far fa-clock"></i>'+ data +'</li>';
    });

    searchWrapper.classList.add("active"); //show autocomplete box
    showSuggestions(emptyArray);

    let allList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
        // onclik özelliği koyuyor
        allList[i].setAttribute("onclick", "select(this)");
    }

    normal_height();
}

// inputboxa yazı yazıldığında çalışıyor
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //kullanıcının girdiği veri
    let emptyArray = [];
    var control = true;

    if(userData){
        icon.onclick = ()=>{ // search iconuna tıklandığında yapılacaklar
            webLink = "https://www.google.com/search?q=" + userData;
            linkTag.setAttribute("href", webLink);

            suggestions.forEach(element => { // listede olup olmadığını kontrol etme
                console.log(element);
                if(userData == element){
                    control = false;
                }
            });

            if(control){
                suggestions.push(userData); // suggestions arrayimize search iconuna tıklandıktan sonra ekleme yapıyoruz
            }
            else{
                console.log("lisetede var")
            }
             
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
        white_space_remove();
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

    white_space_remove();
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    let shortcuts_header;
    let shortcuts;
    let recent;
    shortcuts_header = '<p class="search_head">' +"TRENDING SHORTCUTS"+'</p>';
    shortcuts = '<div id="messages" class="alert alert-info" role="alert">'+'<i class="fas fa-envelope-open-text">'+'</i>'+'Messages'+'</div>'+
    '<div id="attachments" class="alert alert-info" role="alert">'+'<i class="fas fa-envelope-open-text">'+'</i>'+'Attachments'+'</div>'+
    '<div id="people" class="alert alert-info" role="alert">'+'<i class="fas fa-envelope-open-text">'+'</i>'+'People'+'</div>';

    recent = '<p class="search_head">' +"RECENT SEARCH"+'</p>';
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }
    else{
        listData = list.join('');
    }

    suggBox.innerHTML =shortcuts_header+shortcuts +recent+ listData;
}
