document.addEventListener('DOMContentLoaded', function() {
    class TypeWriter {
        constructor(element, words, waitTime = 3000) {
            this.element = element;
            this.words = JSON.parse(words);
            this.waitTime = parseInt(waitTime, 10);
            this.txt = '';
            this.wordIndex = 0;
            this.isDeleting = false;
            this.type();
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.textContent = this.txt;

            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.waitTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        new TypeWriter(typewriter, typewriter.dataset.text);
    }
    const contactForm = document.querySelector('.contact-form');
    const formStatus = document.createElement('div');
    formStatus.className = 'form-status';
    contactForm.appendChild(formStatus);

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !subject || !message) {
            formStatus.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-times-circle"></i>
                    <p>Please fill in all fields</p>
                </div>
            `;
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-times-circle"></i>
                    <p>Please enter a valid email address</p>
                </div>
            `;
            return;
        }
        const emailBody = `
Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
${message}
        `;
        const mailtoLink = `mailto:philipostesfaye26@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

        formStatus.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <p>Your email client will open now. Please send the pre-filled email.</p>
            </div>
        `;

        window.location.href = mailtoLink;
        setTimeout(() => {
            contactForm.reset();
            formStatus.innerHTML = '';
        }, 3000);
    });
});
