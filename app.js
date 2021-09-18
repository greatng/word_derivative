//import word_list from "./wordList"
//import word_list from './modules/wordList.js';

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
            var meaning = word.meanings //show word definition
            var phonetics = word.phonetics 
            var origin = ""
            //let audio = "<audio control><source src=\"" + word.phonetics.text + " \"type=\"audio/mpeg\"></audio>"
            //console.log(typeof(phonetics), phonetics[0].audio)
            if (phonetics[0].audio){
                audio = "<audio controls><source src=\"" + phonetics[0].audio + " \"type=\"audio/mpeg\"></audio>" //get audio url
                //console.log(audio)
            } else {
                audio = ""
            }
            if (word.origin){
                origin = word.origin //show word origin if any
            }

            //this part create html tag
            meaning.forEach((info) => {
                create_display += createParagraph(word.word, 'h3') + audio + "<i>" + createParagraph(word.phonetic) + createParagraph(info.partOfSpeech) + "</i><b>Origin</b><br>" + 
                createParagraph(origin)

                info.definitions.forEach((defin) => {
                    create_display += "<b>Meaning</b><br>" + createParagraph(defin.definition) + "<b>Example</b>" + createParagraph(defin.example) + "<hr style=\"height:0px;color:gray;background-color:gray\">"
                })
            })
            //console.log(create_display)
            document.getElementById("display").innerHTML = create_display //sent html tag element to display
        })
        } else {
            document.getElementById("display").innerHTML = "Not Found" //if api call failed
        }
      }
      request.send()
      //search_div(search_vocab)
      //loadDoc(search_vocab)
}

/*function loadDoc(vocab) {
    var xhttp = new XMLHttpRequest();
    var allText = []
    var allTextLines = []
    var allWord = []
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        allText = this.responseText
        allTextLines = allText.split(/\r\n|\n/)
        for (let i = 0; i < allTextLines.length; i++){
            allWord[i] = []
            console.log(allTextLines[i])
            allWord[i] = allTextLines[i].split(",")
        }
        for (let i = 0; i < allWord.length; i++){
            for (let j = 0; j < allWord[i].length; j++){
                if (allWord[i][j].includes(vocab)){
                    document.getElementById("derivative").innerHTML = allWord[i][0] + "(verbs)" + allWord[i][1] + "(noun)" + allWord[i][2] + "(adj)" + allWord[i][3] + "(adv)"
                }
            }
        }
        console.log(allWord)
      }
    };
    xhttp.open("GET", "derivative.txt", true);
    xhttp.send();
    //console.log(allTextLines)
  }
  */
    

//this function return tag element as a string, dafault tag is a paragraph
function createParagraph(str, tag = 'p') {
    let element = document.createElement(tag)
    element.textContent = str
    return element.outerHTML
}

