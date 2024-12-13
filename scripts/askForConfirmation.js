import * as readline from "node:readline/promises";

///ask For Confirmation - sample reusable function which will prompt question on command line with yes or no answer
/// positiveCallback (required) - function which should run when user confirm action
/// question - sting which schould be prompted on command line
/// negativeCallback (not required) - function which should run when user choose 'no' answer
/// continueAfterCallback (boolean) - false by default, if true it will close readline after callback done

const YES_ANSWER = ["y", "yes"];
const NO_ANSWER = ["n", "no"];

const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

export const askForConfirmation = async (
  positiveCallback,
  question,
  negativeCallback = undefined,
  continueAfterCallback = false
) => {
  const rl = createReadlineInterface();

  const answer = await rl.question(question);
  const normalizedAnswer = answer.toLowerCase();
  if (YES_ANSWER.includes(normalizedAnswer)) {
    positiveCallback();
    !continueAfterCallback && rl.close();
    return;
  } else if (NO_ANSWER.includes(normalizedAnswer)) {
    negativeCallback && negativeCallback();
    !continueAfterCallback && rl.close();
    return;
  } else {
    console.log(
      "Your answer is not detected. \nPlease type y/yes or n/no letter then hit Enter/Return."
    );
    rl.close();
    return;
  }
};

export default askForConfirmation;
