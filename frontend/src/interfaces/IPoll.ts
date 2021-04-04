import IOption from "./IOption";

interface IPoll {
	id: string,
	question: string,
	emoji: string,
	answerOptions: IOption[]
}

export default IPoll;