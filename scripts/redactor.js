import { toggleTokensFeature, findAndPrepareTokens } from "./turnOnTokens.js";
import {
  findAndLogComments,
  logObjectsAfterComments,
} from "./apiGetFragments.js";

// Feature List - this is list of possible features inside "currentFeatures" array - do not hardcode this values inside code - call exixitng values from this object
const featureList = {
  toggleFragments: false, //This tokens hide all cantent and shows only one choosen fragment
  showTokenPreview: false, // This feature change all correct tokens to according preview
};
const buttonsList = document.querySelector(".fragment-togglers");
const fragmentsFeatureToggler = document.querySelector(".frags-toggler");
const tokensFeatureToggler = document.querySelector(".tokens-toggler");
const togglers = document.querySelectorAll(".toggler");
const emailPreview = document.querySelector(".preview");
const fragmentButtons = [];
let emailContent = emailPreview.innerHTML;

findAndPrepareTokens(emailPreview);

const fragmentStartRegex = /\b\w+(\s+\w+)*\s+start\b/;
// const sectionStartRegex = /Section \d{2}/;

// Find all fragment start comments
const comments = findAndLogComments(fragmentStartRegex);
if (comments.length === 0) {
  fragmentsFeatureToggler.style.display = "none";
}
console.log(comments);
// Define all fragments after "fragment start comment"
const newFrags = logObjectsAfterComments(comments);
console.log(newFrags);

//Create Fragments Buttons
if (newFrags) {
  newFrags.forEach((fragment, index) => {
    const button = document.createElement("button");
    const fragmentNumber = index + 1;
    button.style =
      "cursor: pointer; border-radius: 0.375rem; border-style: none; background: rgb(59, 130, 246); padding: 1rem; font-weight: 700; color: white; margin-bottom:.5rem; min-width: 150px; text-align:left";

    button.classList = `button${fragmentNumber} hover-bg-blue-300`;
    button.innerText =
      fragment.fragmentName.length > 12
        ? `${fragmentNumber}. ${fragment.fragmentName.slice(0, 13)}...`
        : `${fragmentNumber}. ${fragment.fragmentName}`;
    button.title = fragment.fragmentName;

    button.addEventListener("click", e => {
      toggleFragmentVisibility(fragment.content, e.target);
    });
    fragmentButtons.push(button);
    // buttonsList.appendChild(button);
  });
}

/////FUNCTIONS
const toggleFragmentVisibility = (fragment, button) => {
  //hide all fragments
  newFrags.forEach(frag => hideFragment(frag.content));
  ///disable all fragment buttons
  fragmentButtons.forEach(b => {
    b.style.color = "white";
    b.style.background = "#3b82f6";
  });

  //show fragment
  showFragment(fragment);

  //format button
  button.style.color = "#3b82f6";
  button.style.background = "white";
  return;
};

///Hide fragment
const hideFragment = fragment => {
  if (!fragment.classList.contains("hidden")) {
    fragment.classList.add("hidden");
  }
  fragment.style.display = "none";
};
///Show fragment
const showFragment = fragment => {
  if (fragment.classList.contains("hidden")) {
    fragment.classList.remove("hidden");
  }
  fragment.style.display = "block";
};
///Function to disable all toggler buttons exept one wchich contains chosen classlist
const togglersDissabilityHandler = (exeptionClassName, valueToSet) => {
  togglers.forEach(button => {
    button.classList.contains(exeptionClassName)
      ? {}
      : (button.disabled = valueToSet);
  });
};

////EVENT LISTENERS
tokensFeatureToggler.addEventListener("click", () => {
  const isTokenReplaced = featureList.showTokenPreview;
  toggleTokensFeature(emailPreview, isTokenReplaced);
  togglersDissabilityHandler("tokens-toggler", !isTokenReplaced);
  tokensFeatureToggler.innerText = !isTokenReplaced
    ? "undo tokens"
    : "replace tokens";
  featureList.showTokenPreview = !featureList.showTokenPreview;
});

fragmentsFeatureToggler.addEventListener("click", () => {
  if (featureList.toggleFragments) {
    //hide fragments buttons
    fragmentButtons.forEach(button => {
      buttonsList.removeChild(button);
    });
    //show whole email
    emailPreview.innerHTML = emailContent;

    //change button style
    fragmentsFeatureToggler.style.background = "#3b82f6";
    fragmentsFeatureToggler.style.color = "white";
    fragmentsFeatureToggler.innerText = "seperate fragments";
    featureList.toggleFragments = !featureList.toggleFragments;
    return;
  }
  emailContent = emailPreview.innerHTML;

  fragmentsFeatureToggler.style.background = "white";
  fragmentsFeatureToggler.style.color = "#3b82f6";
  fragmentsFeatureToggler.innerText = "Back to full RTE";

  featureList.toggleFragments = !featureList.toggleFragments;

  //Show buttons
  fragmentButtons.forEach(button => {
    buttonsList.appendChild(button);
  });

  //hide all fragments
  emailPreview.innerHTML = "";
  newFrags.forEach(frag => emailPreview.appendChild(frag.content));
  newFrags.forEach((frag, ind) => {
    if (ind === 0) {
      toggleFragmentVisibility(frag.content, fragmentButtons[ind]);
    } else {
      hideFragment(frag.content);
    }
  });
});
