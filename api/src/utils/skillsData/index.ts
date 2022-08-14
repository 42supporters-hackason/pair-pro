function loadYamlFile(filename:string) {
  const fs = require('fs');
  const yaml = require('js-yaml');
  const yamlText = fs.readFileSync(filename, 'utf8')
  return yaml.load(yamlText);
}

// path from api dir
export const skillsData = loadYamlFile('src/assets/yaml/skills.yaml');
