const setOfUserMetaDataGroupings = {
  'education': ['Elementary School', 'Middle School', 'High School', 'Bachelors', 'Masters', 'PhD'],
  'gender': ['Male', 'Female', 'Others'],
  'age': ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'],
};

const listOfUserMetaDataGroupings = ['education', 'gender', 'age', 'politicalLeaning', 'maritalStatus'];

function randomUserMetaDataGrouping() {
	return listOfUserMetaDataGroupings[Math.floor((Math.random() * 100000)) % listOfUserMetaDataGroupings.length]
}

export { randomUserMetaDataGrouping, listOfUserMetaDataGroupings };
export default setOfUserMetaDataGroupings;
