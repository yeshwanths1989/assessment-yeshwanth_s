// posthtml-add-align-center.cjs
module.exports = (options = {}) => {
  const classesToProcess = [
    { className: "align-center-table", alignValue: "center" },
    { className: "align-left-table", alignValue: "left" },
    { className: "align-right-table", alignValue: "right" },
  ];

  return tree => {
    classesToProcess.forEach(element => {
      const regex = new RegExp(element.className);
      tree.match({ tag: /(?:td|table)/, attrs: { class: regex } }, node => {
        node.attrs.align = element.alignValue;
        return node;
      });
    });

    classesToProcess.forEach(element => {
      tree.walk(node => {
        if (node.attrs && node.attrs.class) {
          node.attrs.class = node.attrs.class
            .split(" ")
            .filter(className => className !== element.className)
            .join(" ");
        }
        return node;
      });
    });

    return tree;
  };
};
