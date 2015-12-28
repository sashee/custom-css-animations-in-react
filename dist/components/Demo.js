"use strict";

var Demo = React.createClass({
	displayName: "Demo",
	getInitialState: function getInitialState() {
		return {
			reversed: false
		};
	},
	reverse: function reverse() {
		this.setState({ reversed: !this.state.reversed });
	},
	render: function render() {
		var _this = this;

		var animationFunction1 = function animationFunction1(time) {
			return _this.state.reversed ? 1 - time : time;
		};
		var animationFunction2X = function animationFunction2X(time) {
			return (1 + Math.sin((_this.state.reversed ? 1 - time : time) * Math.PI * 2)) / 2;
		};
		var animationFunction2Y = function animationFunction2Y(time) {
			return (1 + Math.cos((_this.state.reversed ? 1 - time : time) * Math.PI * 2)) / 2;
		};

		return React.createElement(
			"div",
			null,
			React.createElement(
				"button",
				{
					onClick: this.reverse
				},
				"Reverse directions!"
			),
			React.createElement(
				"div",
				null,
				"This box moves along a line: (x: linear, y: linear)",
				React.createElement(
					"div",
					{ className: "line" },
					React.createElement(AnimatedElement, {
						key: this.state.reversed /* This is actually a dirty hack to reset the animation when the direction changes */,
						animationFunctionX: animationFunction1,
						animationFunctionY: animationFunction1
					})
				),
				"This box moves along a circle: (x: sine, y: cosine)",
				React.createElement(
					"div",
					{ className: "circular" },
					React.createElement(AnimatedElement, {
						key: this.state.reversed,
						animationFunctionX: animationFunction2X,
						animationFunctionY: animationFunction2Y
					})
				)
			)
		);
	}
});
//# sourceMappingURL=Demo.js.map
