//To keep track of the already used nums
let uniqueNum = [];


// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  };


  // Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  };



  // Returns a factory function with multiple objects
const pAequorFactory = (specimenNum, dna) => {

    // Ensure the uniqueNum is an integer number and array (this would require additional checks if we store the specimenNum somewhere)
    if (!Array.isArray(dna) || !Number.isInteger(specimenNum)) {
      console.log("The first parameter must be an array with integer numbers.");
    }

    // Ensure that the specimenNum have unique num
    if (uniqueNum.includes(specimenNum)){
      console.log("This number has already been used for another organism.");
    }
    //Push that num in the uniqueNum array
    uniqueNum.push(specimenNum); 

    // Check if dna is with 15 bases
    if(dna.length !== 15){
      console.log('Error: The DNA not valid');
    }


    return {
      specimenNum: specimenNum,

      dna: dna,

      //Method that mutate DNA`s in random way
      mutate: function () {
          //Output a  random number from 0 to 14
          const randomIndex = Math.floor(Math.random() * this.dna.length);  //  5
    
          //Get current base at the selected index
          const currentBase = this.dna[randomIndex];                       // ["C"]
    
          // Generate new base different from the current base
          let newBase = returnRandBase();                   // random ['A', 'T', 'C', 'G']
    
          while (newBase === currentBase) {
              newBase = returnRandBase();  //Random Base different that the currentBase
          }                                                 // secure that is not ["C"]

          /* or
          let newBase;
          
          do {
            newBase = returnRandBase();
          } while (newBase === currentBase);
          */
    
          this.dna[randomIndex] = newBase;
          return dna;
        },

        //Method that compare DNA`s one from another
        compareDNA: function(org) {        
          //Counting all the bases that are matching
          let matchingBases = 0;

          for(let i = 0; i < this.dna.length; i++){
              if(this.dna[i] === org.dna[i]) {
                matchingBases++;
              }
          }
          //Calculate the percentage of the matching bases
          let percentage = ((matchingBases / 15) * 100).toFixed();
          console.log(`Specimen #${this.specimenNum} and Specimen #${org.specimenNum} have ${percentage}% DNA in common!`)
        },

        //Method that creates 30 instances of pAequor that can survive in their natural environment
        willLikelySurvive: function() {
          //Counting all the "C"`s or "G"`s in the DNA
          let letterCounter = 0;

          for(let i = 0; i < this.dna.length; i++){
              if(this.dna[i] === "C" || this.dna[i] === "G") {
                letterCounter++;
              }
          }

          //Calculate the percentage of the matching letters
          const letterPercentage = ((letterCounter / 15) * 100);
          // Returning eather true or false depending on the percentage
          return letterPercentage >= 60;
        },
      
        //Method that returns the complementary DNA strand
        complementStrand: function(){

          return this.dna.map(base => base === "A" ? "T" :
            base === "T" ? "A" : 
            base === "C" ? "G" : 
            base === "G" ? "C" : (console.log("Invalid character in DNA strand!"), '?')
          );
          /* or
          return this.dna.map(base => {
              switch(base) {
                case 'A': return 'T';
                case 'T': return 'A';
                case 'C': return 'G';
                case 'G': return 'C';
                default: console.log('Invalid character in DNA strand!'); return '?';
              }
          });
          */
        }
    }

  };



//Creating 30 organisms that can survive
const createSurvivingOrg = () => {

  let organisms = [];
  let count = 0;

  while(count < 30) {
    //Generating a new specimen number
    let specimenNum = count + 1;

    //Ensure that the specimenNum is not already used
    while(uniqueNum.includes(specimenNum)) {
      specimenNum = Math.floor(Math.random() * 100);
    }

    //Creating new random DNA strand
    const dna = mockUpStrand();

    //Create organism using the pAequorFactory
    const organism = pAequorFactory(specimenNum, dna);


    //Checking if the organism will likely survive 
    if(organism.willLikelySurvive()) {
      organisms.push(organism);     //Add organism to the organisms array
      uniqueNum.push(specimenNum);  //Adding specimenNum to the uniqueNum
      count++;         //Increment count when a valid organism is created
    }
  }

  return organisms;

};








//Creating an organism with unique num
const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, ['A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'A', 'T', 'C', 'G', 'T', 'C', 'G']);
const organism3 = pAequorFactory(3, mockUpStrand())


//Comparing organisms 
organism2.compareDNA(organism3);
/*
console.log(organism2.dna);
console.log(organism3.dna);
*/


//Mutating organism with the .mutate() function
organism2.mutate();
console.log("After mutation: " + organism2.dna);


//Making sure that DNA is made up of at least 60% 'C' or 'G' bases
console.log(organism2.willLikelySurvive());


// Creating 30 organisms that can survive and store them in an array
const survivingOrg = createSurvivingOrg();
console.log(survivingOrg);

//Complementary DNA example
console.log("Complementary strand of organism2: ", organism2.complementStrand()); 