#!/bin/bash

echo "==================================="
echo "DutiCalls Marketing Site Verification"
echo "==================================="
echo ""

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js not found. Please install Node.js 14+"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm --version)"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""
echo "Checking file structure..."
echo ""

# Check for required directories
directories=("public" "backend" "cms-integration" "public/css" "public/js")
for dir in "${directories[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Directory exists: $dir"
    else
        echo "❌ Directory missing: $dir"
    fi
done

echo ""
echo "Checking HTML pages..."
echo ""

# Check for HTML pages
pages=("index.html" "features.html" "pricing.html" "about.html" "contact.html" "blog.html" "faq.html" "demo-request.html" "book-appointment.html")
for page in "${pages[@]}"; do
    if [ -f "public/$page" ]; then
        echo "✅ Page exists: $page"
    else
        echo "❌ Page missing: $page"
    fi
done

echo ""
echo "Checking CSS files..."
echo ""

# Check for CSS files
if [ -f "public/css/main.css" ]; then
    echo "✅ main.css exists"
else
    echo "❌ main.css missing"
fi

if [ -f "public/css/responsive.css" ]; then
    echo "✅ responsive.css exists"
else
    echo "❌ responsive.css missing"
fi

echo ""
echo "Checking JavaScript files..."
echo ""

# Check for JS files
js_files=("main.js" "forms.js" "pricing.js" "faq.js" "blog.js")
for js in "${js_files[@]}"; do
    if [ -f "public/js/$js" ]; then
        echo "✅ JavaScript file exists: $js"
    else
        echo "❌ JavaScript file missing: $js"
    fi
done

echo ""
echo "Checking backend..."
echo ""

if [ -f "backend/server.js" ]; then
    echo "✅ server.js exists"
else
    echo "❌ server.js missing"
fi

if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json missing"
fi

echo ""
echo "Checking documentation..."
echo ""

docs=("README.md" "QUICKSTART.md" "DEPLOYMENT.md" "PROJECT_SUMMARY.md")
for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ Documentation exists: $doc"
    else
        echo "❌ Documentation missing: $doc"
    fi
done

echo ""
echo "Checking configuration files..."
echo ""

if [ -f ".gitignore" ]; then
    echo "✅ .gitignore exists"
else
    echo "❌ .gitignore missing"
fi

if [ -f ".env.example" ]; then
    echo "✅ .env.example exists"
else
    echo "❌ .env.example missing"
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
else
    echo "⚠️  vercel.json missing (optional)"
fi

echo ""
echo "==================================="
echo "Verification Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm start"
echo "3. Open: http://localhost:3000"
echo ""
echo "For detailed instructions, see:"
echo "- QUICKSTART.md (5-minute setup)"
echo "- README.md (full documentation)"
echo "- DEPLOYMENT.md (deployment guide)"
echo ""
