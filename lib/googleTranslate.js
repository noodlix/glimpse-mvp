export async function translateText(translationprompt) {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?q=${translationprompt.q}&target=${translationprompt.target}&key=${translationprompt.key}`,
    {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(translationprompt),
    },
  );

  const data = await response.json();
  // console.log(data.data.translations[0].translatedText);

  if (
    !response.ok ||
    !data.data ||
    !data.data.translations ||
    data.data.translations.length === 0
  ) {
    throw new Error("Translation request failed.", response.statusText);
  }

  return data.data.translations[0].translatedText;
}
