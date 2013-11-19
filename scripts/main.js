require.config({
    paths: {
      'react': '../bower_components/react/react',
      'JSXTransformer': '../bower_components/react/JSXTransformer',
      'jsx': 'vendor/jsx',
    },

    shim: {
      'JSXTransformer': {
        exports: 'JSXTransformer'
      }
    }
});

require(['react', 'jsx!components/calculator'], function (React, CalculatorComponent) {
  React.renderComponent(new CalculatorComponent(), document.querySelector('body'));
});
