"use strict";

var AnimatedElement = React.createClass({
	displayName: "AnimatedElement",

	propTypes: {
		animationFunctionX: React.PropTypes.func.isRequired,
		animationFunctionY: React.PropTypes.func.isRequired
	},
	getInitialState: function getInitialState() {
		var random = Math.random().toString().substring(2);
		var style = document.createElement("style");
		var css = "@keyframes animation_" + random + " {\n\t\t\t" + _.map(_.range(0, 100), function (index, idx, list) {
			return Math.round(index / (list.length - 1) * 100) + "% {}";
		}).join("\n") + "\n\t\t}";

		style.type = "text/css";
		style.appendChild(document.createTextNode(css));

		document.getElementsByTagName("head")[0].appendChild(style);

		return {
			random: random,
			style: style
		};
	},
	componentDidMount: function componentDidMount() {
		this.updateAnimation();
	},
	componentWillUnmount: function componentWillUnmount() {
		this.state.style.remove();
	},
	componentDidUpdate: function componentDidUpdate() {
		this.updateAnimation();
	},
	updateAnimation: function updateAnimation() {
		var _this = this;

		_.each(this.state.style.sheet.cssRules[0].cssRules, function (cssRule, index, list) {
			var position = index / (list.length - 1);
			var animationPositionX = _this.props.animationFunctionX(position);
			var animationPositionY = _this.props.animationFunctionY(position);
			cssRule.style.transform = "translate(" + animationPositionX * 100 + "px, " + animationPositionY * 100 + "px)";
		});
	},
	render: function render() {
		return React.createElement("div", {
			className: "AnimatedElement",
			style: { animation: "5s animation_" + this.state.random + " infinite linear" }
		});
	}
});
//# sourceMappingURL=AnimatedElement.js.map
