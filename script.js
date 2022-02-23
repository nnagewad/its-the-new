setInterval(combo, 10000);

function combo() {
  wordGenerator();
  middle();
  colorGenerator();
}

function wordGenerator() {
  const randomWord = document.getElementById("randomWord");
  
  fetch("https://random-word-api.herokuapp.com/word/")
    .then(response => response.json())
    .then(data => {
      const generatedWord = capitalizeFirstLetter(data[0]);
      randomWord.innerHTML = `${generatedWord}`;
    })
    .catch(error => {
      randomWord.innerHTML = `404`;
      console.log("Something Borked:", error);
    });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function middle() {
  const middleSection = document.getElementById("middle");
  middleSection.innerHTML = `is the new`
}

function colorGenerator() {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  const generatedColor = document.getElementById("generatedColor");
  const generatedCopy = document.getElementById("generatedCopy");
  const generateColorName = document.getElementById("colorName");

  fetch("https://api.color.pizza/v1/"+randomColor)
    .then(response => response.json())
    .then(data => {
      const colorName = data.colors[0].name;
      const roy = data.colors[0].rgb.r;
      const g = data.colors[0].rgb.g;
      const biv = data.colors[0].rgb.b;
      const roygbivValue = `rgb(${roy},${g},${biv})`;
      const updateColorName = colorName.replace(/(['])\b/, "’")
      generatedColor.style.backgroundColor = `${roygbivValue}`;
      generateColorName.innerText = `${updateColorName}`;
      const hspColorModel = Math.sqrt(0.299 * (roy * roy) + 0.587 * (g * g) + 0.114 * (biv * biv));
      if (hspColorModel > 127.5) {
        generatedCopy.style.color = `#090806`;
      } else {
        generatedCopy.style.color = `#F2F1EC`;
      }
    })
    .catch(error => {
      generateColorName.innerHTML = `404`;
      generatedCopy.style.color = `#F2F1EC`;
      console.log("Something Borked:", error);
    });
}
