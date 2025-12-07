# EarthBox 🌿

A beautiful, responsive e-commerce website for selling terrariums and vivariums with an interactive gamified builder.

## Features

- **Homepage**: Beautiful landing page showcasing the brand and popular collections
- **Shop Page**: Browse and purchase pre-made terrariums and vivariums with filtering options
- **Interactive Builder**: Gamified terrarium creation tool with:
  - Step-by-step customization process
  - Real-time visual preview
  - Progress tracking and scoring system
  - Achievement unlocking
  - Price calculation
- **Care Guide**: Comprehensive instructions for maintaining healthy terrariums
- **Contact Page**: Get in touch with support and FAQ section
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Hosting on GitHub Pages

This website is designed to be hosted for free on GitHub Pages. To deploy:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch (main or copilot/add-terrarium-vivarium-page) as source
4. Your site will be live at `https://yourusername.github.io/earthbox/`

## Structure

```
earthbox/
├── index.html          # Homepage
├── shop.html           # Product shop page
├── builder.html        # Interactive terrarium builder
├── care-guide.html     # Care instructions
├── contact.html        # Contact and FAQ page
├── styles.css          # Main stylesheet
├── shop.css           # Shop page styles
├── builder.css        # Builder page styles
├── script.js          # General JavaScript
├── shop.js            # Shop functionality
└── builder.js         # Builder game logic
```

## Technologies Used

- Pure HTML5, CSS3, and JavaScript (no dependencies)
- Responsive design with CSS Grid and Flexbox
- Modern UI with smooth animations
- Interactive gamification elements

## Local Development

Simply open `index.html` in a web browser to view the site locally. No build process or server required!

## Browser Support

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

# Contact Form Email Notification (Open Source, Python)

## How It Works
- The contact form on `contact.html` sends submissions to a Python Flask backend (`backend/app.py`).
- The backend receives the data and sends an email notification using SMTP (Gmail, Mailgun, etc.).
- All code is open source and easy to configure.

## Setup Instructions

### 1. Install Python dependencies
```
cd backend
pip install -r requirements.txt
```

### 2. Configure Email Credentials
Set these environment variables (recommended) or edit directly in `backend/app.py`:
- `EMAIL_HOST` (default: smtp.gmail.com)
- `EMAIL_PORT` (default: 587)
- `EMAIL_HOST_USER` (your email address)
- `EMAIL_HOST_PASSWORD` (your app password)
- `EMAIL_RECEIVER` (where notifications are sent)

Example (for Gmail):
```
export EMAIL_HOST_USER='your_email@gmail.com'
export EMAIL_HOST_PASSWORD='your_app_password'
export EMAIL_RECEIVER='your_email@gmail.com'
```

### 3. Run the Flask Backend
```
python app.py
```

### 4. Test the Contact Form
- Open `contact.html` in your browser.
- Fill out the form and submit.
- You should see a success notification if the email was sent.

## Notes
- For Gmail, you may need to create an "App Password" for SMTP access.
- The backend runs on `http://localhost:5000` by default. Update the fetch URL in `contact.html` if you change the port.
- All code is open source and can be self-hosted or modified for other email providers.

# Free Hosting: Flask Backend + GitHub Pages

## Step-by-Step: Deploy Flask Backend on Render (Free)

1. **Create a free account at [Render](https://render.com/)**
2. **Push your backend code to GitHub**
   - Make sure your `backend/app.py` and `backend/requirements.txt` are in your repo.
3. **Create a new Web Service on Render**
   - Click "New Web Service" > "Connect your repo" > Select your repo.
   - Set the root directory to `backend`.
   - Set the build command to:
     ```
     pip install -r requirements.txt
     ```
   - Set the start command to:
     ```
     python app.py
     ```
   - Set environment variables for your email credentials (EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_RECEIVER, etc.) in the Render dashboard.
   - Choose the free plan.
4. **Deploy!**
   - Render will build and deploy your Flask app. You’ll get a public URL like `https://your-app.onrender.com`.

## Connect Your Static Site (GitHub Pages)

1. **Update the fetch URL in `contact.html`**
   - Change:
     ```js
     fetch('http://localhost:5000/api/contact', ...)
     ```
   - To:
     ```js
     fetch('https://your-app.onrender.com/api/contact', ...)
     ```
2. **Commit and push your changes to GitHub.**
3. **Your static site on GitHub Pages will now send contact form submissions to your free Flask backend!**

---

## Notes
- Render’s free tier may sleep after inactivity, but will wake up on new requests.
- You can use other free platforms (Fly.io, Railway, etc.) with similar steps.
- Never expose your email password in code—always use environment variables.

For more help, see Render’s docs: https://render.com/docs/deploy-flask

---

## Contact

For any queries, email us at: [earthbox.mumbai@gmail.com](mailto:earthbox.mumbai@gmail.com)

Created with 🌱 for terrarium enthusiasts everywhere
