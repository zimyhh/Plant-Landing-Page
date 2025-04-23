document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownLink = document.querySelector(".dropdown > a");
    let isMenuVisible = false;

    // Клик по Products
    dropdownLink.addEventListener("click", (event) => {
        event.preventDefault();
        dropdownLink.classList.toggle("active");
        if (isMenuVisible) {
            dropdownMenu.style.opacity = "0";
            setTimeout(() => {
                dropdownMenu.style.display = "none";
            }, 400);
        } else {
            dropdownMenu.style.display = "block";
            setTimeout(() => {
                dropdownMenu.style.opacity = "1";
            }, 10);
        }
        isMenuVisible = !isMenuVisible;
    });

    // Клик вне меню — закрыть меню
    document.addEventListener("mousedown", (event) => {
        if (
            isMenuVisible &&
            !dropdown.contains(event.target)
        ) {
            dropdownMenu.style.opacity = "0";
            setTimeout(() => {
                dropdownMenu.style.display = "none";
            }, 400);
            dropdownLink.classList.remove("active");
            isMenuVisible = false;
        }
    });

    // Ссылки в меню
    const menuNames = ["Flowers", "Combo", "Messenger", "About", "GEO"];
    for (let i = 0; i < menuNames.length; i++) {
        const link = document.createElement("a");
        link.href = `#${menuNames[i].toLowerCase()}`;
        link.className = "dropdown-link";
        link.textContent = menuNames[i];
        dropdownMenu.appendChild(link);
    }

    // Карточки продуктов
    const productGrid = document.querySelector(".product-grid");
    if (productGrid) {
        const products = [
            { name: "Peperomia Ginny", price: "$25" },
            { name: "Large Majesty Palm", price: "$52" },
            { name: "Pet Friendly Plant", price: "$30" },
            { name: "Duo Friendly Plant", price: "$40" },
            { name: "Bird’s Nest Fern", price: "$45" },
        ];
        products.forEach((product) => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="primary">Buy</button>
            `;
            productGrid.appendChild(card);
        });
    }

    // Карточки продуктов для секции Featured (без стрелок и View All)
    const featuredList = document.getElementById("featuredList");
    if (featuredList) {
        const products = [
            { name: "Peony", price: "$19.99" },
            { name: "Tulip", price: "$24.99" },
            { name: "Rose", price: "$14.99" },
            { name: "Lily", price: "$29.99" }
        ];
        products.forEach((product) => {
            const card = document.createElement("div");
            card.className = "featured-card";
            card.innerHTML = `
                <img src="Image/1picture.png" alt="${product.name}" style="width:100%;height:60%;object-fit:cover;display:block;border-radius:0;">
                <div class="featured-card-title" style="font-size:1rem;margin:0.5rem 0 0.5rem 0;">${product.name}</div>
                <button class="primary" style="width:90%;margin-top:auto;">${product.price}</button>
            `;
            featuredList.appendChild(card);
        });
    }

    const burger = document.getElementById("burger");
    burger.addEventListener("click", () => {
        alert("Бургер кликнут!"); // пока только клик
    });

    // Поиск
    const searchPanel = document.getElementById("searchPanel");
    const searchTrigger = document.getElementById("searchTrigger");
    const searchBubble = searchPanel.querySelector(".search-bubble");
    const searchInput = searchPanel.querySelector(".search-input");
    let searchAnimating = false;

    // Получаем ширину между search и логотипом
    function getSearchBubbleWidth() {
        const navLogo = document.querySelector('.nav-logo');
        const searchTriggerRect = searchTrigger.getBoundingClientRect();
        const navLogoRect = navLogo.getBoundingClientRect();
        let width = navLogoRect.left - searchTriggerRect.left;
        if (width < 200) width = window.innerWidth * 0.98;
        return width + 'px';
    }

    // Анимация раскрытия поисковой строки (теперь только через JS)
    searchTrigger.addEventListener("click", () => {
        if (searchPanel.classList.contains("active") || searchAnimating) return;
        searchAnimating = true;
        searchPanel.classList.add("active");
        // Используем rem для согласованности с CSS
        searchBubble.style.transition = "none";
        searchBubble.style.width = "2.5rem";
        searchBubble.style.borderRadius = "2.5rem";
        searchBubble.offsetHeight; // reflow
        searchBubble.style.transition = "width 0.35s cubic-bezier(.7,0,.3,1), border-radius 0.35s cubic-bezier(.7,0,.3,1)";
        searchBubble.style.width = getSearchBubbleWidth();
        searchBubble.style.borderRadius = "2.5rem";
        setTimeout(() => {
            searchInput.focus();
            searchAnimating = false;
        }, 400);
    });

    function closeSearchPanel() {
        if (!searchPanel.classList.contains("active") || searchAnimating) return;
        searchAnimating = true;
        searchBubble.style.transition = "width 0.25s cubic-bezier(.7,0,.3,1), border-radius 0.25s cubic-bezier(.7,0,.3,1)";
        searchBubble.style.width = "2.5rem";
        searchBubble.style.borderRadius = "2.5rem";
        setTimeout(() => {
            searchPanel.classList.remove("active");
            searchAnimating = false;
        }, 250);
    }

    document.addEventListener("mousedown", (e) => {
        if (
            searchPanel.classList.contains("active") &&
            !searchPanel.contains(e.target) &&
            e.target !== searchTrigger && !searchTrigger.contains(e.target)
        ) {
            closeSearchPanel();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchPanel.classList.contains("active")) {
            closeSearchPanel();
        }
    });

    lucide.createIcons();
});