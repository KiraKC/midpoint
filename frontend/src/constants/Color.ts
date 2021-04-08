const color = ["#2274A5", "#D83282", "#0B5EA9", "#13BE8B", "#494848", "#464D77", "#E26D5A", "#F24343", "#274690", "#7F5A83",
	"#B33951", "#264779", "#B36A5E", "#344966", "#A4303F", "#CF5C36", "#70A288", "#2ABC88", "#86BBEC", "#246A73"]

const randomColor = () => {
	return color[Math.floor((Math.random() * 100000)) % 20];
}

export default randomColor;