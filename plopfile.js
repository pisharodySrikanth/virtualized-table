module.exports = plop => {
    plop.setGenerator('component', {
      description: 'Create a component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your component name?'
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/js/components/{{pascalCase name}}/{{pascalCase name}}.js',
          templateFile: 'plop-templates/Component.js.hbs',
        },
        {
            type: 'add',
            path: 'src/js/components/{{pascalCase name}}/__tests__/{{pascalCase name}}-test.js',
            templateFile: 'plop-templates/__tests__/Component-test.js.hbs',
        },
        {
            type: 'add',
            path: 'src/js/components/{{pascalCase name}}/stories/Basic.js',
            templateFile: 'plop-templates/stories/Basic.js.hbs',
        },
        {
            type: 'add',
            path: 'src/js/components/{{pascalCase name}}/index.js',
            templateFile: 'plop-templates/index.js.hbs',
        },
        {
            type: 'add',
            path: 'src/js/components/{{pascalCase name}}/doc.js',
            templateFile: 'plop-templates/doc.js.hbs',
        },
        {
            type: 'add',
            path: 'src/js/components/{{pascalCase name}}/index.d.ts',
            templateFile: 'plop-templates/index.d.ts.hbs',
        },
        {
          type: 'add',
          path: 'src/js/components/{{pascalCase name}}/Styled{{pascalCase name}}.js',
          templateFile: 'plop-templates/StyledComponent.js.hbs',
        },
      ],
    });
  };