const markdownlint = require('markdownlint');
const fs = require('fs');
const path = require('path');

describe('markdownlint-rule-list-duplicates', () => {
  let files = fs
    .readdirSync(__dirname)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.slice(0, -3));

  describe('files', () => {
    it('has json counterparts', () => {
      files.forEach((file) => {
        const jsonPath = path.join(__dirname, file + '.json');
        expect(fs.existsSync(jsonPath)).toBeTruthy();
        expect(() => JSON.parse(fs.readFileSync(jsonPath))).not.toThrow();
      });
    });

    it('has md counterparts for json', () => {
      const jsonFiles = fs
        .readdirSync(__dirname)
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => filename.slice(0, -5));
      jsonFiles.forEach((file) => {
        expect(fs.existsSync(path.join(__dirname, file + '.md'))).toBeTruthy();
      });
    });
  });

  describe('works', () => {
    files.forEach((file) => {
      const markdownFileLocation = path.join(__dirname, `${file}.md`);
      it(file, () =>
        expect(
          markdownlint
            .sync({
              files: [markdownFileLocation],
              customRules: require(path.join(__dirname, '..')),
              config: { default: false, 'list-duplicates': true }
            })
            [markdownFileLocation].map((report) => ({ lineNumber: report.lineNumber, errorDetail: report.errorDetail }))
        ).toEqual(require(`./${file}.json`))
      );
    });
  });
});
