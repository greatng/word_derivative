function fetchVocab() 
{
    var search_vocab = document.getElementById("search_value").value
    var request = new XMLHttpRequest()
    var create_display = ""
    var h1, p, p1
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/'+search_vocab, true)

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
        data.forEach((word) => {

            var meaning = word.meanings
            h1 = document.createElement('h1')
            h1.textContent = word.word
            console.log(h1.textContent)
            //create_display += "<b>Word</b><br>" + h1.outerHTML
            meaning.forEach((info) => {
                p = document.createElement('p')
                p.textContent = info.partOfSpeech
                console.log(p.textContent)
                create_display += h1.outerHTML + "<i>" + p.outerHTML + "</i>"

                info.definitions.forEach((defi_val) => {
                    p1 = document.createElement('p')
                    p1.textContent = defi_val.definition
                    console.log(defi_val.definition)
                    create_display += p1.outerHTML +"<hr style=\"height:2px;border-width:0;color:gray;background-color:gray\">"
                })
            })
            console.log(create_display)
            document.getElementById("display").innerHTML = create_display
        })
        } else {
            document.getElementById("display").innerHTML = "Not Found"
        }
      }
      request.send()
    /*fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+search_vocab)
        .then(response => response.json())
        .then(data => console.log(data));*/
    
}


