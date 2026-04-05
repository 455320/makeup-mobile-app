# Beauty Boutique – Premium Makeup Store

![Demo Screenshot](Screenshot_2026-03-26_224323-artguru-removebg-preview.png)

## ✨ Overview
A **pure HTML, CSS, and vanilla JavaScript** web application that showcases a premium makeup catalog, complete with product filtering, a dynamic shopping cart, and a checkout flow. The site is fully responsive, works on mobile and desktop, and includes smooth animations, toast notifications, and a polished pink‑gold UI.

---

## 📁 Project Structure
```
make upo app/
├─ index.html            # Main page markup
├─ styles.css            # Global styles (pink theme, glassmorphism, animations)
├─ index.js              # Core JavaScript – product loading, cart logic, checkout
├─ README.md             # **This file** – project documentation
├─ assets/               # Images, icons, and UI assets
│   ├─ product‑images/   # All product pictures
│   └─ logo/…
└─ ...
```

---

## 🚀 Features
- **Product catalogue** – 12 curated makeup items with images, prices, ratings, and descriptions.
- **Category filtering** – All, Foundation, Lipstick, Eyeshadow, Blush.
- **Dynamic shopping cart** – Add, remove, update quantity, persistent via `localStorage`.
- **Real‑time total calculation** – Updated instantly as cart changes.
- **Checkout modal** – Collect customer info, validate inputs, and submit order.
- **Success modal** – Order confirmation with generated Order ID.
- **Responsive design** – Optimized for mobile (320 px+), tablets, and desktops up to 1920 px.
- **Premium UI** – Pink gradient, rose‑gold accents, smooth hover effects, and toast notifications.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (custom design system), Vanilla JavaScript (ES6+).
- **Fonts**: Google Fonts – *Playfair Display* (headings) & *Inter* (body).
- **Images**: Unsplash & locally curated assets.
- **Backend** (optional for API demo): FastAPI + MongoDB (not required for the static front‑end demo).

---

## 📦 Setup & Development
1. **Clone the repository** (or copy the folder) to your local machine.
2. Open a terminal in the project root and start a simple static server, e.g.:
   ```bash
   # Using Python's built‑in server
   python -m http.server 5500
   ```
   Then navigate to `http://127.0.0.1:5500/index.html`.
3. The site loads automatically; you can edit `index.html`, `styles.css`, or `index.js` and refresh to see changes.

> **Tip**: For live‑reload during development, use the VS Code Live Server extension or any similar tool.

---

## 📖 Usage Guide
- **Browse products** – Scroll the grid or use the category buttons to filter.
- **Add to cart** – Click the *Add to Cart* button on any product card.
- **Manage cart** – Open the cart via the cart icon, adjust quantities, or remove items.
- **Checkout** – Fill out the form in the checkout modal and press *Place Order*.
- **Order confirmation** – A success modal displays the generated Order ID.

---

## 📝 Documentation
Additional documentation lives in the `docs/` folder:
- `docs/architecture.md` – Overview of the front‑end architecture and state management.
- `docs/api.md` – (If you enable the FastAPI backend) description of the product and order endpoints.
- `docs/contributing.md` – Guidelines for contributing to the project.

---

## 🤝 Contributing
Feel free to fork the repo, open issues, or submit pull requests. Please follow these steps:
1. Create a feature branch.
2. Ensure code follows the existing style (ES6, BEM naming for CSS).
3. Test locally and verify that the UI remains responsive.
4. Submit a PR with a clear description of changes.

---

## 📜 License
This project is open‑source and available under the MIT License.

---

## 📞 Contact
For questions or feedback, open an issue on the repository or reach out via email at `support@beautyboutique.com`.
