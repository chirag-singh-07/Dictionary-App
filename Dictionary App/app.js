const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("input-word").value;
  console.log(inpWord);
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.title) {
        // If the API response has an error title, display an error message.
        result.innerHTML = `<h3 class="err">Couldn't Find The Word</h3>`;
      } else {
        // Display the word details.
        result.innerHTML = `
          <div class="word">
            <h3>${inpWord}</h3>
            <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
          </div>
          <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>${data[0].phonetic}</p>
          </div>
          <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
          </p>
          <p class="word-example">
            ${data[0].meanings[0].definitions[0].example || ""}
          </p>`;

        // Check if audio URL exists and starts with "https:".
        const audioUrl = data[0].phonetics.find(phonetic => phonetic.audio && phonetic.audio.startsWith('https:'));
        if (audioUrl) {
          sound.setAttribute("src", audioUrl.audio);
        } else {
          sound.removeAttribute("src");
        }
        console.log(sound);
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="err">Couldn't Find The Word</h3>`;
    });
});

const playSound = () => {
  if (sound.src) {
    sound.play();
  } else {
    console.error("Audio source not set.");
  }
};














































// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// const result = document.getElementById("result");
// const sound = document.getElementById("sound");
// const btn = document.getElementById("search-btn");

// btn.addEventListener("click", () => {
//   let inpWord = document.getElementById("input-word").value;
//   console.log(inpWord);
//   fetch(`${url}${inpWord}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       result.innerHTML = `
//     <div class="word">
//           <h3>${inpWord}</h3>
//           <button onclick = "playSound()" ><i class="fa-solid fa-volume-high"></i></button>
//         </div>
//         <div class="details">
//           <p>${data[0].meanings[0].partOfSpeech}</p>
//           <p>${data[0].phonetic}</p>
//         </div>

//         <p class="word-meaning">
//         ${data[0].meanings[0].definitions[0].definition}
//         </p>
//         <p class="word-example"> 
//           ${data[0].meanings[0].definitions[0].example || ""}
//         </p>`;

//         sound.setAttribute("src",`https:${data[0].phonetics[1].audio}`);
//         console.log(sound);
        
//     })
//     .catch(() => {
//         result.innerHTML = `<h3 class="err">Couldn't Find The Word</h3>`;
//     })
// });

// const playSound = () => {
//     sound.play();
// }
