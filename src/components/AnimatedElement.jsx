"use strict";

const AnimatedElement = React.createClass({
	propTypes: {
		animationFunctionX: React.PropTypes.func.isRequired,
		animationFunctionY: React.PropTypes.func.isRequired
	},
	getInitialState() {
		const random = Math.random().toString().substring(2);
		const style = document.createElement("style");
		const css = `@keyframes animation_${random} {
			${_.map(_.range(0, 100), (index, idx, list) => {
				return `${Math.round(index / (list.length - 1) * 100)}% {}`;
			}).join("\n")}
		}`;

		style.type = "text/css";
		style.appendChild(document.createTextNode(css));

		document.getElementsByTagName("head")[0].appendChild(style);

		return {
			random,
			style
		};
	},
	componentDidMount() {
		this.updateAnimation();
	},
	componentWillUnmount() {
		this.state.style.remove();
	},
	componentDidUpdate() {
		this.updateAnimation();
	},
	updateAnimation() {
		_.each(this.state.style.sheet.cssRules[0].cssRules, (cssRule, index, list) => {
			const position = index / (list.length - 1);
			const animationPositionX = this.props.animationFunctionX(position);
			const animationPositionY = this.props.animationFunctionY(position);
			cssRule.style.transform = `translate(${animationPositionX * 100}px, ${animationPositionY * 100}px)`;
		});
	},
	render() {
		return (
			<div
				className="AnimatedElement"
				style={{animation: `5s animation_${this.state.random} infinite linear`}}
			>
			</div>
		);
	}
});

