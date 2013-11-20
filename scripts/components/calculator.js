define(['react', 'jsx!components/calculatorForm'], function(React, CalculatorForm) {
  return React.createClass({
    render: function() {
      return (
        /* jshint ignore:start */
        <div>
          <h1>Скільки насправді коштує магістратура?</h1>
          <CalculatorForm />
        </div>
        /* jshint ignore:end */
      );
    }
  });
});
