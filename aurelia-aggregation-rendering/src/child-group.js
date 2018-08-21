
export class ChildGroup {

  /**
   * @param {string} title
   */
  constructor(title) {
    this.title = title;
    this.amount = 0;
    this.children = [];
  }

  /**
   * @param {Object} child
   */
  addChild(child) {
    this.children.push(child);
  }

  recalculateValues() {
    this.amount = this.children.length + 0;
  }

  /**
   * @param {Array<Object>} children
   * @returns {Array<PositionGroup>}
   */
  static groupChildren(children) {
    const groups = children.reduce((groups, child) => {
      const groupingKey = child.id % 2;
      // Create new group
      if (!groups.has(groupingKey)) {
        groups.set(groupingKey, new ChildGroup('Group ' + groupingKey));
      }
      const group = groups.get(groupingKey);
      group.addChild(child);
      groups.set(groupingKey, group);

      return groups;
    }, new Map());

    return Array.from(groups.values()).map(group => {
      group.recalculateValues();
      return group;
    });
  }
}
