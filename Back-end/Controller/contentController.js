const Page = require('../Models/Page');

exports.patch = async (req, res) => {
    try {
        const { pageId, sectionId } = req.params;
        const { newContent } = req.body;

        if (!newContent) {
            return res.status(400).send('New content is required');
        }

        const page = await Page.findById(pageId);
        if (!page) {
            return res.status(404).send('Page not found');
        }

        if (page.sections && Object.prototype.hasOwnProperty.call(page.sections, sectionId)) {
            page.sections[sectionId].content = newContent;
        } else {
            return res.status(400).send('Section ID not found');
        }

        await page.save();
        res.status(200).send('Section updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};