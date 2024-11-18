export const getCategoryList = collection => {
    let catSet = {};
    collection.getAll().forEach(item => {
        if (!item.data.categories) return;
        item.data.categories.filter(
            cat => !['posts', 'all'].includes(cat)
        ).forEach(
            cat => {
                if (!catSet[cat]) { catSet[cat] = []; }
                catSet[cat].push(item)
            }
        );
    });
    return catSet;
}
