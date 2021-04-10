const listOfEmojis = ['star-struck', 'face_with_cowboy_hat', 'see_no_evil', 'eyes',
	'fire', '8ball', 'rainbow', 'stars', 'snowflake', 'mega', 'hammer_and_wrench', 'sun_with_face',
	'stars', 'snowman', 'ocean', 'ring', 'basketball', 'watermelon', 'hamburger', 'fries', 'cooking',
	'burrito', 'jack_o_lantern', 'christmas_tree', 'shinto_shrine', 'abacus'];

function randomEmoji() {
	return listOfEmojis[Math.floor((Math.random() * 100000)) % listOfEmojis.length]
}

export { randomEmoji }
export default listOfEmojis;
