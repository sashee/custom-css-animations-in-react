"use strict";

const Demo = React.createClass({
	getInitialState() {
		return {
			reversed: false
		};
	},
	reverse() {
		this.setState({reversed: !this.state.reversed})
	},
	render() {
		const animationFunction1 = (time) => {
			return this.state.reversed ? 1 - time : time;
		};
		const animationFunction2X = (time) => {
			return (1 + Math.sin((this.state.reversed ? 1 - time : time)  * Math.PI * 2)) / 2;
		};
		const animationFunction2Y = (time) => {
			return (1 + Math.cos((this.state.reversed ? 1 - time : time)  * Math.PI * 2)) / 2;
		};

		return (
			<div>
				<button
					onClick={this.reverse}
				>Reverse directions!
				</button>
				<div>
				This box moves along a line: (x: linear, y: linear)
					<div className="line">
						<AnimatedElement
							key={this.state.reversed /* This is actually a dirty hack to reset the animation when the direction changes */}
							animationFunctionX={animationFunction1}
							animationFunctionY={animationFunction1}
						/>
					</div>
					This box moves along a circle: (x: sine, y: cosine)
					<div className="circular">
						<AnimatedElement
							key={this.state.reversed}
							animationFunctionX={animationFunction2X}
							animationFunctionY={animationFunction2Y}
						/>
					</div>
				</div>
			</div>
		);
	}
});

