document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const backToTopButton = document.querySelector(".back-to-top");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    const navLinks = document.querySelectorAll(".menu a");
    const sections = document.querySelectorAll("section[id]");
    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const closeModalButton = document.querySelector(".close-modal");

    const detalhesServicos = {
        "Revisão Preventiva": `
            <p><strong>Como realizamos:</strong></p>
            <ul>
                <li>Inspeção de freios, pneus e suspensão.</li>
                <li>Verificação de óleo, filtros e fluídos.</li>
                <li>Conferência de ruídos, vazamentos e sinais de desgaste.</li>
                <li>Orientação clara sobre o que precisa ser feito agora e o que pode ser acompanhado.</li>
            </ul>
            <p>Ideal para evitar gastos inesperados e manter o veículo seguro no uso diário.</p>
        `,
        "Motor": `
            <p><strong>Etapas do atendimento:</strong></p>
            <ul>
                <li>Diagnóstico de desempenho, falhas, vazamentos e ruídos.</li>
                <li>Verificação dos componentes ligados ao funcionamento do motor.</li>
                <li>Execução dos reparos necessários com testes após o serviço.</li>
            </ul>
            <p>O objetivo é recuperar confiança, força e economia para o veículo.</p>
        `,
        "Troca de Óleo": `
            <p>Realizamos a troca do óleo e dos filtros seguindo a especificação indicada para o veículo.</p>
            <ul>
                <li>Remoção do óleo usado.</li>
                <li>Substituição do filtro quando necessário.</li>
                <li>Conferência do nível correto e orientação para a próxima troca.</li>
            </ul>
        `,
        "Suspensão": `
            <p>Avaliamos amortecedores, molas, pivôs, buchas, bandejas e demais componentes ligados à estabilidade do carro.</p>
            <p>Após o diagnóstico, a oficina informa quais peças apresentam desgaste e quais reparos são recomendados.</p>
        `,
        "Consertos e Reparos": `
            <p>O processo começa com a identificação da falha e segue com orçamento transparente antes da execução.</p>
            <ul>
                <li>Diagnóstico do problema.</li>
                <li>Explicação do reparo indicado.</li>
                <li>Execução do serviço e testes finais antes da entrega.</li>
            </ul>
        `,
        "Elétrica Automotiva": `
            <p>Atendimento para falhas na bateria, alternador, motor de partida, iluminação e demais itens elétricos.</p>
            <p>O diagnóstico ajuda a encontrar a origem do problema e evita trocas desnecessárias.</p>
        `
    };

    const closeMenu = () => {
        menu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    const openModal = (serviceName) => {
        modalTitle.textContent = serviceName;
        modalBody.innerHTML = detalhesServicos[serviceName] || "<p>Entre em contato para saber mais sobre este serviço.</p>";
        modal.style.display = "flex";
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        modal.classList.remove("open");
        modal.style.display = "";
        document.body.style.overflow = "";
    };

    const updateScrollUi = () => {
        backToTopButton.classList.toggle("show", window.scrollY > 360);

        const headerHeight = header.offsetHeight;
        let current = "inicio";

        sections.forEach((section) => {
            const top = section.offsetTop - headerHeight - 90;
            if (window.scrollY >= top) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.querySelectorAll(".servico-card").forEach((card) => {
        const serviceName = card.dataset.service || card.querySelector("h3")?.textContent.trim();

        card.addEventListener("click", () => openModal(serviceName));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(serviceName);
            }
        });
    });

    closeModalButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeModal();
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    updateScrollUi();
    window.addEventListener("scroll", updateScrollUi, { passive: true });
});
