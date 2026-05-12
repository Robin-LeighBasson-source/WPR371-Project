const Enquiry = require('../models/Enquiry');

// Render contact page
const getContactPage = (req, res) =>
{
    res.render('contact',
    {
        title: 'Contact',
        success: null
    });
};

// Save enquiry
const submitEnquiry = async (req, res) =>
{
    try
    {
        const { name, email, message } = req.body;
        const newEnquiry = new Enquiry({ name, email, message });

        await newEnquiry.save();

        res.render('contact',
        {
            title: 'Contact',
            success: 'Enquiry submitted successfully!'
        });
    } catch (err)
    {
        console.error(err);

        res.render('contact',
        {
            title: 'Contact',
            success: 'Error submitting enquiry.'
        });
    }
}; //submitEnquiry

module.exports = { getContactPage, submitEnquiry };