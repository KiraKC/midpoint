const categoryArray = [
	{ emoji: "basketball", text: "sports", highlightColor: "#74AEBB" },
	{ emoji: "mega", text: "politics", highlightColor: "#D83282" },
	{ emoji: "joy", text: "funny", highlightColor: "#1D5110" },
	{ emoji: "classical_building", text: "culture", highlightColor: "#2ABC88" },
	{ emoji: "dancer", text: "entertainment", highlightColor: "#905A00" },
	{ emoji: "hamburger", text: "food", highlightColor: "#E498BD" },
	{ emoji: "school_satchel", text: "education", highlightColor: "#F24343" },
	{ emoji: "thinking_face", text: "serious", highlightColor: '#B4154E' },
	{ emoji: "cupid", text: "relationship", highlightColor: '#C18FD2' },
	{ emoji: "heart_eyes", text: "cute", highlightColor: "#A391E9" },
	{ emoji: "house_with_garden", text: "lifestyle", highlightColor: "#1D5110" },
	{ emoji: "newspaper", text: "news", highlightColor: "#0B5EA9" },
	{ emoji: "frog", text: "nature", highlightColor: "#328F1A" },
	{ emoji: "carrot", text: "health", highlightColor: "#86BBEC" },
	{ emoji: "nail_care", text: "beauty", highlightColor: '#FE7EAC' },
	{ emoji: "file_folder", text: "entrepreneurship", highlightColor: '#264779' },
	{ emoji: "video_game", text: "gaming", highlightColor: '#74AEBB' },
	{ emoji: "clapper", text: "movies", highlightColor: '#EF8E96' },
	{ emoji: "sunglasses", text: "celebrities", highlightColor: '#F7017B' },
	{ emoji: "microscope", text: "science", highlightColor: '#494848' },
	{ emoji: "briefcase", text: "business", highlightColor: '#905A00' },
	{ emoji: "books", text: "books", highlightColor: '#FA8920' },
	{ emoji: "art", text: "design", highlightColor: '#A6D5FF' },
	{ emoji: "mechanical_arm", text: "technology", highlightColor: '#FFA8EC' },
	{ emoji: "womans_hat", text: "fashion", highlightColor: '#FFA61B' },
	{ emoji: "scroll", text: "history", highlightColor: '#C18FD2' },
	{ emoji: "church", text: "religion", highlightColor: '#4ECDC4' },
	{ emoji: "musical_note", text: "music", highlightColor: '#B4154E' },
	{ emoji: "speech_balloon", text: "languages", highlightColor: '#F43030' },
	{ emoji: "see_no_evil", text: "personal", highlightColor: '#6761A8' },
]

function findCategoryInfo(categoryName: string) {
	let result = categoryArray.filter(obj => {
		return obj.text === categoryName
	})
	return result ? result[0] : categoryArray[0]
}

export { findCategoryInfo }
export default categoryArray;