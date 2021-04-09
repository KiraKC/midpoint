import IOption from "./IOption";

interface IPoll {
	id: string,
	question: string,
	emoji: string,
	answerOptions: IOption[],
	color: string,
	imageUrl: string
}

export default IPoll;