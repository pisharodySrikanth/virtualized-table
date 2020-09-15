/* eslint-disable no-console */
const fs = require('fs');
const readmeFile = 'README.md';
const srcPath = './src/js/components';
const distPath = './dist/components';

const getDummyComponent = name => {
  const Component = () => null;
  Component.displayName = name;

  return Component;
};

const getComponentMarkdown = (name, buffer) => {
  // eslint-disable-next-line no-eval
  const docFunc = eval(buffer.toString());

  if (!docFunc || typeof docFunc !== 'function') {
    throw new Error('not function');
  }

  return docFunc(getDummyComponent(name)).toMarkdown();
};

const fetchMd = name =>
  new Promise(resolve => {
    const path = `${distPath}/${name}/doc.js`;
    fs.readFile(path, {}, (err, data) => {
      if (err) {
        console.log(err);
        resolve(null);
      }

      try {
        resolve(getComponentMarkdown(name, data));
      } catch (e) {
        console.log(e);
        resolve(null);
      }
    });
  });

const getDirectories = () =>
  new Promise((resolve, reject) => {
    fs.readdir(
      distPath,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) {
          reject(err);
        }

        const dirs = files.filter(f => f.isDirectory());

        resolve(dirs.map(d => d.name));
      },
    );
  });

const createReadme = (path, md) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, md, err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });

const execute = async () => {
  // get all valid directories
  const dirs = await getDirectories();

  const dirPromises = dirs.map(async dir => {
    // fetch markdown(if available) for each directory
    const md = await fetchMd(dir);

    if (md) {
      // create readme.md for each component in src
      await createReadme(`${srcPath}/${dir}/${readmeFile}`, md);
    }

    return md;
  });

  const result = await Promise.all(dirPromises);

  // create a consolidated readme
  const mds = result
    .filter(d => d)
    .reduce((str, d) => `${str}\n\n${d}`, '')
    .trim();

  await createReadme(readmeFile, mds);
};

execute();
