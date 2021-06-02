module.exports = sortCategories;

function sortCategories(input) {
    const categories = JSON.parse(input).reduce((result, current, _, original) => {
        const parents = getParents(current, original);
        return new Set([...result, ...parents, current])
    }, new Set());

    return JSON.stringify(Array.from(categories));
}

function getParents(current, original, parents = []) {
    if (current.parent_id === null) {
        return parents;
    }

    const currentParent = original.find((x) => x.id === current.parent_id);
    return getParents(currentParent, original, [currentParent, ...parents])
}