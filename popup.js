const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener("click", async () => {
  //console.log("clicked");

  const color = chrome.storage.sync.get("color", ({ color }) => {
    console.log("color:", color);
  });

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //console.log(tab);

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResults) => {
      const [data] = injectionResults;

      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.error(err);
        }
        console.log(colorGrid);
      }

      console.log(injectionResults);
    }
  );
});

async function pickColor() {
  //console.log("Script Working");

  try {
    //picker
    const eyedropper = new EyeDropper();
    return await eyedropper.open();
    console.log(selectedColor);
  } catch (err) {
    console.error(err);
  }
}
