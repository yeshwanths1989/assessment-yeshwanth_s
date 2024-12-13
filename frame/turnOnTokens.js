import tokens from "./tokensList.js";

const basicTokenRegex = new RegExp(/\{\{([\s\S]*?)\}\}/, "g");

export const findAndPrepareTokens = content => {
  const documentContent = content.innerHTML;
  const processedDocumentContent = prepareTokens(documentContent);
  content.innerHTML = processedDocumentContent;
};

export const toggleTokensFeature = (node, isTokenReplaced) => {
  const tokensList = node.querySelectorAll(".veeva-token");
  if (isTokenReplaced) {
    console.log("Turn off tokens Fn");
    processTokens(tokensList);
  } else {
    console.log("Replace by tokens Fn");
    processTokens(tokensList, true);
  }
};

const processTokens = (objects, uncode = false) => {
  if (uncode) {
    objects.forEach(obj => {
      enableTokenPreview(obj);
    });
    return;
  }
  objects.forEach(obj => {
    disableTokenPreview(obj);
  });
};

const enableTokenPreview = tokenObj => {
  const uncodedValue = uncodeToken(tokenObj.innerText);
  tokenObj.innerHTML = uncodedValue;
};
const disableTokenPreview = tokenObj => {
  const valueToSet = tokenObj.getAttribute("data-token");
  tokenObj.innerHTML = valueToSet;
};

const uncodeToken = tokenValue => {
  let isTokenMatch;
  let tokenRegex = "";
  let newValue;
  tokens.forEach(token => {
    tokenRegex = new RegExp(token.token, "g");
    isTokenMatch = tokenValue.match(tokenRegex);
    if (!isTokenMatch) {
      return;
    }
    token.replaceTo === "DYNAMIC_VALUE"
      ? (newValue = token.dynamicValue(tokenValue))
      : (newValue = token.replaceTo);
  });
  return newValue;
};

const prepareTokens = content => {
  let processedHtml = content;

  processedHtml = processedHtml.replaceAll(
    basicTokenRegex,
    match => `<span class='veeva-token' data-token='${match}'>${match}</span>`
  );

  return processedHtml;
};
