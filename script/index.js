// Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Portfolio filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
        
        // Chatbot functionality
        const chatbotToggle = document.getElementById('chatbotToggle');
        const chatbotWindow = document.getElementById('chatbotWindow');
        const closeChatbot = document.getElementById('closeChatbot');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotInput = document.getElementById('chatbotInput');
        const sendMessage = document.getElementById('sendMessage');
        
        // Toggle chatbot window
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
        });
        
        closeChatbot.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });
        
        // Chatbot responses
        const chatbotResponses = {
            greetings: ["Hello!", "Hi there!", "Hey! How can I help you?"],
            services: ["I offer web development, mobile app development, and UI/UX design services.", "My services include creating responsive websites, cross-platform mobile apps, and user-friendly interfaces."],
            skills: ["My skills include HTML5, CSS3, JavaScript, React, React Native, Node.js, Flutter, and UI/UX design.", "I'm proficient in modern web and mobile technologies including React, Node.js, and cloud services like Firebase and AWS."],
            portfolio: ["You can view my portfolio above. I've worked on e-commerce platforms, fitness apps, finance dashboards, and more.", "Check out my projects in the portfolio section. I've built various web and mobile applications for different industries."],
            contact: ["You can contact me via the contact form above or email me at hello@alexmorgan.dev", "Feel free to reach out through the contact section or connect with me on social media."],
            experience: ["I have over 7 years of experience in web and mobile development.", "I've been developing websites and mobile apps for more than 7 years, working with various clients and technologies."],
            default: ["I'm not sure I understand. Could you rephrase that?", "I'm still learning. Can you ask about my services, skills, or portfolio?"]
        };
        
        // Function to add a message to the chatbot
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.textContent = text;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
        
        // Function to get chatbot response
        function getChatbotResponse(userInput) {
            const input = userInput.toLowerCase().trim();
            
            if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
                return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
            } else if (input.includes('service') || input.includes('what do you do')) {
                return chatbotResponses.services[0];
            } else if (input.includes('skill') || input.includes('technology')) {
                return chatbotResponses.skills[0];
            } else if (input.includes('portfolio') || input.includes('project')) {
                return chatbotResponses.portfolio[0];
            } else if (input.includes('contact') || input.includes('email') || input.includes('hire')) {
                return chatbotResponses.contact[0];
            } else if (input.includes('experience') || input.includes('year') || input.includes('how long')) {
                return chatbotResponses.experience[0];
            } else {
                return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
            }
        }
        
        // Send message when button is clicked
        sendMessage.addEventListener('click', () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addMessage(userMessage, true);
                chatbotInput.value = '';
                
                // Simulate AI thinking
                setTimeout(() => {
                    const botResponse = getChatbotResponse(userMessage);
                    addMessage(botResponse, false);
                }, 800);
            }
        });
        
        // Send message when Enter key is pressed
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
        
        // Add initial welcome message
        setTimeout(() => {
            addMessage("Need help with a project or want to know more about my services? Feel free to ask!", false);
        }, 1500);