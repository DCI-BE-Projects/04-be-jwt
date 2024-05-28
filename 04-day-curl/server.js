import express from 'express';

// Fake Database
let todos = [{ id: 1, task: 'Learn Backend Development' }];
let blogs = [{ id: 1, title: 'How strong is Spider Silk', category: 'science' }];
let contacts = [{ id: 1, name: 'Kangaroo', email: 'from@australia.com' }];

// Initialize the app
const app = express();


// Use the JSON middleware
app.use(express.json());
app.use(express.urlencoded());

// Todo Routes

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    // Get the todo from request body
    const newTodo = req.body;
    // Assign a new id and add it to the fake database
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

// Blog Routes

// Get all blogs
app.get('/blogs', (req, res) => {
    res.json(blogs);
})


// Create new blog
app.post('/blogs', (req, res) => {
    // Get the blog fro mthe request body
    const newBlog = req.body;
    // Assign a new id and add it to the fake database
    newBlog.id = blogs.length + 1;
    blogs.push(newBlog);
    res.status(201).json(newBlog);
})

// Filtering with query parameters
app.get('/blogs/search', (req, res) => {
const {category} = req.query;
console.log(category);
if (category) {
	const filtereedBlog = blogs.filter(blog => blog.category === category);
	res.json(filtereedBlog);
}
else res.status(400).json({message: 'Please provide a category'});
});

// Get all contacts
app.get('/contacts', (req, res) => {
	res.json(contacts);
});

// Post a new contact
app.post('/contacts', (req, res) => {
	// Get the contact from the request body
	const { name, email } = req.body;
	// Assign a new id and add it to the fake database
	if (!name || !email) {
		res.status(400).json({ message: 'Please provide name and email' });
	} else {
		const newContact = { id: contacts.length + 1, name, email };
		contacts.push(newContact);
		res.status(201).json(newContact);
	}
});

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})