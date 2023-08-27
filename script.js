let server = 'http://localhost:5000';
let dom = (i) => {
    return document.getElementById(i);
}

resultArr = [];

let fetchData = async (query) => {
    resultArr = [];
    if (query) {
        let movieData = await fetch(`${server}/search/${encodeURIComponent(query)}`, { method: "GET" });
        let movieObj = await movieData.json();
        resultArr = movieObj.body;
    }
    console.log(resultArr);
}

let openStream = (id) => {
    window.open(`/player.html?source=${id}`)
}

//reference
let input = dom("input");

//Execute function on keyup
input.addEventListener("keyup", async (e) => {
    //loop through above array
    //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
    // removeElements();
    dom('list').innerHTML = '';
    resultArr = [];
    await fetchData(input.value);
    resultArr.forEach(item => {
        dom('list').innerHTML += `<li class="list-items" style="cursor: pointer;" onclick="openStream('${item.id}')">${item.title}</li>`;

    })
    // for (let i of sortedNames) {
    //     //convert input to lowercase and compare with each string

    //     if (
    //         i.toLowerCase().startsWith(input.value.toLowerCase()) &&
    //         input.value != ""
    //     ) {
    //         //create li element
    //         let listItem = document.createElement("li");
    //         //One common class name
    //         listItem.classList.add("list-items");
    //         listItem.style.cursor = "pointer";
    //         listItem.setAttribute("onclick", "displayNames('" + i + "')");
    //         //Display matched part in bold
    //         let word = "<b>" + i.substr(0, input.value.length) + "</b>";
    //         word += i.substr(input.value.length);
    //         //display the value in array
    //         listItem.innerHTML = word;
    //         document.querySelector(".list").appendChild(listItem);
    //     }
    // }
});