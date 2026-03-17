document.addEventListener('DOMContentLoaded', () => {

    // --- 1. System Boot Sequence ---
    const bootText = document.getElementById('boot-text');
    const bootSequence = document.getElementById('boot-sequence');

    const lines = [
        "KERNEL: LOADING V2.0...",
        "NEURAL_LINK: ENCRYPTED_ESTABLISHED",
        "LOADING_MODULES: [||||||||||||||||||||]",
        "AGENTIC_CORE: ONLINE",
        "SYSTEM: READY"
    ];

    let lineIdx = 0;
    let charIdx = 0;

    function typeBoot() {
        if (lineIdx < lines.length) {
            if (charIdx < lines[lineIdx].length) {
                bootText.textContent += lines[lineIdx][charIdx];
                charIdx++;
                setTimeout(typeBoot, 20);
            } else {
                lineIdx++;
                charIdx = 0;
                bootText.appendChild(document.createElement('br'));
                setTimeout(typeBoot, 200);
            }
        } else {
            setTimeout(() => {
                bootSequence.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
                bootSequence.style.opacity = '0';
                setTimeout(() => {
                    bootSequence.style.display = 'none';
                    initApp();
                }, 1000);
            }, 800);
        }
    }

    typeBoot();

    function initApp() {
        initParticles();
        initReveal();
        initNav();
        initChatbot();
        initActiveLinks();
        initContactForm();
    }

    // --- 2. Reveal Animations ---
    function initReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Once visible, stop observing to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }

    // --- 3. Navigation & Mobile Menu ---
    function initNav() {
        const nav = document.getElementById('main-nav');
        const hamburger = document.getElementById('hamburger-menu');
        const navLinks = document.querySelector('.nav-links');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
        
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('mobile-open');
            if(isOpen) {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                navLinks.classList.add('mobile-open');
                hamburger.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('mobile-open') && !nav.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- 4. Active Link Highlight ---
    function initActiveLinks() {
        const sections = document.querySelectorAll('section, footer');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // --- 5. Terminal Chatbot Logic ---
    function initChatbot() {
        const chatbotContainer = document.getElementById('chatbot-container');
        const chatbotButton = document.getElementById('chatbot-button');
        const chatbotPanel = document.getElementById('chatbot-panel');
        const closeChatbotButton = document.getElementById('close-chatbot');
        const sendButton = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');
        const messagesContainer = document.getElementById('chatbot-messages');
        let firstOpen = true;
        let isBotTyping = false;

        const portfolioData = {
            help: "COMMANDS: 'about', 'experience', 'testimonials', 'skills', 'projects', 'socials', 'contact', 'whatsapp', 'status', 'clear'. You can also use the buttons below to navigate.",
            about: "I am Dua Habib, a specialized Agentic AI Developer. I engineer intelligent ecosystems including AI bots, chatbots, AI agents, and comprehensive automation workflows.",
            experience: "PROVEN_EXPERTISE: I have successfully completed client projects involving Telegram Bot integration for Spanish booking systems, WhatsApp automation for e-commerce support, and business website integrations. I also build lead generation agents and restaurant ordering systems using n8n.",
            testimonials: "FIELD_REPORTS: Clients have reported 300% efficiency increases and total workflow transformations through my AI automation systems.",
            skills: "CORE_SKILLS: Agentic AI Design, Multi-Agent Orchestration (n8n, LangChain), RAG Pipelines, LLM Fine-tuning (OpenAI, Claude, Llama), and Python/FastAPI backend architecture.",
            projects: "ACTIVE_PROJECTS:<br>1. <a href='https://github.com/duahabibai/health-assistant-dua' target='_blank'>AI Health Assistant</a><br>2. <a href='https://drive.google.com/file/d/1E1gZDZ0eXeBcIwozECibPqguskpzoauw/view?usp=sharing' target='_blank'>WhatsApp Biz Agent</a><br>3. <a href='https://github.com/duahabibai/Email_Send_Automation_n8n' target='_blank'>Smart Outreach AI</a><br>Type 'go to projects' to see them on the page.",
            socials: "CONNECT:<br>GitHub: <a href='https://github.com/duahabibai' target='_blank'>@duahabibai</a><br>LinkedIn: <a href='https://linkedin.com/in/duahabibai' target='_blank'>/in/duahabibai</a>",
            contact: "DIRECT_LINE: Email: <a href='mailto:duahabib.ai@gmail.com'>duahabib.ai@gmail.com</a>. WhatsApp: <a href='https://wa.me/923183919132' target='_blank'>+923183919132</a>.",
            whatsapp: "MESSAGE_ME: You can reach me on WhatsApp at <a href='https://wa.me/923183919132' target='_blank'>+92 318 3919132</a> for direct collaboration.",
            status: "CORE_STATUS: ALL SYSTEMS NOMINAL. Memory optimized. Security protocols active.",
            affirmative: "Understood. Would you like to know more about her?",
            default: "ERROR 404: Command not recognized. Execute 'help' for protocols."
        };

        const addButtons = (container) => {
            const buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'chatbot-buttons';
            
            const options = [
                { label: 'About', cmd: 'about' },
                { label: 'Experience', cmd: 'experience' },
                { label: 'Skills', cmd: 'skills' },
                { label: 'Projects', cmd: 'projects' },
                { label: 'Contact', cmd: 'contact' }
            ];

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-btn';
                btn.textContent = opt.label;
                btn.onclick = () => {
                    chatbotInput.value = opt.cmd;
                    handleSend();
                };
                buttonsDiv.appendChild(btn);
            });

            container.appendChild(buttonsDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const addMessage = (text, sender, showButtons = false) => {
            if (!text) return;
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot') {
                isBotTyping = true;
                messagesContainer.appendChild(msgDiv);
                
                // Create a cursor element
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '█';
                msgDiv.appendChild(cursor);

                // For bot messages with HTML, we need a slightly different approach
                // We'll strip tags for the typing effect but use innerHTML at the end
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = text;
                const plainText = tempDiv.innerText;
                const htmlContent = text;

                let i = 0;
                let currentText = "";
                const typeEffect = () => {
                    if (i < plainText.length) {
                        currentText += plainText.charAt(i);
                        // During typing, we show plain text for simplicity
                        const textNode = document.createTextNode(plainText.charAt(i));
                        msgDiv.insertBefore(textNode, cursor);
                        i++;
                        
                        const speed = Math.random() * 30 + 20; 
                        setTimeout(typeEffect, speed);
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    } else {
                        // Once finished, swap to full HTML content
                        msgDiv.innerHTML = htmlContent;
                        if (showButtons) {
                            addButtons(messagesContainer);
                        }
                        isBotTyping = false;
                        chatbotInput.focus();
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                };
                typeEffect();
            } else {
                msgDiv.textContent = text;
                messagesContainer.appendChild(msgDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        };

        const showTypingIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'message bot-message typing-indicator';
            indicator.id = 'bot-typing-indicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(indicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const removeTypingIndicator = () => {
            const indicator = document.getElementById('bot-typing-indicator');
            if (indicator) indicator.remove();
        };

        chatbotButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbotPanel.classList.toggle('open');
            if (chatbotPanel.classList.contains('open')) {
                chatbotInput.focus();
                if (firstOpen) {
                    setTimeout(() => {
                        addMessage("CONNECTION ESTABLISHED. SYSTEM ONLINE.", 'bot');
                        setTimeout(() => {
                            addMessage("Greetings. I am DUA.AI, your agentic interface. How can I assist you today?", 'bot', true);
                        }, 1000);
                    }, 500);
                    firstOpen = false;
                }
            }
        });

        closeChatbotButton.addEventListener('click', (e) => {
            e.stopPropagation();
            chatbotPanel.classList.remove('open');
        });

        document.addEventListener('click', (e) => {
            if (chatbotPanel.classList.contains('open') && !chatbotContainer.contains(e.target)) {
                chatbotPanel.classList.remove('open');
            }
        });

        const handleSend = () => {
            const val = chatbotInput.value.trim();
            if (!val || isBotTyping) return;

            addMessage(`> ${val}`, 'user');
            chatbotInput.value = '';

            const cmd = val.toLowerCase();
            let response = portfolioData.default;
            let showOptions = false;

            if (cmd.includes('help')) {
                response = portfolioData.help;
                showOptions = true;
            }
            else if (cmd.includes('about') || cmd.includes('who')) response = portfolioData.about;
            else if (cmd.includes('experience') || cmd.includes('completed') || cmd.includes('history')) response = portfolioData.experience;
            else if (cmd.includes('testimonial') || cmd.includes('review') || cmd.includes('feedback')) response = portfolioData.testimonials;
            else if (cmd.includes('skill')) response = portfolioData.skills;
            else if (cmd.includes('project') || cmd.includes('work')) response = portfolioData.projects;
            else if (cmd.includes('social') || cmd.includes('link')) response = portfolioData.socials;
            else if (cmd.includes('contact') || cmd.includes('hire') || cmd.includes('email')) response = portfolioData.contact;
            else if (cmd.includes('whatsapp') || cmd.includes('phone') || cmd.includes('number')) response = portfolioData.whatsapp;
            else if (cmd.includes('status')) response = portfolioData.status;
            else if (cmd === 'ok' || cmd === 'alright' || cmd === 'okay' || cmd === 'sure' || cmd === 'yes' || cmd === 'fine') {
                response = portfolioData.affirmative;
                showOptions = true;
            }
            else if (cmd.includes('hello') || cmd.includes('hi')) {
                response = "HELLO. SYSTEM ONLINE. HOW CAN I ASSIST YOU TODAY?";
                showOptions = true;
            }
            else if (cmd === 'clear') {
                messagesContainer.innerHTML = '';
                return;
            }

            // Navigation Handling
            let navTarget = null;
            if (cmd.includes('go to') || cmd.includes('navigate to') || cmd.includes('scroll to') || cmd.includes('show me')) {
                if (cmd.includes('project') || cmd.includes('work')) navTarget = 'projects';
                else if (cmd.includes('contact') || cmd.includes('hire')) navTarget = 'contact';
                else if (cmd.includes('about') || cmd.includes('intro')) navTarget = 'about';
                else if (cmd.includes('experience')) navTarget = 'about'; // Moved to subsection in about
                else if (cmd.includes('testimonial')) navTarget = 'testimonials';
                else if (cmd.includes('skill')) navTarget = 'skills';
                else if (cmd.includes('process')) navTarget = 'process';

                if (navTarget) {
                    response = `NAVIGATING TO ${navTarget.toUpperCase()}...`;
                    setTimeout(() => {
                        const targetEl = document.getElementById(navTarget);
                        if (targetEl) {
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                            // Close chatbot panel on mobile after navigation
                            if (window.innerWidth < 768) {
                                chatbotPanel.classList.remove('open');
                            }
                        }
                    }, 1000);
                }
            }

            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                addMessage(response, 'bot', showOptions);
            }, 600);
        };

        sendButton.addEventListener('click', handleSend);
        chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
    }

    // --- 6. Particles ---
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 50, "density": { "enable": true, "value_area": 1000 } },
                    "color": { "value": "#38bdf8" },
                    "shape": { "type": "circle" },
                    "opacity": { "value": 0.3, "random": true },
                    "size": { "value": 2, "random": true },
                    "line_linked": { "enable": true, "distance": 150, "color": "#818cf8", "opacity": 0.15, "width": 1 },
                    "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
                    "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.3 } } }
                }
            });
        }
    }

    // --- 7. Contact Form Handling ---
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            
            // Show sending state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "SENDING...";
            submitBtn.disabled = true;

            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "✓ MESSAGE RECEIVED. PROTOCOL_COMPLETE.";
                    status.className = "success";
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = "⚠ ERROR: " + data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "⚠ SYSTEM ERROR. RETRY_LATER.";
                        }
                        status.className = "error";
                    });
                }
            }).catch(error => {
                status.innerHTML = "⚠ CONNECTION ERROR. CHECK_UPLINK.";
                status.className = "error";
            }).finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                // Hide status after 8 seconds
                setTimeout(() => {
                    status.style.display = "none";
                }, 8000);
            });
        });
    }
});
