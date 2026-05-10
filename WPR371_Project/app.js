const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sample routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home', events: [
    { _id: 1, title: 'Tech Conference', date: '2026-05-20', category: 'conference' },
    { _id: 2, title: 'Music Festival', date: '2026-06-10', category: 'music' },
    { _id: 3, title: 'Sports Event', date: '2026-07-15', category: 'sports' },
    { _id: 4, title: 'Theater Play', date: '2026-08-25', category: 'theater' },
    { _id: 5, title: 'Workshop on AI', date: '2026-09-30', category: 'workshop' }
  ]});
});

app.get('/auth/login', (req, res) => {
  res.render('auth', { title: 'Login', error: null });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard', events: [], bookings: [], analytics: { totalBookings: 0, popularEvent: 'None', capacityUsage: 0 }, user: { role: 'user' } });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', enquiries: [], user: { role: 'admin' } });
});

app.get('/admin/events', (req, res) => {
  res.render('admin-events', { title: 'Manage Events', events: [] });
});

const PORT = process.env.PORT || 3008;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  const displayHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
  console.log(`Server running on http://${displayHost}:${PORT}`);
});
