document.addEventListener('DOMContentLoaded', function() {

    const backToTopButton = document.querySelector('.back-to-top');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('nav .menu a');
    const sections = document.querySelectorAll('main section');

    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };


    const highlightNavLink = () => {
        let currentSection = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });


        if (window.scrollY < document.getElementById('servicos').offsetTop - headerHeight - 50) {
            currentSection = 'inicio';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };
    
 
    window.addEventListener('scroll', () => {
        toggleBackToTopButton();
        highlightNavLink();
    });

    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.servico-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

});