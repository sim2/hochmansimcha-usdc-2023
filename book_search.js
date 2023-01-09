/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 

 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

  const result = {
    SearchTerm: searchTerm,
    Results: []
  };

  scannedTextObj.forEach(firstArr => {
   
    if (firstArr.Content && Array.isArray(firstArr.Content)) {
      // console.log(firstArr.Content) -ensuring data is coming through
      firstArr.Content.forEach(function(secondArr) {
         // console.log(secondArr.Text) -ensuring data is coming through
        if (secondArr.Text && secondArr.Text.includes(searchTerm)) {
          result.Results.push({
            ISBN: firstArr.ISBN,
            Page: secondArr.Page,
            Line: secondArr.Line
          });
        }
      });
    }
  });
  return result;
}


/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
] 


/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}


/**2nd Output: Apostrophe & CASE SENSITIVE TEST- only Capital "C" passes */
const twentyLeaguesOut2 = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/* 3rd Output: NEGATIVE TEST- words with "dash" due to line break */
const twentyLeaguesOut3 = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */
// console.log("testing loop", findSearchTermInBooks("the", twentyLeaguesIn));

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
//const result = findMatchingProperties("for", myObj);
//console.log(result);

const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
//console.log(test1result)
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
} 

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** POSITIVE & CASE SENSITIVE TEST: apostrophe's PASS, and only Capital "C" will PASS. Change the "C", to a "c", to see. */
const test3n4result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
//console.log(test1result)
if (JSON.stringify(twentyLeaguesOut2) === JSON.stringify(test3n4result)) {
    console.log("PASS: Test 3 & 4");
} else {
    console.log("FAIL: Check apostrophe for Test 3, or capitalized letters for Test 4");
    console.log("Expected:", twentyLeaguesOut2);
    console.log("Received:", test3n4result);
}

/** NEGATIVE TEST: we could show that words broken at the end of a line return FAIL */
const test5result = findSearchTermInBooks("darkness", twentyLeaguesIn);
//console.log(test1result)
if (JSON.stringify(twentyLeaguesOut3) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5- ensure the word is broken into two lines!");
    console.log("Expected:", twentyLeaguesOut3);
    console.log("Received:", test5result);
}
