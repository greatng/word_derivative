import word_list from wordList;

//search_div("test")
function createParagraph(str, tag = 'p', name = '') {
    let element = document.createElement(tag)
    element.textContent = str
    if (name){
      element.className = name
    }
    //console.log(element)
    return element.outerHTML
  }
  
  
  function search_div(search_value) {
  
    let returnHTMLelement = ""
  
    search_value = search_value.toLowerCase()
    if (word_list[search_value]){
  
      for (let x in word_list[search_value]){
  
        let word = word_list[search_value][x]['word']
        let word_class = word_list[search_value][x]['word_class']
  
        if (word_class == "AV" || word_class == "AJ"){
          word_class = word_class == "AV" ? "Adv" : "Adj"
        }
        returnHTMLelement = returnHTMLelement + createParagraph("Word : " + word + " Word Class : " + word_class + ".")
      }
    } else {
        console.log("Done")
    }
    document.getElementById('derivative').innerHTML = returnHTMLelement
  }
  
  
  function fetchVocab(search_vocab) 
  {
      var request = new XMLHttpRequest()
      var displayHTML = ""
      // Open a new connection, using the GET request on the URL endpoint
      request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/'+search_vocab, true)
  
      request.onload = function () {
          // Begin accessing JSON data here
          var data = JSON.parse(this.response)
  
          if (request.status >= 200 && request.status < 400) {
          let count_start = 1 //add prefix
          data.forEach((words) => {
              //console.log(words)
              var { word, phonetic, phonetics : [ audios = false ], origin = "-", meanings } = words;
              //var meaning = words.meanings //show word definition
              //var phonetics = words.phonetics 
              //var origin = words.origin ? words.origin : ""
              //console.log(audios.audio)
              var audioHTML = audios.audio ? "<audio controls class=\"audiocontroller\"><source src=\"" + audios.audio + 
              " \"type=\"audio/mpeg\"></audio>" : "" //get audio url
  
              //this part create html tag
              meanings.forEach((info) => {
                  displayHTML += createParagraph(count_start + '. ' + word, 'h2', 'text-white mx-auto mt-2 mb-5 display-6') + 
                  audioHTML + "<i>" + createParagraph(phonetic) + createParagraph(info.partOfSpeech) + "</i><b>Origin</b><br>" + 
                  createParagraph(origin)
  
                  count_start++
  
                  info.definitions.forEach((defin) => {
                      displayHTML += "<b>Meaning</b><br>" + createParagraph(defin.definition) + "<b>Example</b>" + createParagraph(defin.example)
                  })
              })
              //console.log(create_display)
              document.getElementById("display").innerHTML = displayHTML //sent html tag element to display
          })
          } else {
              document.getElementById("display").innerHTML = "Please try again" //if api call failed
          }
        }
        request.send()
  
        search_div(search_vocab)
        //loadDoc(search_vocab)
  }