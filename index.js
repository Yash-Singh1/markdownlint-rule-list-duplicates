const markdownIt = require('markdown-it');

const stripHTML = require('string-strip-html').stripHtml;

/**
 * @type {import('markdownlint').Rule}
 */
module.exports = {
  names: ['list-duplicates'],
  description: 'Prevents you from having duplicates in lists in markdown',
  information: new URL('https://github.com/Yash-Singh1/markdownlint-rule-list-duplicates'),
  tags: ['lists'],
  function: function rule(params, onError) {
    let openList = false;
    let openListDepth = 0;
    let openItem = false;
    let openItemDepth = 0;
    let currentItemContent = { content: '' };
    let listId = 0;
    let listMapping = {};

    params.tokens.forEach(function (token) {
      if (token.type === 'bullet_list_open' && !openList) {
        openList = true;
        openListDepth = token.level;
        listId++;
        listMapping[listId] = [];
      } else if (token.type === 'bullet_list_close' && openList && token.level === openListDepth) {
        openList = false;
      } else if (token.type === 'list_item_open' && !openItem) {
        openItem = true;
        openItemDepth = token.level;
        currentItemContent.lineNumber = token.lineNumber;
      } else if (token.type === 'list_item_close' && openItem && token.level === openItemDepth) {
        openItem = false;
        listMapping[listId].push(currentItemContent);
        currentItemContent = { content: '' };
      } else if (openItem && token.type === 'inline' && token.level === openItemDepth + 2) {
        currentItemContent.content = stripHTML(markdownIt().renderInline(token.content.trim()), { ignoreTags: ['img'] }).result;
      }
    });

    Object.values(listMapping).forEach((listMappingPart) => {
      let alreadyUsed = [];

      listMappingPart.forEach((listItem) => {
        if (!alreadyUsed.includes(listItem.content.trim())) {
          alreadyUsed.push(listItem.content);
        } else {
          onError({
            lineNumber: listItem.lineNumber,
            detail: 'Found duplicate in a list at line ' + listItem.lineNumber
          });
        }
      });
    });
  }
};
