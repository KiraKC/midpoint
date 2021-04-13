const unidentified = "Undisclosed";

const setOfUserMetaDataGroupings = {
  'education': [unidentified, 'Elementary School', 'Middle School', 'High School', 'Bachelors', 'Masters', 'PhD'],
  'gender': [unidentified, 'Male', 'Female', 'Others'],
  'age': [unidentified, '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'],
  'politicalLeaning': [unidentified, 'Left Leaning', 'Neutral', 'Right Leaning'],
  'maritalStatus': [unidentified, 'Married', 'Unmarried'],
};

const listOfUserMetaDataGroupings = ['education', 'gender', 'age', 'politicalLeaning', 'maritalStatus'];
const listOfGroupingsDisplayed = ['Education', 'Gender', 'Age', 'Political Leaning', 'Marital Status'];

function randomUserMetaDataGrouping() {
	return listOfUserMetaDataGroupings[Math.floor((Math.random() * 100000)) % listOfUserMetaDataGroupings.length]
}

export { randomUserMetaDataGrouping, listOfUserMetaDataGroupings };
export default setOfUserMetaDataGroupings;
