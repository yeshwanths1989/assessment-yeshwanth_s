const tokens = [
  ////DYNAMIC CustomText TOKENS
  {
    token: "{{customText\\[([^\\]]+)\\]}}",
    replaceTo: "DYNAMIC_VALUE",
    dynamicValue: value => {
      let options = value.match(/{{customText\[(.*?)\]}}/s);
      if (options) {
        const optionsList = options[1].split("|");
        let listOfOptions = "";
        optionsList.forEach(element => {
          const tokenRegex = /##(.*?)##/g;
          if (element === "") {
            return;
          }
          tokenRegex.test(element)
            ? (listOfOptions += `<option styles="font-weight:normal;display:block;min-height:1.2em;padding:0px 2px 1px;white-space:nowrap">(T) ${element.replace(tokenRegex, (match, p1) => replaceStaticTokens(p1))} </option> `)
            : (listOfOptions += `<option styles="font-weight:normal;display:block;min-height:1.2em;padding:0px 2px 1px;white-space:nowrap">${element}</option> `);
        });
        return `<span><select styles="">${listOfOptions}</select></span>`;
      } else {
        console.log(
          "Unknown error with" +
            value +
            "but token seems to be correct. Remember that final result needs to be checked on veeva and salesforce"
        );
        return `<span><select title="correct token but something went wrong with value" styles=""><option styles="font-weight:normal;display:block;min-height:1.2em;padding:0px 2px 1px;white-space:nowrap">undefined</option></select></span>`;
      }
    },
  },
  {
    token: "{{customText\\((\\d{1,3})\\)}}",
    replaceTo: "DYNAMIC_VALUE",
    dynamicValue: value => {
      const emptyToken = "{{customText()}}";
      const options = value.match(/{{customText\((\d{1,3})\)}}/);
      if (options) {
        const selectedToken = value.match(/{{customText\((\d{1,3})\)}}/)[0];
        const lengthOfNumber = selectedToken.length - emptyToken.slice().length;
        const startValueIndex = -lengthOfNumber - 3;
        const textLimit = selectedToken.slice(startValueIndex, -3);

        return `<span><textarea maxlength="${textLimit}" style="padding:2px;min-width:400px;max-width:400px;min-height:20px;box-sizing:border-box;height:20px;overflow:hidden;font-family:Arial,sans-serif;display:block"/></span>`;
      } else {
        return;
      }
    },
  },
  {
    token: "{{customText}}",
    replaceTo: `<span><textarea style="padding:2px;min-width:400px;max-width:400px;min-height:20px;box-sizing:border-box;height:20px;overflow:hidden;font-family:Arial,sans-serif;display:block"></textarea></span>`,
  },

  ////////USER (SALES REP) Relatet tokens
  { token: "{{userName}}", replaceTo: "Chuck Tester" },
  { token: "{{user.Name}}", replaceTo: "Chuck Tester" },
  { token: "{{User.LastName}}", replaceTo: "Tester" },
  { token: "{{User.FirstName}}", replaceTo: "Chuck" },
  {
    token: "{{userPhoto}}",
    replaceTo: `<div style="max-width: 160px; max-height: 120px; background-color: #ddd; display: inline-block;"><svg fill="#333333" width="160px" height="120px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" /></svg></div>`,
  },
  { token: "{{User.CompanyName}}", replaceTo: "Sample Medical Company" },
  { token: "{{User.Division}}", replaceTo: "Drugs division" },
  { token: "{{User.Department}}", replaceTo: "Sales Departement" },
  { token: "{{User.Title}}", replaceTo: "Senior Sales Assistant" },
  { token: "{{userEmailAddress}}", replaceTo: "chucktester@rtemaster.com.pl" },
  { token: "{{User.Signature}}", replaceTo: "Chuck's Signature" },
  {
    token: "{{User.MobilePhone}}",
    replaceTo: `+48 654 321 321`,
  },
  {
    token: "{{User.Phone}}",
    replaceTo: `22 321 00 00`,
  },
  {
    token: "{{User.Fax}}",
    replaceTo: `(fax)22 321 00 00`,
  },

  /// Email RECIEVER RELATED TOKENS
  { token: "{{accFname}}", replaceTo: "Andrew" },
  { token: "{{accLname}}", replaceTo: "Reciever" },
  { token: "{{accTitle}}", replaceTo: "Mr." },
  { token: "{{Account.CMS_Mailing_Name__c}}", replaceTo: "Andy_doctor" },
  { token: "{{Account.CMS_Nick_Name__c}}", replaceTo: "Andy_doctor" },
];

const staticTokens = tokens.filter(
  token =>
    token.replaceTo !== "DYNAMIC_VALUE" && token.replaceTo.charAt(0) !== "<"
);

const replaceStaticTokens = value => {
  const listedToken = staticTokens.find(item => {
    return item.token === `{{${value}}}`;
  });
  if (!listedToken) {
    return value;
  }

  return listedToken.replaceTo;
};

export default tokens;
