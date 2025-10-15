# Visual Product Matcher (React + TensorFlow.js + MobileNet)

A **visual search web app** that uses **TensorFlow.js and the MobileNet model** to find similar products based on an uploaded or linked image.  
It analyzes image embeddings, compares them using **cosine similarity**, and displays visually similar products from a local dataset or backend API.

---

## 🚀 Features

- 📸 Upload an image or paste an image URL.
- 🧩 Extract embeddings using **MobileNet**.
- ⚙️ Calculate **cosine similarity** between images.
- 🛍️ Display the top matching products.
- 🌐 Option to fetch product data from a backend API.
- 💡 Clean, responsive UI built with **React + Tailwind CSS**.

---

## 🗂️ Project Structure  
visual-product-matcher/  
│  
├── public/  
│ ├── data/  
│ │ └── product.json # Local product dataset  
│ └── index.html  
│  
├── src/  
│ ├── App.js # Main React component  
│ ├── index.js  
│ └── styles/  
│ └── index.css # Tailwind CSS  
│  
├── package.json  
├── tailwind.config.js  
├── .gitignore  
└── README.md  

---

## ⚙️ Installation

### 1️⃣ Clone the repository
git clone https://github.com/reshamrout/VisualProductMatcher.git  
cd visual-product-matcher

2️⃣ Install dependencies  
npm install

3️⃣ Start the development server  
npm run dev  
Your app will run on http://localhost:5173/

# How It Works

The user uploads an image or enters an image URL.  

The app uses MobileNet to extract a feature vector (embedding).  

The feature vector is compared with stored product embeddings using cosine similarity.  

The top 8 similar products are displayed in a responsive grid.  

# Model Details

Model Used: MobileNet (TensorFlow.js)  

Framework: TensorFlow.js  

Inference: Runs directly in the browser, no server-side processing required.  

🌐 Backend Integration (Optional)

To fetch product data from a backend API instead of a local file:  

const res = await fetch("http://localhost:5000/api/products");  
const data = await res.json();  
setProducts(data);  


Ensure your backend returns data in this structure:  

[  
  {  
    "product": {  
      "title": "Red Sneakers",  
      "category": "Footwear",  
      "thumbnail": "https://example.com/red-shoe.jpg"  
    },  
    "vector": [0.12, 0.34, ...]  
  }  
]  

🧩 Build for Production  
npm run build


The production-ready files will be in the dist/ directory.  

🗑️ .gitignore  
node_modules/  
dist/  
.env  
.DS_Store  
*.log  

🧑‍💻 Author  
Resham Rout  
🎓 MCA Student @ VIT  
💡 Passionate about Web Development  


⭐ Acknowledgements  
TensorFlow.js
React
Tailwind CSS

MobileNet Model

💬 Contributions Welcome!

