function fetchVocab() 
{
    var search_vocab = document.getElementById("search_value").value
    var request = new XMLHttpRequest()
    var create_display = ""
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/'+search_vocab, true)

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
        data.forEach((word) => {
            var meaning = word.meanings
            var origin = ""
            if (word.origin){
                origin = word.origin
            }
            meaning.forEach((info) => {
                create_display += createParagraph(word.word, 'h1') + "<i>" + createParagraph(word.phonetic) + createParagraph(info.partOfSpeech) + "</i><b>Origin</b><br>" + 
                createParagraph(origin) + "<b>Meaning</b><br>"

                info.definitions.forEach((defin) => {
                    create_display += createParagraph(defin.definition) +"<hr style=\"height:0px;color:gray;background-color:gray\">"
                })
            })
            //console.log(create_display)
            document.getElementById("display").innerHTML = create_display
        })
        } else {
            document.getElementById("display").innerHTML = "Not Found"
        }
      }
      request.send()
      derivative()
}

function derivative() {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", "/derivative.csv", true);
    console.log(txtFile.responseText)
    txtFile.onreadystatechange = function()
    {
        allText = txtFile.responseText;
        allTextLines = allText.split(/\r\n|\n/);
        console.log(allTextLines)
    }
    
    
}




//this function return tag element as a string, dafault tag is a paragraph
function createParagraph(str, tag = 'p') {
    let element = document.createElement(tag)
    element.textContent = str
    return element.outerHTML
}

