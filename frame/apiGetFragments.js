///INITIAL PROGRAM FUNCTIONS
export const findAndLogComments = regex => {
  const comments = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_COMMENT,
    null,
    false
  );

  while (walker.nextNode()) {
    if (regex.test(walker.currentNode.nodeValue)) {
      comments.push(walker.currentNode);
    }
  }
  return comments;
};
// Create full fragments array
export const logObjectsAfterComments = comments => {
  const fragments = [];

  if (comments.length === 0) {
    return;
  }

  comments.forEach(comment => {
    // Find closest node after comment
    let nextNode = comment.nextSibling;

    while (nextNode && nextNode.nodeType !== Node.ELEMENT_NODE) {
      nextNode = nextNode.nextSibling;
    }

    if (nextNode) {
      fragments.push({
        fragmentName: comment.nodeValue.slice(0, -6),
        content: nextNode,
      });
    } else {
      console.log("No object after this comment found");
    }
  });

  return fragments;
};
