export const getTagList = collection => {
    const tagsSet = new Set();
    collection.getAll().forEach(item => {
        if (!item.data.tags) return;
        item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
};
